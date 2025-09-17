from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from blockchain import add_block, verify_chain
from bson import ObjectId
import os
from datetime import datetime
import models

MONGO_URI = os.getenv("MONGODB")
DB_NAME = "digihealth"

app = FastAPI()

client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def serialize_doc(doc):
    """Convert MongoDB ObjectId to string for JSON response"""
    if not doc:
        return None
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc


@app.on_event("startup")
async def startup_event():
    if await db["sdg_goals"].count_documents({}) == 0:
        await db["sdg_goals"].insert_many([
            {"name": "Goal 3: Good Health and Well-being", "target": 100, "progress": 75},
            {"name": "Goal 5: Gender Equality", "target": 100, "progress": 60},
            {"name": "Goal 10: Reduced Inequality", "target": 100, "progress": 50},
        ])
    if await db["diseases"].count_documents({}) == 0:
        await db["diseases"].insert_many([
            {"name": "COVID-19"},
            {"name": "Dengue"},
        ])
    if await db["cases"].count_documents({}) == 0:
        await db["cases"].insert_many([
            {"migrant_id": "1", "disease_id": "1", "date": datetime(2025, 9, 1),
             "latitude": "9.9312", "longitude": "76.2673"},
            {"migrant_id": "1", "disease_id": "2", "date": datetime(2025, 8, 15),
             "latitude": "8.5241", "longitude": "76.9366"},
        ])


@app.get("/")
def root():
    return {"msg": "Backend running"}


# User Management
@app.post("/users/")
async def create_user(user_data: dict):
    res = await db["users"].insert_one(user_data)
    return serialize_doc(await db["users"].find_one({"_id": res.inserted_id}))


@app.get("/admin/users")
async def get_users():
    users = []
    async for u in db["users"].find():
        users.append(serialize_doc(u))
    return users


@app.put("/admin/users/{user_id}")
async def update_user_role(user_id: str, role: str):
    await db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": {"role": role}})
    return serialize_doc(await db["users"].find_one({"_id": ObjectId(user_id)}))


@app.delete("/admin/users/{user_id}")
async def delete_user(user_id: str):
    await db["users"].delete_one({"_id": ObjectId(user_id)})
    return {"message": "User deleted"}


# Migrant Profile
@app.post("/migrants/")
async def create_migrant_profile(profile_data: dict):
    res = await db["migrants"].insert_one(profile_data)
    return serialize_doc(await db["migrants"].find_one({"_id": res.inserted_id}))


@app.get("/migrants/{migrant_id}")
async def get_migrant_profile(migrant_id: str):
    return serialize_doc(await db["migrants"].find_one({"_id": ObjectId(migrant_id)}))


# Health Records
@app.post("/health-records/")
async def create_health_record(record_data: dict):
    res = await db["health_records"].insert_one(record_data)
    doc = await db["health_records"].find_one({"_id": res.inserted_id})
    doc["id"] = str(doc["_id"])
    del doc["_id"]

    # blockchain entry
    block = await add_block(db, doc)
    return {"record": doc, "block": block}



@app.get("/health-records/{migrant_id}")
async def get_health_records(migrant_id: str):
    records = []
    async for r in db["health_records"].find({"migrant_id": migrant_id}):
        records.append(serialize_doc(r))
    return records


# Disease Surveillance
@app.get("/surveillance/cases")
async def get_all_cases():
    cases = []
    async for c in db["cases"].find():
        cases.append(serialize_doc(c))
    return cases


# SDG Progress
@app.get("/sdg/goals")
async def get_sdg_goals():
    goals = []
    async for g in db["sdg_goals"].find():
        goals.append(serialize_doc(g))
    return goals


@app.get("/sdg/progress/overall")
async def get_overall_sdg_progress():
    cursor = db["sdg_goals"].find()
    goals = [serialize_doc(g) async for g in cursor]
    if not goals:
        return {"progress": 0}
    total_progress = sum(g["progress"] for g in goals)
    total_target = sum(g["target"] for g in goals)
    return {"progress": (total_progress / total_target) * 100 if total_target > 0 else 0}


# Dashboard
@app.get("/migrants/count")
async def get_migrants_count():
    count = await db["migrants"].count_documents({})
    return {"count": count}


@app.get("/cases/active-count")
async def get_active_cases_count():
    count = await db["cases"].count_documents({})
    return {"count": count}

@app.get("/verify_chain")
async def verify_chain_endpoint():
    valid = await verify_chain(db)
    return {"valid": valid}


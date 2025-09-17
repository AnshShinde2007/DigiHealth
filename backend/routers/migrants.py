from fastapi import APIRouter, Request, Depends
from bson import ObjectId
from auth.deps import verify_jwt

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.post("/", dependencies=[Depends(verify_jwt)])
async def create_migrant_profile(request: Request, profile_data: dict):
    db = request.app.state.db
    res = await db["migrants"].insert_one(profile_data)
    return serialize(await db["migrants"].find_one({"_id": res.inserted_id}))

@router.get("/{migrant_id}", dependencies=[Depends(verify_jwt)])
async def get_migrant_profile(request: Request, migrant_id: str):
    db = request.app.state.db
    return serialize(await db["migrants"].find_one({"_id": ObjectId(migrant_id)}))

@router.get("/count", dependencies=[Depends(verify_jwt)])
async def get_migrants_count(request: Request):
    db = request.app.state.db
    count = await db["migrants"].count_documents({})
    return {"count": count}

from fastapi import APIRouter, Request, Depends
from bson import ObjectId
from auth.deps import verify_jwt
from blockchain import add_block

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.post("/", dependencies=[Depends(verify_jwt)])
async def create_health_record(request: Request, record_data: dict):
    db = request.app.state.db
    res = await db["health_records"].insert_one(record_data)
    doc = await db["health_records"].find_one({"_id": res.inserted_id})
    doc = serialize(doc)
    block = await add_block(db, doc)
    return {"record": doc, "block": block}

@router.get("/{migrant_id}", dependencies=[Depends(verify_jwt)])
async def get_health_records(request: Request, migrant_id: str):
    db = request.app.state.db
    records = []
    async for r in db["health_records"].find({"migrant_id": migrant_id}):
        records.append(serialize(r))
    return records

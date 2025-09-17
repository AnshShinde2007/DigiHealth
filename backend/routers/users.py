from fastapi import APIRouter, Request, Depends
from bson import ObjectId
from auth.deps import verify_jwt

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc
@router.get("/me")
def get_user_info(payload=Depends(verify_jwt)):
    return {"message": "Hello, user!", "claims": payload}

@router.post("/", dependencies=[Depends(verify_jwt)])
async def create_user(request: Request, user_data: dict):
    db = request.app.state.db
    res = await db["users"].insert_one(user_data)
    return serialize(await db["users"].find_one({"_id": res.inserted_id}))

@router.get("/", dependencies=[Depends(verify_jwt)])
async def get_users(request: Request):
    db = request.app.state.db
    users = []
    async for u in db["users"].find():
        users.append(serialize(u))
    return users

@router.put("/{user_id}", dependencies=[Depends(verify_jwt)])
async def update_user_role(request: Request, user_id: str, role: str):
    db = request.app.state.db
    await db["users"].update_one({"_id": ObjectId(user_id)}, {"$set": {"role": role}})
    return serialize(await db["users"].find_one({"_id": ObjectId(user_id)}))

@router.delete("/{user_id}", dependencies=[Depends(verify_jwt)])
async def delete_user(request: Request, user_id: str):
    db = request.app.state.db
    await db["users"].delete_one({"_id": ObjectId(user_id)})
    return {"message": "User deleted"}

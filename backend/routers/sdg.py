from fastapi import APIRouter, Request, Depends
from auth.deps import verify_jwt

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.get("/goals", dependencies=[Depends(verify_jwt)])
async def get_sdg_goals(request: Request):
    db = request.app.state.db
    goals = []
    async for g in db["sdg_goals"].find():
        goals.append(serialize(g))
    return goals

@router.get("/progress/overall", dependencies=[Depends(verify_jwt)])
async def get_overall_sdg_progress(request: Request):
    db = request.app.state.db
    cursor = db["sdg_goals"].find()
    goals = [serialize(g) async for g in cursor]
    if not goals:
        return {"progress": 0}
    total_progress = sum(g["progress"] for g in goals)
    total_target = sum(g["target"] for g in goals)
    return {"progress": (total_progress / total_target) * 100 if total_target > 0 else 0}

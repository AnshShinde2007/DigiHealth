from fastapi import APIRouter, Request, Depends
from auth.deps import verify_jwt

router = APIRouter()

def serialize(doc):
    doc["id"] = str(doc["_id"])
    del doc["_id"]
    return doc

@router.get("/", dependencies=[Depends(verify_jwt)])
async def get_all_cases(request: Request):
    db = request.app.state.db
    cases = []
    async for c in db["cases"].find():
        cases.append(serialize(c))
    return cases

@router.get("/active-count", dependencies=[Depends(verify_jwt)])
async def get_active_cases_count(request: Request):
    db = request.app.state.db
    count = await db["cases"].count_documents({})
    return {"count": count}

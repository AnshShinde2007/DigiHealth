from fastapi import APIRouter, Request, Depends
from auth.deps import verify_jwt
from blockchain import verify_chain

router = APIRouter()

@router.get("/verify", dependencies=[Depends(verify_jwt)])
async def verify_chain_endpoint(request: Request):
    db = request.app.state.db
    valid = await verify_chain(db)
    return {"valid": valid}

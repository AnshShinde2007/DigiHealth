from fastapi import FastAPI, Depends
from auth import verify_jwt

app = FastAPI()

@app.get("/")
def root():
    return {"msg": "Backend running"}

@app.get("/records")
def get_records(user=Depends(verify_jwt)):

    return {"msg": "Protected records", "user": user}

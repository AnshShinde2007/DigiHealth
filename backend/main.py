from fastapi import FastAPI, Depends
from auth import verify_jwt

app = FastAPI()

@app.get("/")
def root():
    return {"msg": "Backend running"}

@app.get("/records")
def get_records(user=Depends(verify_jwt)):
    dummy_records = [
        {"id": 1, "patient": "John Doe", "details": "Fever, cough"},
        {"id": 2, "patient": "Jane Smith", "details": "Headache"},
    ]
    return {"records": dummy_records}

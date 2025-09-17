from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os

from routers import users, migrants, healthrecords, sdg, cases, blockchain

MONGO_URI = os.getenv("MONGODB", "mongodb://localhost:27017")
DB_NAME = "digihealth"

app = FastAPI()

# Mongo client
client = AsyncIOMotorClient(MONGO_URI)
db = client[DB_NAME]
app.state.db = db

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(migrants.router, prefix="/migrants", tags=["migrants"])
app.include_router(healthrecords.router, prefix="/health_records", tags=["health-records"])
app.include_router(sdg.router, prefix="/sdg", tags=["sdg"])
app.include_router(cases.router, prefix="/cases", tags=["cases"])
app.include_router(blockchain.router, prefix="/blockchain", tags=["blockchain"])

@app.get("/")
async def root():
    return {"msg": "Backend running"}

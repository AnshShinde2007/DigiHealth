from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class User(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    auth0_id: str
    role: str


class MigrantProfile(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    age: int
    gender: Optional[str] = None
    country: Optional[str] = None


class HealthRecord(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    migrant_id: str
    disease: str
    description: Optional[str] = None
    date: datetime = Field(default_factory=datetime.utcnow)


class Disease(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str


class Case(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    migrant_id: str
    disease_id: str
    date: datetime
    latitude: str
    longitude: str


class SDGGoal(BaseModel):
    id: Optional[str] = Field(alias="_id", default=None)
    name: str
    target: int
    progress: int

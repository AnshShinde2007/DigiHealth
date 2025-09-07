from sqlalchemy import create_engine, Column, Integer, String, Date, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    auth0_id = Column(String, unique=True, index=True)
    role = Column(String) # Migrant, Health Worker, Admin

class MigrantProfile(Base):
    __tablename__ = "migrant_profiles"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    name = Column(String)
    age = Column(Integer)
    gender = Column(String)
    origin = Column(String)
    language = Column(String)
    migration_timeline = Column(Text)
    
    user = relationship("User")

class HealthRecord(Base):
    __tablename__ = "health_records"
    id = Column(Integer, primary_key=True, index=True)
    migrant_id = Column(Integer, ForeignKey("migrant_profiles.id"))
    date = Column(Date)
    symptoms = Column(Text)
    diagnostics = Column(Text)
    file_url = Column(String)

    migrant = relationship("MigrantProfile")

class Vaccination(Base):
    __tablename__ = "vaccinations"
    id = Column(Integer, primary_key=True, index=True)
    migrant_id = Column(Integer, ForeignKey("migrant_profiles.id"))
    vaccine_name = Column(String)
    date_administered = Column(Date)

    migrant = relationship("MigrantProfile")

class Disease(Base):
    __tablename__ = "diseases"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)

class Case(Base):
    __tablename__ = "cases"
    id = Column(Integer, primary_key=True, index=True)
    migrant_id = Column(Integer, ForeignKey("migrant_profiles.id"))
    disease_id = Column(Integer, ForeignKey("diseases.id"))
    date = Column(Date)
    latitude = Column(String)
    longitude = Column(String)

    migrant = relationship("MigrantProfile")
    disease = relationship("Disease")

class SDGGoal(Base):
    __tablename__ = "sdg_goals"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    target = Column(Integer)
    progress = Column(Integer)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

Base.metadata.create_all(bind=engine)

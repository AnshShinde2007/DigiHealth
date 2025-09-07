from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from auth import verify_jwt
import models
from models import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust for your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Add sample data
@app.on_event("startup")
def startup_event():
    db = SessionLocal()
    if db.query(models.SDGGoal).count() == 0:
        db.add(models.SDGGoal(name="Goal 3: Good Health and Well-being", target=100, progress=75))
        db.add(models.SDGGoal(name="Goal 5: Gender Equality", target=100, progress=60))
        db.add(models.SDGGoal(name="Goal 10: Reduced Inequality", target=100, progress=50))
        db.commit()
    if db.query(models.Disease).count() == 0:
        db.add(models.Disease(name="COVID-19"))
        db.add(models.Disease(name="Dengue"))
        db.commit()
    if db.query(models.Case).count() == 0:
        db.add(models.Case(migrant_id=1, disease_id=1, date="2025-09-01", latitude="9.9312", longitude="76.2673")) # Kochi
        db.add(models.Case(migrant_id=1, disease_id=2, date="2025-08-15", latitude="8.5241", longitude="76.9366")) # Trivandrum
        db.commit()
    db.close()

@app.get("/")
def root():
    return {"msg": "Backend running"}

# User Management
@app.post("/users/")
def create_user(user_data: dict, db: Session = Depends(get_db)):
    db_user = models.User(auth0_id=user_data['auth0_id'], role=user_data['role'])
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# Migrant Profile
@app.post("/migrants/")
def create_migrant_profile(profile_data: dict, db: Session = Depends(get_db)):
    db_profile = models.MigrantProfile(**profile_data)
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

@app.get("/migrants/{migrant_id}")
def get_migrant_profile(migrant_id: int, db: Session = Depends(get_db)):
    return db.query(models.MigrantProfile).filter(models.MigrantProfile.id == migrant_id).first()

# Health Records
@app.post("/health-records/")
def create_health_record(record_data: dict, db: Session = Depends(get_db)):
    db_record = models.HealthRecord(**record_data)
    db.add(db_record)
    db.commit()
    db.refresh(db_record)
    return db_record

@app.get("/health-records/{migrant_id}")
def get_health_records(migrant_id: int, db: Session = Depends(get_db)):
    return db.query(models.HealthRecord).filter(models.HealthRecord.migrant_id == migrant_id).all()

# Disease Surveillance
@app.get("/surveillance/cases")
def get_all_cases(db: Session = Depends(get_db)):
    return db.query(models.Case).all()

# SDG Progress
@app.get("/sdg/goals")
def get_sdg_goals(db: Session = Depends(get_db)):
    return db.query(models.SDGGoal).all()

# Dashboard data
@app.get("/migrants/count")
def get_migrants_count(db: Session = Depends(get_db)):
    return {"count": db.query(models.MigrantProfile).count()}

@app.get("/cases/active-count")
def get_active_cases_count(db: Session = Depends(get_db)):
    # This is a simplification. In a real app, you'd have a way to determine active cases.
    return {"count": db.query(models.Case).count()}

@app.get("/sdg/progress/overall")
def get_overall_sdg_progress(db: Session = Depends(get_db)):
    goals = db.query(models.SDGGoal).all()
    if not goals:
        return {"progress": 0}
    total_progress = sum(g.progress for g in goals)
    total_target = sum(g.target for g in goals)
    return {"progress": (total_progress / total_target) * 100 if total_target > 0 else 0}

# Admin
@app.get("/admin/users")
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.put("/admin/users/{user_id}")
def update_user_role(user_id: int, role: str, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    db_user.role = role
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/admin/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db.query(models.User).filter(models.User.id == user_id).delete()
    db.commit()
    return {"message": "User deleted"}
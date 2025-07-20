from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from .. import models, schemas, database, auth

router = APIRouter()

@router.post("/register", response_model=schemas.UserOut)
def register(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    exists = db.query(models.User).filter(
        (models.User.username==user.username)|(models.User.email==user.email)
    ).first()
    if exists:
        raise HTTPException(status_code=400, detail="Username or email already registered")
    hashed = auth.get_password_hash(user.password)
    new = models.User(username=user.username, email=user.email, hashed_password=hashed)
    db.add(new); db.commit(); db.refresh(new)
    return new

@router.post("/login", response_model=schemas.Token)
def login(form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.username==form.username).first()
    if not user or not auth.verify_password(form.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    token = auth.create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
def me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

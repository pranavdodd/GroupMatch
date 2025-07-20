from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas, database, auth

router = APIRouter()

@router.post("/", response_model=schemas.StudyGroupOut)
def create_group(group: schemas.StudyGroupCreate, db: Session = Depends(database.get_db),
                 user: models.User = Depends(auth.get_current_user)):
    sg = models.StudyGroup(title=group.title, description=group.description, owner_id=user.id)
    sg.members.append(user)
    db.add(sg); db.commit(); db.refresh(sg)
    return sg

@router.get("/", response_model=List[schemas.StudyGroupOut])
def list_groups(db: Session = Depends(database.get_db)):
    return db.query(models.StudyGroup).all()

@router.post("/{group_id}/join", response_model=schemas.StudyGroupOut)
def join_group(group_id: int, db: Session = Depends(database.get_db),
               user: models.User = Depends(auth.get_current_user)):
    sg = db.query(models.StudyGroup).get(group_id)
    if not sg:
        raise HTTPException(404, "Group not found")
    if user in sg.members:
        raise HTTPException(400, "Already a member")
    sg.members.append(user)
    db.commit(); db.refresh(sg)
    return sg

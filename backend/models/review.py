from sqlalchemy import Column, Integer, String, Boolean
from database import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    review = Column(String, nullable=False)

    sentiment = Column(String, nullable=False)

    edited = Column(Boolean, default=False, nullable=False)
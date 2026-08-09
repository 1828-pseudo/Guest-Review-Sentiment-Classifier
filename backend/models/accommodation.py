from sqlalchemy import Column, Integer, String, Float, Text
from database import Base


class Accommodation(Base):
    __tablename__ = "accommodations"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    city = Column(String, nullable=False)

    district = Column(String, nullable=False)

    state = Column(String, nullable=False, default="Uttarakhand")

    type = Column(String, nullable=False)

    description = Column(Text, nullable=True)

    address = Column(String, nullable=True)

    rating = Column(Float, default=0)

    review_count = Column(Integer, default=0)

    price_per_night = Column(Integer, nullable=False)

    amenities = Column(String, nullable=True)

    image_url = Column(String, nullable=True)

    availability = Column(String, default="Available")

    source = Column(String, default="AIVORA")
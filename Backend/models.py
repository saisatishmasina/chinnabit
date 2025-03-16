from sqlalchemy import Column, BigInteger, String, Text, TIMESTAMP, func
from database import Base

class URLShortener(Base):
    __tablename__ = "urls"

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    short_url = Column(String(10), unique=True, nullable=False)
    original_url = Column(Text, nullable=False)
    created_at = Column(TIMESTAMP, server_default=func.current_timestamp())
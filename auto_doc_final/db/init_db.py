from sqlalchemy import create_engine
from ..models import Base

DATABASE_URL = "your-database-url"

def init_db():
    engine = create_engine(DATABASE_URL)
    Base.metadata.create_all(engine)
    print("Database tables created.")

if __name__ == "__main__":
    init_db()

import os
from dotenv import load_dotenv

load_dotenv()

CORE_SERVER_URL = os.getenv("CORE_SERVER_URL", "https://localhost:3000/api")
PORT = int(os.getenv("PORT", 8000))

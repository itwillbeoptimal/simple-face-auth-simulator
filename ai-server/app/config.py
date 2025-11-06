import os
from dotenv import load_dotenv

load_dotenv()

CORE_SERVER_URL = os.getenv("CORE_SERVER_URL", "http://localhost:3000")
PORT = int(os.getenv("PORT", 8000))

import os
from pathlib import Path
from dotenv import load_dotenv

root_env_path = Path(__file__).parent.parent.parent / '.env'
load_dotenv(dotenv_path=root_env_path)
load_dotenv()

HOST_IP = os.getenv("HOST_IP")
CORE_SERVER_PORT = os.getenv("CORE_SERVER_PORT")
AI_SERVER_PORT = int(os.getenv("AI_SERVER_PORT"))

CORE_SERVER_URL = f"https://{HOST_IP}:{CORE_SERVER_PORT}"
PORT = AI_SERVER_PORT

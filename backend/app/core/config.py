from dotenv import load_dotenv
import os

load_dotenv()

VALKEY_HOST = os.getenv("VALKEY_HOST", "localhost")
VALKEY_PORT = int(os.getenv("VALKEY_PORT", 6379))
VALKEY_DB = int(os.getenv("VALKEY_DB", 0))
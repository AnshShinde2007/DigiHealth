from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
import requests, os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("API_AUDIENCE")
ALGORITHMS = ["RS256"]

security = HTTPBearer()

def verify_jwt(token: str = Depends(security)):
    try:
        header = jwt.get_unverified_header(token.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid header")

    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    jwks = requests.get(jwks_url).json()

    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }

    if not rsa_key:
        raise HTTPException(status_code=401, detail="Invalid key")

    try:
        payload = jwt.decode(
            token.credentials,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/",
        )
        return payload
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

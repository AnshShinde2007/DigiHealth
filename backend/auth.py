from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer
from jose import jwt
import requests, os

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")      # e.g. "your-tenant.us.auth0.com"
API_AUDIENCE = os.getenv("API_AUDIENCE") # e.g. "https://myapi/"
ALGORITHMS = ["RS256"]

bearer_scheme = HTTPBearer()

# Cache the JWKS keys
_jwks = None
def get_jwks():
    global _jwks
    if not _jwks:
        url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
        _jwks = requests.get(url).json()
    return _jwks

def verify_jwt(token: str = Security(bearer_scheme)):
    try:
        unverified_header = jwt.get_unverified_header(token.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid header")

    jwks = get_jwks()
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
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
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload

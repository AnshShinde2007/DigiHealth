from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jose import jwt
import requests

bearer_scheme = HTTPBearer()

AUTH0_DOMAIN = "your-tenant.us.auth0.com"
API_AUDIENCE = "your-api-identifier"
ALGORITHMS = ["RS256"]

def get_jwks():
    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    return requests.get(jwks_url).json()

def verify_jwt(credentials=Depends(bearer_scheme)):
    token = credentials.credentials
    try:
        jwks = get_jwks()
        unverified_header = jwt.get_unverified_header(token)

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
                break

        if not rsa_key:
            raise HTTPException(status_code=401, detail="Invalid header")

        payload = jwt.decode(
            token,
            rsa_key,
            algorithms=ALGORITHMS,
            audience=API_AUDIENCE,
            issuer=f"https://{AUTH0_DOMAIN}/"
        )
        return payload

    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Token verification failed: {str(e)}")

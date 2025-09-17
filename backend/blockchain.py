import hashlib, json
from datetime import datetime
from motor.motor_asyncio import AsyncIOMotorDatabase


def sha256_hash(data: dict) -> str:
    s = json.dumps(data, sort_keys=True, default=str)
    return hashlib.sha256(s.encode()).hexdigest()


async def add_block(db: AsyncIOMotorDatabase, record: dict):
    blocks = db["blocks"]

    last_block = await blocks.find_one(sort=[("index", -1)])
    index = (last_block["index"] + 1) if last_block else 0
    prev_hash = last_block["block_hash"] if last_block else None

    data_hash = sha256_hash(record)

    payload = {
        "index": index,
        "timestamp": datetime.utcnow(),
        "record_id": str(record["id"]),
        "data_hash": data_hash,
        "prev_hash": prev_hash,
    }
    payload["block_hash"] = sha256_hash(payload)

    await blocks.insert_one(payload)
    return payload


async def verify_chain(db: AsyncIOMotorDatabase) -> bool:
    blocks = db["blocks"]
    cursor = blocks.find().sort("index", 1)
    prev_hash = None
    async for block in cursor:
        check = sha256_hash({
            "index": block["index"],
            "timestamp": block["timestamp"],
            "record_id": block["record_id"],
            "data_hash": block["data_hash"],
            "prev_hash": block["prev_hash"],
        })
        if check != block["block_hash"] or block["prev_hash"] != prev_hash:
            return False
        prev_hash = block["block_hash"]
    return True

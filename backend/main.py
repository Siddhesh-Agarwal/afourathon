from typing import Dict, List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3 as sql


class Cab(BaseModel):
    regNo: str
    model: str
    colour: str


app = FastAPI(
    title="Cab Management System",
    description="A simple Cab Management System using FastAPI",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/cabs")
def get_all_cabs() -> List[Cab]:
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, colour TEXT)")
    cur.execute("SELECT * FROM cabs")
    rows = cur.fetchall()
    conn.close()
    return [Cab(regNo=row[0], model=row[1], colour=row[2]) for row in rows]


@app.get("/cabs/{regNo}")
def get_cab(regNo: str) -> Cab:
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, colour TEXT)")
    cur.execute("SELECT * FROM cabs WHERE regNo=?", (regNo,))
    row = cur.fetchone()
    conn.close()
    return Cab(regNo=row[0], model=row[1], colour=row[2])


@app.post("/cabs")
async def add_cab(cab: Cab) -> Dict[str, str]:
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, colour TEXT)")
    cur.execute("INSERT INTO cabs VALUES (?, ?, ?)", (cab.regNo, cab.model, cab.colour))
    conn.commit()
    conn.close()
    return {"message": "Cab details added successfully"}


@app.delete("/cabs/{regNo}")
def delete_cab(regNo: str) -> Dict[str, str]:
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, colour TEXT)")
    cur.execute("DELETE FROM cabs WHERE regNo=?", (regNo,))
    conn.commit()
    conn.close()
    return {"message": "Cab details deleted successfully"}


@app.put("/cabs")
def update_cab(cab: Cab) -> Dict[str, str]:
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, colour TEXT)")
    cur.execute(
        "UPDATE cabs SET model=?, colour=? WHERE regNo=?",
        (cab.model, cab.colour, cab.regNo),
    )
    conn.commit()
    conn.close()
    return {"message": "Cab details updated successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3 as sql


class Cab(BaseModel):
    regNo: str
    model: str
    color: str


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


@app.get("/cabs/")
def get_all_cabs():
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, color TEXT)")
    cur.execute("SELECT * FROM cabs")
    rows = cur.fetchall()
    conn.close()
    return rows


@app.post("/cabs/")
async def add_cab(cab: Cab):
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, color TEXT)")
    cur.execute("INSERT INTO cabs VALUES (?, ?, ?)", (cab.regNo, cab.model, cab.color))
    conn.commit()
    conn.close()
    return {"message": "Cab details added successfully"}


@app.delete("/cabs/{regNo}")
def delete_cab(regNo: str):
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, color TEXT)")
    cur.execute("DELETE FROM cabs WHERE regNo=?", (regNo,))
    conn.commit()
    conn.close()
    return {"message": "Cab details deleted successfully"}


@app.put("/cabs/")
def update_cab(cab: Cab):
    conn = sql.connect("./cabs.db")
    cur = conn.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS cabs (regNo TEXT, model TEXT, color TEXT)")
    cur.execute(
        "UPDATE cabs SET model=?, color=? WHERE regNo=?",
        (cab.model, cab.color, cab.regNo),
    )
    conn.commit()
    conn.close()
    return {"message": "Cab details updated successfully"}

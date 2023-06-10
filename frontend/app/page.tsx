'use client';

import { useState, useEffect } from "react"
import axios from "axios"

import { buttonVariants } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@radix-ui/react-label";

type Cab = {
  regNo: string
  model: string
  colour: string
}

export default function IndexPage() {
  const [cabs, setCabs] = useState<Cab[]>([])

  const fetchCabs = async () => {
    const { data } = await axios.get<Cab[]>("http://localhost:8000/cabs")
    setCabs(data)
  }

  const addCab = async (cab: Cab) => {
    await axios.post("http://localhost:8000/cabs/", cab)
    fetchCabs()
  }

  const deleteCab = async (regNo: string) => {
    await axios.delete(`http://localhost:8000/cabs/${regNo}`)
    fetchCabs()
  }

  const updateCab = async (cab: Cab) => {
    await axios.put(`http://localhost:8000/cabs`, cab)
    fetchCabs()
  }

  const [newCab, setNewCab] = useState<Cab>({} as Cab)

  useEffect(() => {
    fetchCabs()
  }, [])

  return (
    <main className="mx-4">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Cab Management System.
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            A simple cab management system for a cab company.
            Made using Next.js, Tailwind CSS, FastAPI and more.
          </p>
        </div>
      </section>
      <section>
        {/* Display information as a table */}
        <Table className="w-full">
          <TableCaption>Cabs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Reg No</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Colour</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cabs.map((cab, index) => (
              <TableRow key={index}>
                <TableCell>{cab.regNo}</TableCell>
                <TableCell>{cab.model}</TableCell>
                <TableCell>{cab.colour}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => deleteCab(cab.regNo)}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Icons.delete className="h-5 w-5 bg-red-400 dark:bg-red-500" />
                  </Button>
                  <Button
                    onClick={() => updateCab(cab)}
                    className={buttonVariants({ variant: "outline" })}
                  >
                    <Icons.edit className="h-5 w-5 bg-blue-400 dark:bg-blue-500" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Add a new cab */}
        <div className="flex flex-col w-screen mx-auto mt-8 gap-2">
          <h2 className="text-xl font-bold">Add a new cab</h2>
          <div className="flex flex-col items-start gap-2">
            <div>
              <Label>Reg No</Label>
              <Input
                placeholder="Reg No"
                onChange={(e) => setNewCab({ ...newCab, regNo: e.target.value })}
                value={newCab.regNo}
              />
            </div>
            <div>
              <Label>Model</Label>
              <Input
                placeholder="Model"
                onChange={(e) => setNewCab({ ...newCab, model: e.target.value })}
                value={newCab.model}
              />
            </div>
            <div>
              <Label>Colour</Label>
              <Input
                placeholder="Colour"
                onChange={(e) => setNewCab({ ...newCab, colour: e.target.value })}
                value={newCab.colour}
              />
            </div>
            <Button
              onClick={() => {
                console.log(newCab)
                addCab(newCab)
                setNewCab({} as Cab)
              }}
              className="text-white bg-green-400 dark:bg-green-500"
            >
              <Icons.add className="h-5 w-5" />
              Add
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

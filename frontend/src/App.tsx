import { useState, useEffect } from 'react'
import axios from 'axios'

type Cab = {
    regNo: string
    model: string
    color: string
};

function App() {
    const [cabs, setCabs] = useState<Cab[]>([])

    useEffect(() => {
        const fetchCabs = async () => {
            const { data } = await axios.get<Cab[]>('http://localhost:8000/')
            setCabs(data)
        }
        fetchCabs()
    }, [])

    return (
        <>
            <h1>Counter</h1>
        </>
    )
}

export default App

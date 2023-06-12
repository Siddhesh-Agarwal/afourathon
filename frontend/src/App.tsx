import { useEffect, useState } from 'react'
import { Cab } from './Cab'
import axios from 'axios'
import {
    FaTrash,
    FaEdit
} from 'react-icons/fa'

function App() {
    const [cabs, setCabs] = useState<Cab[]>([])
    const [newCab, setNewCab] = useState<Cab>({} as Cab)

    function getCabs() {
        axios.get('http://localhost:8000/cabs').then((response) => {
            setCabs(response.data)
        })
    }

    function addCab(cab: Cab) {
        axios.post('http://localhost:8000/cabs', cab)
        setCabs([...cabs, cab])
    }

    function deleteCab(regNo: string) {
        axios.delete(`http://localhost:8000/cabs/${regNo}`)
        setCabs(cabs.filter((cab) => cab.regNo !== regNo))
    }

    function updateCab(cab: Cab) {
        axios.put(`http://localhost:8000/cabs`, cab)
        getCabs()
    }

    useEffect(() => {
        getCabs()
    }, [])

    return (
        <div className='bg-white dark:bg-gray-800'>
            <h1 className='text-center text-4xl font-bold text-gray-800 mb-8'>
                Cab Management System
            </h1>
            <div className="relative overflow-x-auto sm:rounded-lg w-screen grid place-items-center">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 max-w-5xl border">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center hidden md:block">
                                S.No.
                            </th>
                            <th scope="col" className="px-6 py-3 text-center text-clip">
                                Registration Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Model
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Colour
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {cabs.map((cab: Cab, index: number) => (
                            <tr key={index} className={`${(index % 2 === 0) ? "bg-white" : "bg-gray-50"} border-b dark:bg-gray-900 dark:border-gray-700`}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white hidden md:block">
                                    {index + 1}
                                </th>
                                <td className="px-6 text-center">
                                    {cab.regNo}
                                </td>
                                <td className="px-6 text-center">
                                    {cab.model}
                                </td>
                                <td className="px-6 text-center">
                                    {cab.colour}
                                </td>
                                <td className='px-6 text-center justify-around'>
                                    <button
                                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex mr-1'
                                        onClick={() => updateCab(cab)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex'
                                        onClick={() => deleteCab(cab.regNo)}
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add new Cab */}
            <form onSubmit={() => { addCab(newCab); setNewCab({} as Cab) }} className="w-full max-w-lg mx-auto mt-12 border px-4 py-6 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                    Add New Cab
                </h2>
                <div className="mb-3">
                    <label htmlFor="regno" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Register No</label>
                    <input type="text" id="regno" name='regno' value={newCab.regNo}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="DL01AB1234" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Car Model</label>
                    <input type="text" id="model" name='model' value={newCab.model}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Tata Indica' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="colour" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Car Colour</label>
                    <input type="text" id="colour" name='colour' value={newCab.colour}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder='Red' required />
                </div>
                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded text-sm w-full px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default App

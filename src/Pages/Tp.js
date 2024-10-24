import React from 'react'

const Tp = () => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Department
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Leave Start Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Leave End Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reson
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                       

                       

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                03
                            </td>
                            <td className="px-6 py-4">
                                Sirisena
                            </td>
                            <td className="px-6 py-4">
                                Operations
                            </td>
                            <td className="px-6 py-4">
                                2024-11-10
                            </td>
                            <td className="px-6 py-4">
                                2024-11-12
                            </td>
                            <td className="px-6 py-4">
                                Personal matter
                            </td>
                            <td className="px-6 py-4">
                                Pending
                            </td>
                            <td className="px-6 text-right">
                                <button type="" className="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-lg px- focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-green-300 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
                            </td>
                        </tr>

                        

                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                05
                            </td>
                            <td className="px-6 py-4">
                                Dissanayake
                            </td>
                            <td className="px-6 py-4">
                                Operations
                            </td>
                            <td className="px-6 py-4">
                                2024-11-10
                            </td>
                            <td className="px-6 py-4">
                                2024-11-12
                            </td>
                            <td className="px-6 py-4">
                                Personal matter
                            </td>
                            <td className="px-6 py-4">
                                Pending
                            </td>
                            <td className="px-6 text-right">
                                <button type="" className="px-4 py-1 text-sm font-medium text-white bg-green-600 rounded-lg px- focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-green-300 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Approve</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
    </div>
  )
}

export default Tp
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { dataCrud, sendExcel } from "../db-api/dataCrud";
const AllEnteries = ({ editItem, deleteItem, openPrintMenu, editReload }) => {
  const [rowData, setRowData] = useState([]);
  const [searshId, setSearshId] = useState("");
  useEffect(() => {
    if (searshId === "") {
      const getAllQuerry = "SELECT * FROM Enteries ORDER BY id;";
      dataCrud(getAllQuerry).then((result) => setRowData(result));
    } else {
      const getAllQuerry = `SELECT * FROM Enteries Where Id = "${searshId}"`;
      dataCrud(getAllQuerry).then((result) => setRowData(result));
    }
  }, [searshId, editReload]);
  return (
    <div className="justify-center items-center w-[calc(100%_-_200px)] h-screen bg-white">
      <div className="w-full justify-center items-center flex my-2 ">
        <form className="w-full px-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              value={searshId}
              onChange={(e) => setSearshId(e.target.value)}
              type="text"
              placeholder="Search"
              className="w-full py-3 pl-12 pr-4 text-gray-500 border shadow-md rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
            />
            <div
              className="absolute top-0 bottom-0 w-24 h-10 my-auto text-cyan-600 hover:text-cyan-700 right-3 justify-center items-center flex cursor-pointer"
              onClick={() => sendExcel(rowData)}
            >
              Export data
            </div>
          </div>
        </form>
      </div>
      <div className="overflow-hidden border rounded-lg m-4 shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Nom *
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Prenom
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Email *
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Numero *
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Fonction
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Etablisement
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Adress
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
              >
                Pay
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-blue-500 uppercase "
              >
                Edit
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-red-500 uppercase "
              >
                Delete
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-xs font-bold text-right text-green-500 uppercase "
              >
                Print QR
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rowData.map((row) => (
              <tr key={row.id}>
                <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                  {row.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.nom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.prenom}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.numero}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.fonction}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.etablisement}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.adress}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                  {row.pay}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button
                    onClick={() => editItem(row.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button onClick={() => deleteItem(row.id)}>
                    <p className="text-red-500 hover:text-red-700 cursor-pointer">
                      Delete
                    </p>
                  </button>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                  <button onClick={() => openPrintMenu(row.id)}>
                    <p className="text-green-400 hover:text-green-600 cursor-pointer">
                      Print
                    </p>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEnteries;

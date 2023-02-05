/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import Input from "../Components/Input";
import { dataCrud } from "../db-api/dataCrud";

const AddEnteries = ({ editItem, deleteItem, openPrintMenu, editReload }) => {
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [nameErr, setNameErr] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [numero, setPhoneNumber] = useState("");
  const [numeroErr, setNumeroErr] = useState(false);
  const [fonction, setFonction] = useState("");
  const [etablisement, setEtablisement] = useState("");
  const [adress, setAdress] = useState("");
  const [pay, setPay] = useState("");
  const [rowData, setRowData] = useState([]);
  const [reload, setReload] = useState(true);
  // Crud Operations
  //get
  useEffect(() => {
    console.log("reload");
    const getAllQuerry = "SELECT * FROM Enteries ORDER BY id DESC LIMIT 10";
    dataCrud(getAllQuerry).then((result) => setRowData(result));
  }, [reload, editReload]);
  console.log("data", rowData);
  console.log("edit reload", editReload);
  //post
  const addEntery = () => {
    function isEmailAddress(str) {
      var filter =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (filter.test(str)) {
        return true;
      } else return false;
    }
    if (nom === "") {
      setNameErr(true);
      setTimeout(() => {
        setNameErr(false);
      }, 3000);
    }
    if (!isEmailAddress(email)) {
      setEmailErr(true);
      setTimeout(() => {
        setEmailErr(false);
      }, 3000);
    }
    if (numero === "") {
      setNumeroErr(true);
      setTimeout(() => {
        setNumeroErr(false);
      }, 3000);
    }
    if (numero !== "" && isEmailAddress(email) && nom !== "") {
      const AddQuerry = `INSERT INTO Enteries (${
        id !== "" ? "id ," : ""
      }nom, prenom, numero, email, adress, pay,fonction,etablisement) VALUES (${
        id !== "" ? `${id} ,` : ""
      }"${nom}","${prenom}","${+numero}","${email}","${adress}","${pay}","${fonction}","${etablisement}")`;
      // const AddQuerry = `INSERT INTO Enteries (nom, prenom) VALUES ("${nom}","${prenom}")`;
      dataCrud(AddQuerry).then((result) => setReload(!reload));
    }
  };
  return (
    <div className="w-[calc(100%_-_200px)] h-screen justify-start items-start flex flex-col mt-4">
      <div className="w-full h-1/2 flex">
        {/* inputs */}
        <div className="flex justify-start items-start  h-full  flex-col flex-wrap w-full shadow-lg m-2 rounded-md ">
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <p>Id is Auto Generated</p>
            <Input value={id} setValue={setId} label="ID" disable={false} />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={nom} setValue={setNom} label="Nom *" />
            {nameErr && <p className="text-red-500">Please enter Name</p>}
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={prenom} setValue={setPrenom} label="Prenom" />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={email} setValue={setEmail} label="Email *" />
            {emailErr && <p className="text-red-500">Please enter Email </p>}
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input
              value={numero}
              setValue={setPhoneNumber}
              label="Numero Telephone *"
            />
            {numeroErr && (
              <p className="text-red-500">Please enter Phone number </p>
            )}
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={fonction} setValue={setFonction} label="Fonction" />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input
              value={etablisement}
              setValue={setEtablisement}
              label="Etablisement"
            />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={adress} setValue={setAdress} label="Adress" />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={pay} setValue={setPay} label="Pay" />
          </div>
          <button
            onClick={addEntery}
            className="w-[300px] h-[50px] bg-green-300 mx-2 my-1 rounded-md hover:bg-green-500 shadow-lg"
          >
            <p className="text-lg font-semibold text-black hover:text-white">
              ADD
            </p>
          </button>
        </div>
      </div>
      {/* table */}
      <div className="w-full h-1/2 overflow-y-scroll shadow-lg my-4 rounded-md">
        <div className="overflow-x-auto">
          <div className="p-1.5 w-full inline-block align-middle">
            <div className="overflow-hidden border rounded-lg">
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
        </div>
      </div>
    </div>
  );
};

export default AddEnteries;

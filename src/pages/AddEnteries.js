/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import insertData from "../db-api/insertData";
import getData from "../db-api/getData";
const AddEnteries = () => {
  const [id, setId] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [numero, setPhoneNumber] = useState("");
  const [fonction, setFonction] = useState("");
  const [etablisement, setEtablisement] = useState("");
  const [adress, setAdress] = useState("");
  const [pay, setPay] = useState("");
  const [rowData, setRowData] = useState([]);
  // Crud Operations
  //get
  useEffect(() => {
    const getAllQuerry = "SELECT * FROM Enteries ORDER BY id DESC LIMIT 5;";
    getData(getAllQuerry).then((result) => setRowData(result));
  }, []);
  //post
  const addEntery = () => {
    const AddQuerry = `INSERT INTO Enteries (nom, prenom, numero, email, adress, pay,fonction,etablisement) VALUES ("${nom}","${prenom}","${+numero}","${email}","${adress}","${pay}","${fonction}","${etablisement}")`;
    // const AddQuerry = `INSERT INTO Enteries (nom, prenom) VALUES ("${nom}","${prenom}")`;
    insertData(AddQuerry).then((result) => console.log(result));
  };
  //put
  //delete
  const qrData = {
    nom,
    prenom,
    email,
    numero,
    etablisement,
    adress,
    pay,
    fonction,
  };
  const [size, setSize] = useState(300);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handlePrint = () => {
    console.log(
      `handle print Qr in position ${x},${y} in a A4 page with ( 2480 , 3508 ) under construction`
    );
  };
  return (
    <div className="w-[calc(100%_-_200px)] h-screen justify-start items-start flex flex-col mt-4">
      <div className="flex justify-start items-start w-full h-1/2">
        <div></div>
        <div className="w-1/3 h-full ">
          <Input value={id} setValue={setId} label="ID" />
          <Input value={nom} setValue={setNom} label="Nom" />
          <Input value={prenom} setValue={setPrenom} label="Prenom" />
          <Input value={email} setValue={setEmail} label="Email" />
          <Input
            value={numero}
            setValue={setPhoneNumber}
            label="Numero Telephone"
          />
        </div>
        <div className="w-1/3 h-full">
          <Input value={fonction} setValue={setFonction} label="Fonction" />
          <Input
            value={etablisement}
            setValue={setEtablisement}
            label="Etablisement"
          />
          <Input value={adress} setValue={setAdress} label="Adress" />
          <Input value={pay} setValue={setPay} label="Pay" />
          <button
            onClick={addEntery}
            className="w-[300px] h-[60px] bg-green-300 m-4 rounded-md hover:bg-green-500 shadow-lg"
          >
            Add
          </button>
        </div>
        <div className="w-1/3 h-full shadow-lg rounded-sm justify-start items-center flex flex-col">
          <div className="min-w-[300px] min-h-[300px] justify-center items-center bg-black flex rounded-md">
            <QRCodeCanvas
              id="qrCode"
              value={qrData}
              size={size > 300 ? 300 : size}
              bgColor={"white"}
              level={"H"}
              className="m-2"
            />
          </div>
          <div className="flex gap-4 justify-center items-center m-2">
            <p>Dimentions</p>
            <input
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="h-[40px] w-[70px] rounded-md flex justify-center items-center border border-black"
            />
          </div>
          <p>Position</p>
          <div className="flex gap-4">
            <div className="flex gap-4 justify-center items-center">
              <p>X</p>
              <input
                value={x}
                onChange={(e) => setX(e.target.value)}
                className="h-[40px] w-[70px] rounded-md border border-black"
              />
            </div>
            <div className="flex gap-4 justify-center items-center">
              <p>Y</p>
              <input
                value={y}
                onChange={(e) => setY(e.target.value)}
                className="h-[40px] w-[70px] rounded-md border border-black"
              />
            </div>
          </div>
          <button
            className="w-[150px] h-[60px] bg-green-300 hover:bg-green-500 rounded-md shadow-lg m-4"
            onClick={handlePrint}
          >
            Print
          </button>
        </div>
      </div>
      <div className="w-full h-1/2">
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
                      Nom
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
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                    >
                      Numero
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
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Edit
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                    >
                      Delete
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
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <p className="text-red-500 hover:text-red-700 cursor-pointer">
                          Delete
                        </p>
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

const Input = ({ label, value, setValue }) => {
  return (
    <div className="w-[300px] h-[70px] justify-start items-start flex-col m-4">
      <div className="w-[300px] h-[30px]">
        <label className="mb-10">{label}</label>
      </div>
      <div className="w-[300px] h-[40px] ">
        <input
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[300px] h-[40px] border border-black"
        />
      </div>
    </div>
  );
};

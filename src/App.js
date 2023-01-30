import { useState } from "react";
import AddEnteries from "./pages/AddEnteries";
import AllEnteries from "./pages/AllEnteries";
import insertData from "./db-api/insertData";
import getData from "./db-api/getData";
function App() {
  const [current, setCurrent] = useState("add");
  const [editMenu, setEditMenu] = useState(false);
  const [editId, setEditId] = useState("");
  const [editNom, setEditNom] = useState("");
  const [editPrenom, setEditPrenom] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNumero, setEditNumero] = useState("");
  const [editFonction, setEditFonction] = useState("");
  const [EditEtablisement, setEditEtablisement] = useState("");
  const [EditAdress, setEditAdress] = useState("");
  const [EditPay, setEditPay] = useState("");
  const editItem = (id) => {
    setEditMenu(true);
    getData(`SELECT * FROM Enteries WHERE id = ${id}`).then((result) => {
      setEditId(result[0].id);
      setEditNom(result[0].nom);
      setEditPrenom(result[0].prenom);
      setEditEmail(result[0].email);
      setEditNumero(result[0].numero);
      setEditFonction(result[0].fonction);
      setEditEtablisement(result[0].etablisement);
      setEditAdress(result[0].adress);
      setEditPay(result[0].pay);
    });
  };
  const saveEditItem = (id) => {
    insertData(
      `UPDATE Enteries SET nom="${editNom}", prenom="${editPrenom}",email="${editEmail}",numero="${editNumero}",fonction="${editFonction}",etablisement="${EditEtablisement}",adress="${EditAdress}",pay="${EditPay}" WHERE id=${editId}`
    );
    setEditMenu(false);
  };
  //delete
  const deleteItem = (id) => {
    insertData(`DELETE FROM Enteries WHERE id = ${id}`);
  };
  return (
    <div className="flex justify-start items-start w-screen h-screen bg-white overflow-hidden">
      {/* add new entery */}
      {/* nav */}
      <div className="w-[200px] h-screen bg-gray-200 shadow-lg">
        <div
          className={`w-[200px] h-[60px]  border-b border-b-black cursor-pointer hover:bg-gray-600 justify-center items-center flex ${
            current === "add" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setCurrent("add")}
        >
          <p className="text-white">Add new Entery</p>
        </div>
        <div
          className={`w-[200px] h-[60px]  border-b border-b-black cursor-pointer hover:bg-gray-600 justify-center items-center flex ${
            current === "all" ? "bg-gray-700" : "bg-gray-500"
          }`}
          onClick={() => setCurrent("all")}
        >
          <p className="text-white">All Enteries</p>
        </div>
      </div>
      {editMenu && (
        <div className="w-full h-full absolute top-0 left-0 z-30 justify-center items-center flex">
          <div
            className="w-full h-full bg-opacity-50 bg-cyan-400 absolute top-0 left-0 z-30"
            onClick={() => setEditMenu(false)}
          ></div>
          <div className="w-[1000px] h-[800px] bg-white z-30 flex justify-center items-center rounded-md shadow-lg">
            <div className="flex justify-start items-start  h-full  flex-col flex-wrap w-2/3">
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <p>Id is Auto Generated</p>
                <Input
                  value={editId}
                  setValue={setEditId}
                  label="ID"
                  disable={true}
                />
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input value={editNom} setValue={setEditNom} label="Nom *" />
                {/* {nameErr && <p className="text-red-500">Please enter Name</p>} */}
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={editPrenom}
                  setValue={setEditPrenom}
                  label="Prenom"
                />
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={editEmail}
                  setValue={setEditEmail}
                  label="Email *"
                />
                {/* {emailErr && (
                  <p className="text-red-500">Please enter Email </p>
                )} */}
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={editNumero}
                  setValue={setEditNumero}
                  label="Numero Telephone *"
                />
                {/* {numeroErr && (
                  <p className="text-red-500">Please enter Phone number </p>
                )} */}
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={editFonction}
                  setValue={setEditFonction}
                  label="Fonction"
                />
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={EditEtablisement}
                  setValue={setEditEtablisement}
                  label="Etablisement"
                />
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input
                  value={EditAdress}
                  setValue={setEditAdress}
                  label="Adress"
                />
              </div>
              <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
                <Input value={EditPay} setValue={setEditPay} label="Pay" />
              </div>
              <button
                onClick={saveEditItem}
                className="w-[300px] h-[60px] bg-green-300 mx-2 my-1 rounded-md hover:bg-green-500 shadow-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {current === "add" && (
        <AddEnteries editItem={editItem} deleteItem={deleteItem} />
      )}
      {current === "all" && (
        <AllEnteries editItem={editItem} deleteItem={deleteItem} />
      )}
    </div>
  );
}

export default App;

const Input = ({ label, value, setValue, disable }) => {
  return (
    <div className="w-[300px] h-[70px] justify-start items-start flex-col">
      <div className="w-[300px] h-[30px]">
        <label className="mb-10">{label}</label>
      </div>
      <div className="w-[300px] h-[40px] ">
        <input
          disabled={disable}
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-[300px] h-[40px] border border-black placeholder:px-2"
        />
      </div>
    </div>
  );
};

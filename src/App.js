import { useCallback, useEffect, useRef, useState } from "react";
import AddEnteries from "./pages/AddEnteries";
import AllEnteries from "./pages/AllEnteries";
import insertData from "./db-api/insertData";
import getData from "./db-api/getData";
import ReactToPrint from "react-to-print";
import { QRCodeCanvas } from "qrcode.react";

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
  // print menu
  const [printMenu, setPrintMenu] = useState(false);
  const [userData, setUserData] = useState("");
  const [size, setSize] = useState(8);
  const [x, setX] = useState(2);
  const [y, setY] = useState(2);
  const componentRef = useRef(null);
  const openPrintMenu = (id) => {
    setPrintMenu(true);
    getData(`SELECT * FROM Enteries WHERE id = ${id}`).then((result) => {
      setUserData(result[0]);
    });
  };
  const onBeforeGetContentResolve = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");

  const handleAfterPrint = useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    console.log("`onBeforeGetContent` called");
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [text]);

  const reactToPrintContent = useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = useCallback(() => {
    return (
      <button className="w-[150px] h-[60px] bg-green-300 hover:bg-green-500 rounded-md shadow-lg m-4">
        Print
      </button>
    );
  }, []);
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
      {/* edit item */}
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
      {/* print item */}
      {printMenu && (
        // print menu
        <div className="w-screen h-screen  absolute top-0 left-0 justify-center items-center flex">
          <div
            className="w-screen h-screen absolute top-0 left-0 z-20 bg-slate-400 opacity-50"
            onClick={() => setPrintMenu(false)}
          ></div>
          <div className="w-[400px] bg-white z-30 shadow-lg rounded-sm">
            <div
              onClick={() => setPrintMenu(false)}
              className="w-full flex justify-end p-2 text-bold text-2xl cursor-pointer z-30"
            >
              X
            </div>
            <div className="flex justify-center items-center flex-col z-30">
              {/* userData display */}
              <div className="px-4 py-2 shadow-md rounded-sm bg-white my-2 w-[300px]">
                <h1>User data</h1>
                <p>id :{userData.id}</p>
                <p>Nom :{userData.nom}</p>
                <p>Email :{userData.email}</p>
                <p>Numero :{userData.numero}</p>
              </div>
              {/* Qr code display */}
              <div>
                <div className=" justify-start items-center flex flex-col p-2 rounded-md bg-white shadow-md m-2">
                  <QRCodeCanvas
                    text={text}
                    id="qrCode"
                    value={JSON.stringify(userData)}
                    size={300}
                    bgColor={"white"}
                    level={"H"}
                    className="m-2"
                  />
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
                  <ReactToPrint
                    content={reactToPrintContent}
                    documentTitle="AwesomeFileName"
                    onAfterPrint={handleAfterPrint}
                    onBeforeGetContent={handleOnBeforeGetContent}
                    onBeforePrint={handleBeforePrint}
                    removeAfterPrint
                    trigger={reactToPrintTrigger}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: "none" }}>
              <div ref={componentRef}>
                <A4Page>
                  <QRCodeCanvas
                    style={{
                      position: "absolute",
                      top: `${y}cm`,
                      left: `${x}cm`,
                      width: `${size}cm`,
                      height: `${size}cm`,
                    }}
                    text={text}
                    id="qrCode"
                    value={JSON.stringify(userData)}
                    bgColor={"white"}
                    level={"H"}
                  />
                </A4Page>
              </div>
            </div>
          </div>
        </div>
      )}
      {current === "add" && (
        <AddEnteries
          editItem={editItem}
          deleteItem={deleteItem}
          openPrintMenu={openPrintMenu}
        />
      )}
      {current === "all" && (
        <AllEnteries
          editItem={editItem}
          deleteItem={deleteItem}
          openPrintMenu={openPrintMenu}
        />
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

const A4Page = ({ children }) => {
  return (
    <div
      style={{
        width: "23cm",
        height: "29.7cm",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
};

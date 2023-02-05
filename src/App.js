import { useCallback, useRef, useState } from "react";
import AddEnteries from "./pages/AddEnteries";
import AllEnteries from "./pages/AllEnteries";
import { dataCrud, editDelete } from "./db-api/dataCrud";
import { QRCodeCanvas } from "qrcode.react";
// import getSettings from "./db-api/getSettings";
import ReactToPrint from "react-to-print";
import Edit from "./Components/Edit";

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
    dataCrud(`SELECT * FROM Enteries WHERE id = ${id}`).then((result) => {
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
    editDelete(
      `UPDATE Enteries SET nom="${editNom}", prenom="${editPrenom}",email="${editEmail}",numero="${editNumero}",fonction="${editFonction}",etablisement="${EditEtablisement}",adress="${EditAdress}",pay="${EditPay}" WHERE id=${editId}`
    );
    setEditReload(!editReload);
    setEditMenu(false);
  };
  //delete
  const deleteItem = (id) => {
    editDelete(`DELETE FROM Enteries WHERE id = ${id}`);
    setEditReload(!editReload);
  };
  // print menu
  const [printMenu, setPrintMenu] = useState(false);
  const [userData, setUserData] = useState("");
  const [size, setSize] = useState(2);
  const [x, setX] = useState(5.1);
  const [y, setY] = useState(11.6);
  const componentRef = useRef(null);
  const [editReload, setEditReload] = useState(false);
  const openPrintMenu = (id) => {
    setPrintMenu(true);
    dataCrud(`SELECT * FROM Enteries WHERE id = ${id}`).then((result) => {
      setUserData(result[0]);
    });
  };
  const onBeforeGetContentResolve = useRef(null);

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("old boring text");

  const handleOnBeforeGetContent = useCallback(() => {
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
    <div>
      <div className="flex justify-start items-start w-screen h-screen bg-white overflow-hidden">
        {/* add new entery */}
        {/* nav */}
        <div className="w-[200px] h-screen bg-gray-200 shadow-lg">
          <div
            className={`w-[200px] h-[60px] cursor-pointer hover:bg-cyan-400 justify-center items-center flex ${
              current === "add" ? "bg-cyan-500" : "bg-cyan-300"
            }`}
            onClick={() => setCurrent("add")}
          >
            <p className="text-white">Add new Entery</p>
          </div>
          <div
            className={`w-[200px] h-[60px] cursor-pointer hover:bg-cyan-400 justify-center items-center flex ${
              current === "all" ? "bg-cyan-500" : "bg-cyan-300"
            }`}
            onClick={() => setCurrent("all")}
          >
            <p className="text-white">All Enteries</p>
          </div>
        </div>
        {/* edit item */}
        {editMenu && (
          <Edit
            setEditMenu={setEditMenu}
            editId={editId}
            setEditId={setEditId}
            editNom={editNom}
            setEditNom={setEditNom}
            editPrenom={editPrenom}
            setEditPrenom={setEditPrenom}
            editEmail={editEmail}
            setEditEmail={setEditEmail}
            editNumero={editNumero}
            setEditNumero={setEditNumero}
            editFonction={editFonction}
            setEditFonction={setEditFonction}
            EditAdress={EditAdress}
            setEditAdress={setEditAdress}
            EditPay={EditPay}
            setEditPay={setEditPay}
            saveEditItem={saveEditItem}
            EditEtablisement={EditEtablisement}
            setEditEtablisement={setEditEtablisement}
          />
        )}
        {/* print item */}
        {printMenu && (
          // print menu
          <div className="w-screen h-screen  absolute top-0 left-0 justify-center items-center flex">
            <div
              className="w-screen h-screen absolute top-0 left-0 z-20 bg-slate-400 opacity-50"
              onClick={() => setPrintMenu(false)}
            ></div>
            <div className="w-[400px] bg-white z-30 shadow-lg rounded-md">
              <div className="flex justify-center items-center flex-col z-30">
                {/* userData display */}
                <div className="px-4 py-2 shadow-md rounded-sm bg-white my-2 w-[300px]">
                  <p>id :{userData.id}</p>
                  <p>Nom :{userData.nom}</p>
                  <p>Prenom :{userData.prenom}</p>
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
                      <p>cm</p>
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
                      onBeforeGetContent={handleOnBeforeGetContent}
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
            editReload={editReload}
          />
        )}
        {current === "all" && (
          <AllEnteries
            editItem={editItem}
            deleteItem={deleteItem}
            openPrintMenu={openPrintMenu}
            editReload={editReload}
          />
        )}
      </div>
    </div>
  );
}

export default App;

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

import React from "react";
import Input from "./Input";

const Edit = ({
  setEditMenu,
  editId,
  setEditId,
  editNom,
  setEditNom,
  editPrenom,
  setEditPrenom,
  editEmail,
  setEditEmail,
  editNumero,
  setEditNumero,
  editFonction,
  setEditFonction,
  EditAdress,
  setEditAdress,
  EditPay,
  setEditPay,
  saveEditItem,
  setEditEtablisement,
  EditEtablisement,
}) => {
  return (
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
            <Input value={editPrenom} setValue={setEditPrenom} label="Prenom" />
          </div>
          <div className="w-[300px] h-[100px]  flex justify-center items-start flex-col mx-2 my-1">
            <Input value={editEmail} setValue={setEditEmail} label="Email *" />
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
            <Input value={EditAdress} setValue={setEditAdress} label="Adress" />
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
  );
};

export default Edit;

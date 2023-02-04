const Input = ({ label, value, setValue, disable }) => {
  return (
    <div className="w-[300px] h-[70px] justify-start items-start flex-col rounded-md">
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

export default Input;

function InputField({id, label, type, value, setter, error, onFocus}) {
    const baseStyle = "text-black text-lg p-4 w-md text-clip rounded-lg ";
    const errorStyle = error ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-blue-500";
    return(
    <div className = "flex flex-col items-start justify-center">
        <label htmlFor={id} className = "text-gray-300 text-base">{label}</label>
        <input id={id} type={type} value={value} 
            onChange={(e) => setter(e.target.value)}
            onFocus = {onFocus}
            className = {`${baseStyle} ${errorStyle}`} 
        />
    </div>
    );
}

function Button({text, onClick, enabled=true, type="button"}) {
    const baseStyle = "px-4 py-2 text-lg font-bold flex justify-center items-center";
    const enabledStyle = "text-white bg-green-500 hover:border-green-700 hover:border-8 active:bg-green-700";
    const disabledStyle = "text-white bg-gray-400";
    const res = enabled ? enabledStyle : disabledStyle;
    return (
        <button className = {`${baseStyle} ${res}`} onClick = {onClick} disabled={!enabled} type={type}>{text}
        </button>
    );
}

export { InputField, Button };

function InputField({id, label, type, value, setter, error}) {
    const baseStyle = ""
    const onStateStyle = error ?
    <>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} value={value} 
            onChange={(e) => setter(e.target.value)} className = {} ></input>
    </>
}

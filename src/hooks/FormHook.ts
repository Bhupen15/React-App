import React, { HtmlHTMLAttributes, useState } from "react";

const FormHook = (initialValue : string) => {
    let [value,setValue] = useState(initialValue);
    const onChange = (evt : React.FormEvent<HTMLInputElement>) =>{
        setValue(evt.currentTarget.value);
       
    }
    return {
        value,
        onChange
    }
}

export default FormHook;
import React, {  useState } from "react";

const FormHook = (initialValue: string) => {
    let [value, setValue] = useState(initialValue);
    const onChange = (evt: React.FormEvent<HTMLInputElement>) => {
        setValue(evt.currentTarget.value);

    }
    const reset = () => {
        setValue("");
    }
    return {
        value,
        onChange,
        reset
    }
}

export default FormHook;




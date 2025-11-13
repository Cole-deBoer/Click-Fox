import React, { forwardRef } from "react";

const CredentialInput = forwardRef((props, ref) => {
    const {type, placeholder} = props;
    return (
        <input
            type={type}
            ref={ref}
            className="w-full px-3 py-3 rounded-lg placeholder-zinc-200 focus:outline-none text-sm md:text-md  bg-zinc-900 opacity-40 text-zinc-200"
            placeholder={placeholder}
            autoComplete={placeholder}
            required
        ></input>
    )
});

export default CredentialInput;
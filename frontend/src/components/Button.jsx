import React from "react";

function Button({content, highlighted}) {
    return (
        <div className={`w-max h-max m-0 p-0 opacity-40 bg-transparent hover:opacity-100 hover:scale-105 transition-all duration-100 ease-linear cursor-pointer select-none
                        ${highlighted && 'scale-105 opacity-100'}`}>
            {content}
        </div>
    )
}
export default Button;
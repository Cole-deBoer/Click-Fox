import React from "react";

function Button({content}) {
    return (
        <div className="w-max h-max m-0 p-0 opacity-40 bg-transparent hover:opacity-100 hover:scale-105 transition-all duration-75 ease-linear">
            {content}
        </div>
    )
}
export default Button;
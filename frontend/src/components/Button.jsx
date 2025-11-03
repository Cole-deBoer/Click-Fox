import React from "react";

const Button = ({content = (<></>), highlighted = false}) => {
    return (
        <div className={`w-full h-full m-0 p-0 bg-transparent hover:opacity-100 hover:scale-105 transition-all duration-100 ease-linear cursor-pointer select-none
                        ${highlighted ? 'scale-105 opacity-100' : 'scale-100 opacity-40'}`}>
            {content}
        </div>
    )
}
export default Button;
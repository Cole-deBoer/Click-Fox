import React from "react";
import Button from "./Button";

const Elements = [
    "Click-Fox",
    "🖱",
    "👑",
]

function Navbar() {
    return (
        <div className="w-auto max-w-7xl h-12 mx-auto mt-8">
            <div className="w-auto h-auto flex justify-between">
                {/* Left Justified Items*/}
                <div className="p-0 flex gap-0 text-center">
                    {Elements.map((element, key) => (
                        <Button key={key} content={
                            <b className="font-mono text-xl p-0 mx-4">
                                {element}
                            </b>
                        }/>
                    ))}
                </div>

                {/* Profile Element (Right Aligned*/}
                <div className="mx-2">
                    <Button content={
                        <b className="font-mono text-xl">
                            Profile
                        </b>
                    }/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
import React from "react";
import Button from "./Button";
import {Link } from "react-router-dom";

const Elements = [
    {Text: "Click-Fox", Route: '/'},
    {Text: "🖱", Route: '/'},
    {Text: "👑", Route: '/leaderboard'},
]

function Navbar() {
    return (
        <div className="w-5/6 h-12 mx-auto px-8 mt-8">
            <div className="w-auto h-auto flex justify-between">
                {/* Left Justified Items*/}
                <nav className="p-0 flex gap-0 text-center">
                    {Elements.map((element, key) => (
                        <Link key={key} to={element.Route}>
                            <Button content={
                                <b className="text-xl p-0 mx-4">
                                    {element.Text}
                                </b>
                            }/>
                        </Link>
                    ))}
                </nav>

                {/* Profile Element (Right Aligned*/}
                <nav className="mx-2">
                    <Link to="/profile">
                        <Button content={
                            <b className="font-mono text-xl">
                                Profile
                            </b>
                        }/>
                    </Link>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
import React from "react";
import Button from "./Button";
import {Link } from "react-router-dom";

const Elements = [
    {Text: "Click-Fox", Route: '/'},
    {Text: "🖱", Route: '/'},
    {Text: "👑", Route: '/leaderboard'},
]

const Navbar = () => {
    return (
        <div className="w-full md:w-5/6 6 h-12 mx-auto mt-8 md:mt-12 ">
            <div className="w-auto h-auto flex justify-between">
                {/* Left Justified Items*/}
                <nav className="p-0 mx-4 flex gap-4 md:gap-14 text-center">
                    {Elements.map((element, key) => (
                        <Link key={key} to={element.Route}>
                            <Button content={
                                <b className="text-md md:text-2xl">
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
                            <b className="font-mono text-md md:text-2xl">
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
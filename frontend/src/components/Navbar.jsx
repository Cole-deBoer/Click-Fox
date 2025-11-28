import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

// svg images
import crown from "../Assets/crown.svg"
import mouse from "../Assets/mouse.svg"
import clickFoxLogo from "../Assets/click-fox-logo.png"

const Elements = [
    {Display: <img className='h-1/2 md:h-3/4 scale-100 md:scale-75' src={mouse} alt="mouse icon" />, Route: '/'},
    // {Display: <img className='h-1/2 md:h-3/4 scale-100 md:scale-75' src={crown} alt="leaderboard" />, Route: '/leaderboard'},
]

const Navbar = () => {
    const user = useContext(AuthContext);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (user != null) {
            navigate('/profile');
        } else {
            navigate('/signin');
        }
    };

    return (
        <div className="w-full md:w-5/6 h-12 mx-auto mt-8 md:mt-12">
            <div className="h-full flex justify-between md:scale-100">
                {/* Left Justified Items*/}
                <nav className="flex gap-4 md:gap-1">

                    {/* Logo with text */}
                    <div className="h-8 md:h-10 mx-2 flex space-x-1 select-none cursor-pointer" onClick={() => navigate('/')}>
                        <img src={clickFoxLogo} alt="click-fox logo" className="bg-blend-difference"/> 
                        <strong className="text-xl md:text-3xl">click-fox</strong>
                    </div>

                    {/* other left alligned elements */}
                    {Elements.map((element, key) => (
                        <Link key={key} to={element.Route} className="gap-4">
                            <Button content={
                                <>
                                    {element.Display}
                                </>
                            }/>
                        </Link>
                    ))}
                </nav>

                {/* Profile Element (Right Aligned)*/}
                <nav className="mx-2">
                    <div onClick={handleProfileClick}>
                        <Button content={
                            <b className="text-md md:text-2xl">
                                Profile
                            </b>
                        }/>
                    </div>
                </nav>
            </div>
        </div>
    );
}

export default Navbar;
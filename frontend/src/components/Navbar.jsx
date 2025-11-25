import React, { useContext } from "react";
import Button from "./Button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';

// svg images
import crown from "../Assets/crown.svg"
import mouse from "../Assets/mouse.svg"

const Elements = [
    {Display: <strong className='text-md md:text-2xl'>Click-Fox</strong>, Route: '/'},
    {Display: <img className='h-1/2 md:h-2/3 scale-75 md:scale-90' src={mouse} alt="click logo" />, Route: '/'},
    //{Display: <img className='h-1/2 md:h-2/3 scale-75 md:scale-90' src={crown} alt="leaderboard" />, Route: '/leaderboard'},
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
                <nav className="mx-4 flex gap-4 md:gap-6">
                    {Elements.map((element, key) => (
                        <Link key={key} to={element.Route}>
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
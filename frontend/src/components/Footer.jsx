import React from "react";
import Button from "./Button";
import GitHubLogo from "../Assets/github.svg";

const Footer = () => {
    return (
        <Button content={
            <div className="w-full flex justify-center space-x-6 pb-2 cursor-pointer select-none">
                <a className="flex text-sm"href="https://github.com/Cole-deBoer/Click-Fox">
                    <img className="scale-75" src={GitHubLogo}/>github
                </a>            
            </div>
        }/>
    );
} 

export default Footer;
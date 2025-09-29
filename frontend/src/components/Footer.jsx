import React from "react";
import GitHubLogo from "../Assets/github-logo.png"

const Footer = () => {
    return (
        <div className="w-full bottom-0 left-0 right-0 flex justify-center space-x-6 pb-2 cursor-pointer select-none">
            <a className="flex text-sm"href="https://github.com/Cole-deBoer/Click-Fox"><img src={GitHubLogo}/>github</a>            
        </div>
    );
} 

export default Footer;
import React from "react";

const UnderDevelopment = () => {
    return (
        <div className="w-full h-1/3 m-0">
            {/* Sorry message */}
            <div className="w-2/3 h-5/6 mx-auto mt-24 bg-zinc-600 rounded-xl">
                <div className="w-5/6 h-5/6 mx-auto content-center text-center">
                    <h1 className="text-3xl my-10 2xl:text-7xl 2xl:my-14">This page is still being developed.</h1>
                    <b className="text-2xl 2xl:text-5xl">Sorry for the inconvenience</b>
                </div>
            </div>

            {/* Git Link to click-fox */}
            <div className="w-5/6 h-full mx-auto my-16 bg-zinc-600 rounded-xl flex justify-center">
                <div className="w-4/5 p-0 text-3xl content-center 2xl:text-6xl">
                    <p>
                        If you would to assist in the development of click-fox
                        please submit a pull request to <a 
                            className="italic underline text-blue-500" 
                            href="https://github.com/Cole-deBoer/Click-Fox">
                                github.com/Click-Fox 
                            </a>
                     </p>
                </div>
            </div>
        </div>
    );
}

export default UnderDevelopment;
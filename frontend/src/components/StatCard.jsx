import React from 'react';

const StatCard = ({ title, value, isLoading }) => {
    return (
        <div className="flex flex-col items-center justify-center m-2 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] select-none">
            {isLoading ? (
                <div className="animate-pulse duration-200 bg-zinc-600 h-16 w-24 rounded-lg"></div>
            ) : (
                <>
                    <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
                    <p className="text-white text-3xl font-bold mb-1">{value}</p>
                </>
            )}
        </div>
    );
};

export default StatCard;

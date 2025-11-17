import React, {useEffect, useState, useRef} from "react";
import Button from "./Button";
import CredentialInput from "./CredentialInput";

const Modal = ({ show = false, onCancel = () => {}, onSubmit = () => {}, 
                heading = '', subheading = '', placeholderText = '' }) => {
    const [error, setError] = useState('');
    const credential = useRef(null);
    const modalRef = useRef(null);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if(modalRef.current && !modalRef.current.contains(event.target)) {
                onCancel();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!credential.current.value.trim()) {
            setError('Username cannot be empty.');
            return;
        }
        setError('');
        onSubmit(credential.current.value);
    };

    if (!show) {
        return null;
    }


    return (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div ref={modalRef} className="p-8 bg-zinc-700 rounded-lg shadow-lg text-zinc-200 xl:scale-125">
                <h3 className="text-xl font-bold mb-4 text-center">{heading}</h3>
                <p className="mb-4 text-center">{subheading}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <CredentialInput type='text' placeholder={placeholderText} ref={credential}/>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    </div>
                    <Button content={
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 bg-zinc-600 rounded-lg"
                            >   
                            continue
                        </button>
                    }/>
                </form>
            </div>
        </div>
    );
};

export default Modal;
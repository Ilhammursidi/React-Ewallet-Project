import { useState } from "react";

export const Modal = ({isOpen, onClose, children}) => {
    if(!isOpen) return null;
    return (
        <section>
            <section className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <section className="bg-white p-5 rounded-lg">
                    {children}
                    <button onClick={onClose} className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-md">Close</button>
                </section>
            </section>
        </section>
    )
}
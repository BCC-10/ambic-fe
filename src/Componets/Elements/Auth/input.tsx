import React from 'react';
import { FaUser } from "react-icons/fa";

interface Inputs {
    type: string;
    placeholder?: string;
    className?: string;
    content?: string;
    icon?: React.ReactNode;
    value?: string
    onChange?: (e: any) => void;
}

const Input: React.FC<Inputs> = ({ type, placeholder, className, content, icon, value, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            {content && <label className="font-semibold text-gray-600">{content}</label>}
            <div className="relative w-full">
                <input 
                    type={type} 
                    placeholder={placeholder} 
                    className={`w-full p-1 pr-12 rounded-2xl bg-gray-200 focus:outline-none  ${className}`} 
                    value={value}
                    onChange={onChange}

                />
                {icon && (
                    <div className="absolute inset-y-13 right-8 flex items-center text-gray-600">
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Input;

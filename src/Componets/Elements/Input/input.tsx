import React from 'react';

interface Inputs {
    name?:string
    type: string;
    placeholder?: string;
    className?: string;
    content?: string;
    icon?: React.ReactNode;
    value?: string | number;
    onChange?: (e: any) => void;
    width?:string;
    color?:string
    select?: boolean
    disabled?: boolean
    min?: number
}

const Input: React.FC<Inputs> = ({ type, placeholder, className, content, icon, value, onChange, width , color, name, select, disabled, min}) => {
    return (
        <div className={`flex flex-col gap-2 items-start  ${width}`}>
            {content && <label className={`font-semibold  ${color}`}>{content}</label>}
            <div className="relative w-full flex items-center ">
                <input
                    name={name}
                    type={type} 
                    placeholder={placeholder} 
                    className={` p-2 pr-12 rounded-2xl bg-gray-200 focus:outline-none ${className}`} 
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    min={min}
                />
                {select === true ? 
                <select
                name='gender'
                value={value}
                onChange={onChange}
                className={` p-2 pr-12 rounded-2xl bg-gray-200 focus:outline-none  ${className}`}
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select> : <></>
            }
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

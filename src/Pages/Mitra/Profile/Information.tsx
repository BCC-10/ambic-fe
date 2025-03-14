import React from 'react';

interface Inputs {
    className?: string;
    content?: string;
    icon?: React.ReactNode;
    onChange?: (e: any) => void;
    width?:string;
    color?:string
    text?:string | number
    children?: React.ReactNode
}

const Information: React.FC<Inputs> = ({ className, content, onChange, width , color, text, children}) => {
    return (
        <div className={`flex flex-col gap-2 items-start ${width}`}>
            <label className={`font-semibold font-Poppins ${color}`}>{content}</label>
            <div className="relative w-full flex items-center ">
                <div
                    className={` p-2 pr-12 rounded-2xl bg-gray-200 focus:outline-none flex items-center justify-center ${className}`}
                    onChange={onChange}
                >
                    <h1 className='font-Poppins text-lg font-semibold '>{text}</h1>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Information;

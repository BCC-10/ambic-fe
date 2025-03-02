import React, {useState, useRef} from 'react'

interface Component{
    children: React.ReactNode;
    text: React.ReactNode;
    color?: string;
    [key: string]: any;  // Add any other props you want to pass to the button.
}

const IconButton: React.FC<Component> = ({ children, text, color, ...props}) => {
    const [hovered, setHovered] = useState<boolean>(false)
    const ref = useRef<HTMLDivElement | null>(null)

    return (
        <button onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={`flex p-2 items-center rounded-lg text-white ${color || "bg-gray-600"}`} {...props}  >
            {children}
            <div style={{width: hovered ? ref.current?. offsetWidth || 0 : 0 }} className='overflow-x-hidden transition-all duration-300 ease-out'>
                <div ref={ref} className='px-1.5 text-black'>{text}</div>
            </div>
        </button>
    )
}

export default IconButton

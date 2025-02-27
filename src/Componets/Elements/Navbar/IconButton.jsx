import React, {useState, useRef} from 'react'

function IconButton({ children, text, color, ...props}) {
    const [hovered, setHovered] = useState(false)
    const ref = useRef(null)

    return (
        <button {...props} className={`flex p-2 items-center rounded-lg text-white ${color || "bg-gray-600"}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            {children}
            <div style={{width: hovered ? ref.current?. offsetWidth || 0 : 0 }} className='overflow-x-hidden transition-all duration-300 ease-out'>
                <div ref={ref} className='px-1.5 text-black'>{text}</div>
            </div>
        </button>
    )
}

export default IconButton

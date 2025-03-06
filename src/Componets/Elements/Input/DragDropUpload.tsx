import React, {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone';
import { LuPackageOpen } from "react-icons/lu";

const DragDropUpload = ({content}) => {
    const [files, setFiles] = useState<File[]>([])
    const [eror, setEror] = useState<string | null>(null)
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: any) => {
        if(fileRejections.length > 0) {
            setEror("File tidak valid! Pastikan file adalah gambar (PNG, JPG) dan ukurannya < 2MB")
            return;
        }
        setFiles(acceptedFiles)
        setEror(null)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {'image/png' : [], 'image/jpg' : []},
        maxSize: 2 * 1024 * 1024,
        maxFiles: 1,
        multiple: false
    })
    return (
        <div {...getRootProps()} className='relative w-[41%]  rounded-xl flex flex-col  cursor-pointer gap-3  max-sm:w-[79%] max-xl:w-[69%] '>
            {content && <label className={`font-semibold font-Poppins text-teal-700/85`}>{content}</label>}
            <div className=' w-full flex items-center pl-17 py-3 max-sm:pl-14 border-2 border-dashed border-gray-400 hover:bg-gray-100 rounded-xl'>
                <input {...getInputProps()}/>
                <LuPackageOpen size={28} className='absolute top-12 left-5'/>
                {isDragActive ? <p className='text-gray-600 '>Drop the dile heree..</p> : <p className='text-gray-600'>Drag & drop file here, or click to select</p>}
                {eror && <p className='text-red-500 text-sm mt-2'>{eror}</p>}
                <ul className='mt-3'>
                {files.map((file,idx) => (
                    <li key={idx} className='text-sm text-gray-800'>{file.name}</li>
                ))}
                </ul>
            </div>
        </div>
    )
}

export default DragDropUpload

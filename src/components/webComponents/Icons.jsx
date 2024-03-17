import React, { useState, useEffect } from 'react'
import { materialIcons } from "../../utils/icons"
import { useDispatch } from 'react-redux';
import { addNotification } from '../../store/notificationSlice';

export default function Icons() {
    const [search, setSearch] = useState('')
    const [filteredIcons, setFilteredIcons] = useState(materialIcons);
    const dispatch = useDispatch();

    useEffect(() => {
        if (search.trim() !== '') {
            const timer = setTimeout(() => {
                const searchTerm = search.toLowerCase().trim().replaceAll(' ', '_');
                // Filter the materialIcons array based on the search query
                const matchingIcons = materialIcons.filter(icon => icon.includes(searchTerm));
                setFilteredIcons(matchingIcons)
            }, 700);
            return () => clearTimeout(timer);
        } else {
            setFilteredIcons(materialIcons)
        }
    }, [search])

    return (
        <div className='w-full h-full-50px rounded-b-lg overflow-y-auto'>
            <div className='w-full flex flex-nowrap justify-center my-1'>
                <label htmlFor="searchIcon"
                    className='material-symbols-outlined text-white pt-2 px-3 bg-gray-700 rounded-l-full'>
                    search
                </label>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="searchIcon"
                    placeholder="Search Icon"
                    className=' w-56 h-10 md:w-80 bg-gray-700 text-white px-2 py-1 rounded-r-full outline-none'
                />
            </div>
            <div className='w-full flex flex-wrap justify-center text-white p-2 md:px-6 md:py-3'>
                {filteredIcons.map((icon, index) => (
                    <button onClick={() => {
                        navigator.clipboard.writeText(`<span class="material-symbols-outlined">${icon}</span>`)
                        dispatch(addNotification({ type: "success", text: "Text Copied Successfully!" }))
                    }} title={icon} key={index}
                        className='material-symbols-outlined p-2 transition duration-300 ease-in-out hover:scale-150'>
                        {icon}
                    </button>
                ))}
            </div>
        </div>
    )
}

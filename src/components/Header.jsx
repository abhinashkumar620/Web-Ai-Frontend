import React from 'react'

const Header = ({ website }) => {
    return (
        <div className='h-14 px-3 sm:px-4 flex items-center justify-between  border-b  border-white/60 bg-black/40 w-[261px] md:w-full'>

            <span className='font-semibold text-sm sm:text-base truncate max-w-[200px] sm:max-w-full '>
                {website?.title}
            </span>

        </div>
    )
}

export default Header
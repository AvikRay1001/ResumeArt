import React from 'react'

const TemplateCard = ({thumbnailImg, isSelected, onSelect}) => {
  return (
    <div
        className={`h-auto md:h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-blue-200 hover:border-blue-300 overflow-hidden cursor-pointer
        ${isSelected ? "border-blue-500 border-2": "border-none"}`}
        onClick={onSelect}
    >
        {thumbnailImg ? (
            <img src={thumbnailImg} alt='' className='w-[100%] rounded'/>
        ) : (
            <div></div>
        )}
    </div>
  )
}

export default TemplateCard
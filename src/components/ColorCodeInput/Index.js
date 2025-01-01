import React, { useEffect } from 'react'
import './style.css'
const ColorCodeInput = ({ label = "color", id, value, handleChange }) => {


    return (
        <div className="customColorInput">
            <label htmlFor="colorCodePreview" className="input-label color-label">{label}</label>
            <input onChange={handleChange} type="text" id={id} name="themeIconLightBg" className="customColorInput__text-input jsColorValue" defaultValue={value} />
            <label htmlFor="colorCodeSelection" className="visually-hidden">Color Selection</label>
            <input onChange={handleChange} type="color" id={id} className="customColorInput__select-input" defaultValue={value} />
        </div>

    )
}

export default ColorCodeInput
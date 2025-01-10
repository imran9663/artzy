import React from 'react'
import './styles.css'
const RangeSlider = ({ id, name, label, value, min, max, steps, handleChange }) => {
    return (
        <div className="input-wrapper ">
            <label className="range-input-label text-light" htmlFor={name}>
                {label}
            </label>
            <input
                onChange={handleChange}
                type={'range'}
                className="rangeSlider"
                min={min}
                max={max}
                step={steps}
                value={value}
                name={name}
                id={id}
            />
            <input
                type="text"
                className="form-control range-input "
                name={name}
                id={id}
                value={value}
                onChange={handleChange}
            />


        </div>
    )
}

export default RangeSlider
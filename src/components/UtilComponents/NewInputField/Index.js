import React from 'react'
import './style.css'
const NewInputField = (props) => {
    const { name, id, type = 'text', placeholder = '', value, label, handleChange, handleBlur, toolTipTitle = '' } = props
    return (
        <div className="input-wrapper  ">
            <label data-bs-toggle="tooltip" data-bs-placement="left" title={toolTipTitle} className="input-label font-dark-bg " htmlFor={name}>
                {label}
            </label>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                className="form-control  input font-dark-bg"
                value={value}
                name={name}
                placeholder={placeholder}
                id={id}
                {...props}
            />
        </div>
    )
}

export default NewInputField
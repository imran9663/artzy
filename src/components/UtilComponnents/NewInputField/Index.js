import React from 'react'
import './style.css'
const NewInputField = (props) => {
    const { name, id, type = 'text', placeholder = '', value, label, handleChange, handleBlur } = props
    return (
        <div className="input-wrapper  ">
            <label className="input-label text-light" htmlFor={name}>
                {label}
            </label>
            <input
                onChange={handleChange}
                onBlur={handleBlur}
                type={type}
                className="form-control  input"
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
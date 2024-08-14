import React from 'react'

const FormRowSelect = ({ name, label, value, handlechange, list }) => {
    return (
        <div className='form-row'>
            <label htmlFor={label}>
                {label || name}
            </label>
            <select name={name} value={value} onChange={handlechange} className="form-select">
                {list.map((item, index) => {
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default FormRowSelect
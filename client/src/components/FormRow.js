import React from 'react';

const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='form-label'>
                {labelText || name}
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                className='form-input'
            />
        </div>
    )
};

export default FormRow;


/* <form className='form' onSubmit={handleSubmit}>
    <Logo />
    <label htmlFor="name" className='form-label'>
        Name
    </label>
    <input
        type="text"
        value={values.name}
        onChange={handlechange}
        className='form-input'
    />
    <button type='submit' className='btn btn-block'>submit</button> 
    </form>
    */
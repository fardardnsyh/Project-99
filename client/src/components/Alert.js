import React from 'react';
// import { useState } from 'react';
import { useAppContext } from '../context/appContext';



const Alert = () => {
    const { alertText, alertType } = useAppContext()

    return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;

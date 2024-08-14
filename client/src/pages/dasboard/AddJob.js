import { FormRow, FormRowSelect, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    const {
        isLoading,
        showAlert,
        displayAlert,
        isEditing,
        position,
        company,
        jobLocation,
        jobTypeOptions,
        jobType,
        statusOptions,
        status,
        handlechange,
        clearvalues,
        createjob,
        editedJobId,
        editJob
    } = useAppContext()
    // console.log(jobLocation);

    const handleJobInput = (e) => {
        e.preventDefault()
        const name = e.target.name;
        const value = e.target.value;
        // console.log(`${name}, ${value}`)
        handlechange({ name, value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!position || !company || !jobLocation) {
            displayAlert()
            return
        }
        if (isEditing) {
            editJob()
            return
        }
        createjob()

    }

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'Edit Job' : 'Add Job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    {/* {position} */}
                    <FormRow type='text' name='position' value={position} handleChange={handleJobInput} />
                    {/* {company} */}
                    <FormRow type='text' name='company' value={company} handleChange={handleJobInput} />
                    {/* {jobLocation} */}
                    <FormRow type='text' labelText='Job Location' name='jobLocation' value={jobLocation} handleChange={handleJobInput} />
                    {/* {jobType} */}
                    {/* <div className='form-row'>
                        <label htmlFor="jobType">
                            job type
                        </label>
                        <select name="jobType" value={jobType} onChange={handleJobInput} className="form-select">
                            {jobTypeOptions.map((item, index) => {
                                return <option key={index} value={item}>{item}</option>
                            })}
                        </select>
                    </div> */}
                    <FormRowSelect label="Job Type" name="jobType" value={jobType} list={jobTypeOptions} handlechange={handleJobInput} />
                    {/* {jobStatus} */}
                    <FormRowSelect label='Job Status' name="status" list={statusOptions} value={status} handlechange={handleJobInput} />
                    <div className='btn-container'>
                        <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit} disabled={isLoading}>submit</button>
                        <button type='submit' className='btn btn-block clear-btn' onClick={(e) => {
                            e.preventDefault()
                            clearvalues()
                            // console.log('first')
                        }}>clear</button>
                    </div>

                </div>
            </form>
        </Wrapper>
    )
}

export default AddJob
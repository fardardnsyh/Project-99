import React from 'react'
import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Job'
import JobInfo from './JobInfo'

const SingleJobContainer = ({ company, createdAt, _id, position, jobType, jobLocation, status }) => {
    const time = moment(createdAt).format(" MMM Do YY");
    const { deleteJob, seteditJob } = useAppContext()
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                {/* content center later */}
                <div className="content-center">
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={time} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/AddJob'
                            onClick={() => seteditJob(_id)}
                            className='btn edit-btn'
                        >
                            Edit
                        </Link>
                        <button
                            type='button'
                            className='btn delete-btn'
                            onClick={() => deleteJob(_id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default SingleJobContainer
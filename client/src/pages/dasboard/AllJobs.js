import React from 'react'
import { SearchContainer, Loading, SingleJobContainer } from '../../components';
import { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from "../../assets/wrappers/JobsContainer";
import PagesBtnContainer from '../../components/PagesBtnContainer';


const AllJobs = () => {
    const { jobs, totalJobs, page, numOfPages, getJobs, isLoading, search, searchJobType, searchStatus, sort } = useAppContext()
    useEffect(() => {
        getJobs()
        // eslint-disable-next-line 
    }, [search, searchJobType, searchStatus, sort, page])
    if (isLoading) {
        <Loading center />
    }
    if (jobs.length === 0) {
        return (<Wrapper>
            <h2>No jobs to display...</h2>
        </Wrapper>)
    }
    return (
        <Wrapper>
            <SearchContainer />
            <h5>{totalJobs} Job{totalJobs > 1 ? "s" : ""} found</h5>
            <div className='jobs'>
                {jobs.map((job) => {
                    return <SingleJobContainer key={job._id} {...job} />
                })}
            </div>
            {numOfPages > 1 && <PagesBtnContainer />}
        </Wrapper>
    )
}

export default AllJobs
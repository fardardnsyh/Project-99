import React from 'react'
import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
    const { isLoading, search, searchJobType, searchStatus, sort, sortOptions, clearFilters, handlechange, statusOptions, jobTypeOptions } = useAppContext()
    const handleSearch = (e) => {
        if (isLoading) return //once the fetch is done return something
        handlechange({ name: e.target.name, value: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilters()
    }

    return (
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                {/* search position */}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>
                    {/* search by status */}
                    <FormRowSelect
                        labelText='job status'
                        name='searchStatus'
                        value={searchStatus}
                        handlechange={handleSearch}
                        list={['all', ...statusOptions]}
                    ></FormRowSelect>
                    {/* search by type */}

                    <FormRowSelect
                        labelText='job type'
                        name='searchJobType'
                        value={searchJobType}
                        handlechange={handleSearch}
                        list={['all', ...jobTypeOptions]}
                    ></FormRowSelect>
                    {/* sort */}

                    <FormRowSelect
                        name='sort'
                        value={sort}
                        handlechange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filters
                    </button>
                </div>
            </form>

        </Wrapper>
    )
}

export default SearchContainer
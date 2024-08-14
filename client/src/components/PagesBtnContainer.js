import React from 'react'
import { useAppContext } from '../context/appContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import Wrapper from '../assets/wrappers/PageBtnContainer'

const PagesBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext()

    const pages = Array.from({ length: numOfPages }, (v, i) => {
        return i + 1
    })
    // console.log(pages);
    const nextpagebtn = () => {
        let newPage = page + 1
        if (newPage > numOfPages) {
            // newPage = numOfPages
            // alternative
            newPage = 1
        }
        changePage(newPage)
    }
    const prevpagebtn = () => {
        let newPage = page - 1
        if (newPage < 1) {
            // newPage = 1
            // alternative
            newPage = numOfPages
        }
        changePage(newPage)
    }
    return (
        <Wrapper>
            <button className='prev-btn' onClick={prevpagebtn}>
                <HiChevronDoubleLeft />
                prev
            </button>

            <div className='btn-container'>{
                pages.map((pageNumber) => {
                    return (
                        <button
                            type='button'
                            key={pageNumber}
                            className={pageNumber === page ? `pageBtn active` : `pageBtn`}
                            onClick={() => changePage(pageNumber)}>
                            {pageNumber}
                        </button>)
                })
            }</div>

            <button className='next-btn' onClick={nextpagebtn}>
                next
                <HiChevronDoubleRight />
            </button>
        </Wrapper>
    )
}

export default PagesBtnContainer
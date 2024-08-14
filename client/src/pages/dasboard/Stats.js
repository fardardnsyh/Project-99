import React from 'react'
import { useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { StatsContainer, Loading, ChartContainer } from '../../components'

const Stats = () => {
    const { showStats, monthlyApplications, isLoading } = useAppContext()
    useEffect(() => {
        showStats()
        // eslint-disable-next-line 
    }, [])

    if (isLoading) {
        return <Loading center />
    }
    return (
        <>
            <StatsContainer />
            {monthlyApplications.length > 1 && <ChartContainer />}
        </>
    )
}

export default Stats
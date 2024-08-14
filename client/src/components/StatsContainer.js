import React from 'react'
import StatsItem from './StatsItem'
import { useAppContext } from '../context/appContext'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa'
import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
    const { stats } = useAppContext()
    const defaultStats = [
        {
            id: 1,
            title: 'pending applications',
            count: stats.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7',
        },
        {
            id: 2,
            title: 'interviews scheduled',
            count: stats.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
        },
        {
            id: 3,
            title: 'jobs declined',
            count: stats.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
        },
    ]
    return (
        <Wrapper>
            {defaultStats.map((item) => {
                return <StatsItem key={item.id} {...item} />
            })}
        </Wrapper>
    )
}

export default StatsContainer
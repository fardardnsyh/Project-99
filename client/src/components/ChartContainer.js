import React, { useState } from 'react'
import BarChartComponent from './BarChart'
import AreaChartComponent from './AreaChart'
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

const ChartContainer = () => {
    const { monthlyApplications: data } = useAppContext()
    // console.log(JSON.stringify(data));
    const [barChart, setbarChart] = useState(true)

    return (
        <Wrapper>
            <h4>Monthly applications</h4>
            <button onClick={() => setbarChart(!barChart)}>{barChart ? 'BarChart' : 'AreaChart'}</button>
            {barChart ? <BarChartComponent data={data} /> : <AreaChartComponent data={data} />}
        </Wrapper>
    )
}

export default ChartContainer
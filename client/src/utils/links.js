import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";


const links = [
    {
        id: 1,
        icon: <IoBarChartSharp />,
        path: '/',
        text: 'stats',
    },
    {
        id: 2,
        icon: <MdQueryStats />,
        path: 'AllJobs',
        text: 'Jobs',
    }, {
        id: 3,
        icon: <FaWpforms />,
        path: 'AddJob',
        text: 'Add Job',
    }, {
        id: 4,
        icon: <ImProfile />,
        path: 'Profile',
        text: 'Profile',
    },
]

export default links
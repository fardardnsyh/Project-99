import Wrapper from '../assets/wrappers/Navbar.js'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext';
import Logo from './logo'
import { useState } from 'react';


const NavBar = () => {
    const [showLogOut, setshowLogOut] = useState(false)
    const { user, logout, toggleSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className="nav-center">
                <button type='button' className='toggle-btn' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>Dashboard</h3>
                </div>
                <div className="btn-container">
                    <button type='button' className='btn' onClick={() => setshowLogOut(!showLogOut)}>
                        <FaUserCircle />
                        {user && user.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogOut ? 'show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logout}>
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default NavBar
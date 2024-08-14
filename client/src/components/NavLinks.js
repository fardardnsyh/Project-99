import React from 'react'
import { NavLink } from 'react-router-dom'
import links from '../utils/links'
import { useAppContext } from '../context/appContext'

const Navlinks = ({ toggleSidebar }) => {

    return (
        <div className="nav-links">{links.map((link) => {
            const { id, icon, path, text } = link
            return (
                <NavLink onClick={toggleSidebar} key={id} to={path} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                    <span className="icon">{icon}</span>{text}
                </NavLink>
            )
        })}
        </div>
    )
}

export default Navlinks
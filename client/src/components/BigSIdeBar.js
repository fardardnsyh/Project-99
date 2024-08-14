import Wrapper from '../assets/wrappers/BigSidebar.js'
import { useAppContext } from '../context/appContext';
import Logo from './logo';
import Navlinks from './NavLinks';

const BigSideBar = () => {
    const { showSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className={showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`}>
                <div className='content'>
                    <header>
                        <Logo />
                    </header>
                    <Navlinks />
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSideBar
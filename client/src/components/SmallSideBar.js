import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import Logo from "./logo";
import { useAppContext } from '../context/appContext';
import Navlinks from "./NavLinks";

const SmallSideBar = () => {
    const { showSidebar, toggleSidebar } = useAppContext()
    return (
        <Wrapper>
            <div className={showSidebar ? `sidebar-container show-sidebar` : `sidebar-container`}>
                <div className="content">
                    <button className="close-btn" onClick={toggleSidebar}>
                        <FaTimes />
                    </button>
                    <header>
                        <Logo />
                    </header>
                    <Navlinks toggleSidebar={toggleSidebar} />
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSideBar
import Github from "./icons/Github";
import Linkedn from "./icons/Linkedin";
import "./style/Navbar.css";


export default function Navbar(){
    return (
        <div id="navbar">
            <div id="navbar-container">
                <div className="navbar-item" id="navbar-left">
                    <a href="/" id="navbar-logo-container">
                        <svg width="25" height="25" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.0002 3H4.2002C3.08009 3 2.51962 3 2.0918 3.21799C1.71547 3.40973 1.40973 3.71547 1.21799 4.0918C1 4.51962 1 5.08009 1 6.2002V15.8002C1 16.9203 1 17.4801 1.21799 17.9079C1.40973 18.2842 1.71547 18.5905 2.0918 18.7822C2.5192 19 3.07899 19 4.19691 19H13.8031C14.921 19 15.48 19 15.9074 18.7822C16.2837 18.5905 16.5905 18.2839 16.7822 17.9076C17 17.4802 17 16.921 17 15.8031V13M13 4L7 10V13H10L16 7M13 4L16 1L19 4L16 7M13 4L16 7" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <p id="to-do-heading"> To Do List.</p>
                    </a>
                </div>
                <div className="navbar-item" id="navbar-right">
                    <div id="navbar-icon-container">
                        <a href="https://github.com/codestays" className="navbar-icon-link">
                            <Github/>
                        </a>
                        <a href="https://www.linkedin.com/in/ernest-matshabe-07a731241" className="navbar-icon-link">
                            <Linkedn/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
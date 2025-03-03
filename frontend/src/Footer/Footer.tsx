import Smile from "../Header/icons/Smile";
import "./style/Footer.css";

export default function Footer(){
    return (
        <div id="footer-main-container">
            <div id="welcome-message-container">
                <div id="wm-message">
                    <p>Thank you for reviewing my project.</p>
                    <Smile/>
                </div>
            </div>
            <div id="footer-container">
                <p id="my-name-is">My name is Ernest Matshabe.</p>
                <p id="footer-divider-character">|</p>
                <p>ematshabe023@student.wethinkcode.co.za</p>
            </div>
        </div>
    );
}
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {

    return (
        <div className="header">
            <header className="wrapper headerFlex">
                <p className="logo">
                    <FontAwesomeIcon className="logoIcon" icon="laptop-medical"/>
                    NUTRI CO  
                </p>
                <nav>
                    <ul className="navFlex">
                        <li><a href="#home">HOME</a></li>
                        <li><a href="#journal">JOURNAL</a></li>
                        <li><a href="#search">SEARCH</a></li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Header;
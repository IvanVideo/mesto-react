import logo from '../images/Vector.png';

function Header() {
    return (
        <div>
            <header className="header header_position_content">
                <img src={logo} alt="Логотип Место" className="logo logo_top-position" />
            </header>
        </div>
    )
}

export default Header
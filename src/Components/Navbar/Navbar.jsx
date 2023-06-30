import "./Navbar.css";
import { AiOutlineSetting } from "react-icons/ai";
const Navbar = () => {
  return (
    <div className="Navbar">
      <h3 className="navbarLogo">LOGO</h3>
      <button className="setting">
        <AiOutlineSetting className="icon" />
      </button>
    </div>
  );
};

export default Navbar;

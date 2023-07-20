import { RiLogoutBoxRLine, RiMap2Line, RiShoppingBasketLine, RiUserLine } from "react-icons/ri";
import { GiMechanicGarage } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BiHomeCircle } from "react-icons/bi";
import "./Menu.css";

export default function Menu({ noMarginTop }) {
  const menuClassName = noMarginTop ? "liste no-margin-top" : "liste";

  return (
    <nav className='nav'>
      <div className={menuClassName}>
        <NavLink to={"/"}>
          <div className='items'><BiHomeCircle size={30} /></div>
        </NavLink>
        <NavLink to={"/réparations"}>
          <div className='items'>
            <GiMechanicGarage size={30} />
          </div>
        </NavLink>
        <NavLink to={"/occasion"}>
          <div className='items'>
            <IoCarSportSharp size={30} /></div>
        </NavLink>
        <NavLink to={"/information"}>
          <div className='items'><BsFillGeoAltFill size={30} /></div>
        </NavLink>
      </div>
    </nav>
  );
}

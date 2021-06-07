import { Link, NavLink } from "react-router-dom";

const activeStyle = {
  color: "#faa541",
};

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">
          <img alt="VanCity Gull Bicycle Shop" src="/images/logo.png" />
        </Link>
        <ul>
          <li>
            <NavLink activeStyle={activeStyle} to="/bikes">
              Bikes
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={activeStyle} to="/cart">
              Cart
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

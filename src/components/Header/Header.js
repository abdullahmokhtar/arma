import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import classes from "./Header.module.css";
import { UserAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <header>
      <div className="container">
        <div className={classes.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          {!user && <NavLink to="/login">Login</NavLink>}
          {user && (
            <>
              <NavLink to="/admin">Admin</NavLink>
              <button className="btn btn-success ms-3" onClick={logoutHandler}>
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

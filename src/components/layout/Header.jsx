import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../assets/images/mango.png';

const Header = () => {
  const shoppingCartFromStore = useSelector(
    (state) => state.shoppingCartStore.cartItems ?? []
  );

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" className="logo" />
          <span className="heading">Joy Meals</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoppingCart">
                <i className="bi bi-cart"></i>{' '}
                {shoppingCartFromStore.length
                  ? `(${shoppingCartFromStore.length})`
                  : ''}
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Admin Panel
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Another action
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="#">
                    Something else here
                  </NavLink>
                </li>
              </ul>
            </li>
            <div className="d-flex" style={{ marginLeft: 'auto' }}>
              <li className="nav-item">
                <button
                  className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                  style={{ border: 'none', height: '40px', width: '100px' }}
                >
                  Logout
                </button>
              </li>
              <li className="nav-item text-white">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
              <li className="nav-item text-white">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

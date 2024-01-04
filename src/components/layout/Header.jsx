import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  emptyUserState,
  setLoggedInUser,
} from '../../store/redux/userAuthSlice';

import logo from '../../assets/images/mango.png';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shoppingCartFromStore = useSelector(
    (state) => state.shoppingCartStore.cartItems ?? []
  );

  const userData = useSelector((state) => state.userAuthStore);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate('/');
  };

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
            {userData.role === 'admin' ? (
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin Panel
                </Link>
                <ul className="dropdown-menu">
                  <li
                    className="dropdown-item"
                    onClick={() => navigate('/order/myorders')}
                    style={{ cursor: 'pointer' }}
                  >
                    My Orders
                  </li>
                  <li
                    className="dropdown-item"
                    onClick={() => navigate('/order/allorders')}
                    style={{ cursor: 'pointer' }}
                  >
                    All Orders
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/order/myorders">
                  My Orders
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" to="/shoppingCart">
                <i className="bi bi-cart"></i>{' '}
                {userData.id && `(${shoppingCartFromStore.length})`}
              </NavLink>
            </li>
            <div className="d-flex" style={{ marginLeft: 'auto' }}>
              {userData.id && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      style={{
                        cursor: 'pointer',
                        background: 'transparent',
                        border: 0,
                      }}
                    >
                      Welcome, {userData.fullName}
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="btn btn-success btn-outlined rounded-pill text-white mx-2"
                      style={{ border: 'none', height: '40px', width: '100px' }}
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
              {!userData.id && (
                <>
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
                </>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

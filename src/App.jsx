import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import {
  Home,
  MenuItemDetails,
  ShoppingCart,
  Register,
  Login,
  Payment,
  OrderConfirmed,
  MyOrders,
  NotFound,
} from './pages';
import { useGetShoppingCartQuery } from './apis/shoppingCartApi';
import { setShoppingCart } from './store/redux/shoppingCartSlice';
import { setLoggedInUser } from './store/redux/userAuthSlice';
import { jwtDecode } from 'jwt-decode';

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userAuthStore);
  const { isLoading, data } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (localToken) {
      const { id, fullName, email, role } = jwtDecode(localToken);
      dispatch(setLoggedInUser({ id, fullName, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) dispatch(setShoppingCart(data.result?.cartItems));
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route
            path="/order/orderconfirmed/:id"
            element={<OrderConfirmed />}
          />
          <Route path="/order/myorders" element={<MyOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;

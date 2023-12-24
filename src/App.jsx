import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { Header, Footer } from './components/layout';
import { Home, MenuItemDetails, NotFound } from './pages';
import { useGetShoppingCartQuery } from './apis/shoppingCartApi';
import { setShoppingCart } from './store/redux/shoppingCartSlice';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, data } = useGetShoppingCartQuery(
    '89ffdadf-b999-4911-a48c-b956ccfa0c9c'
  );

  useEffect(() => {
    if (!isLoading) dispatch(setShoppingCart(data.result.cartItems));
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;

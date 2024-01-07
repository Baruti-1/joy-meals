import { useState, useEffect } from 'react';
import { MainLoader } from '../common';
import { useGetMenuItemsQuery } from '../../../apis/menuItemApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuItem } from '../../../store/redux/menuItemSlice';
import MenuItemCard from './MenuItemCard';

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery();

  const searchValue = useSelector((state) => state.menuItemStore.search);

  useEffect(() => {
    if (data && data.result) {
      const tempMenuArray = handleFilters(searchValue);
      setMenuItems(tempMenuArray);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
      setMenuItems(data.result);
    }
  }, [isLoading]);

  const handleFilters = (search) => {
    let tempMenuItems = [...data.result];
    // search feature
    if (search) {
      const tempSearchMenuItems = [...tempMenuItems];
      tempMenuItems = tempSearchMenuItems.filter((item) =>
        item.name.toUpperCase().includes(search.toUpperCase())
      );
    }
    return tempMenuItems;
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center" style={{ width: '100%' }}>
        <MainLoader />
      </div>
    );
  }

  return (
    <div className="container row">
      {menuItems.length > 0 &&
        menuItems.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;

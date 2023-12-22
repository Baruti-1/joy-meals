import { useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';
import { useGetMenuItemsQuery } from '../../../apis/menuItemApi';
import { useDispatch } from 'react-redux';
import { setMenuItem } from '../../../store/redux/menuItemSlice';

const MenuItemList = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetMenuItemsQuery();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setMenuItem(data.result));
    }
  }, [isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container row">
      {data.result.length > 0 &&
        data.result.map((menuItem) => (
          <MenuItemCard key={menuItem.id} menuItem={menuItem} />
        ))}
    </div>
  );
};

export default MenuItemList;

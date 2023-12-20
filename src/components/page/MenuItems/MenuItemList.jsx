import { useState, useEffect } from 'react';
import MenuItemCard from './MenuItemCard';

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('https://redmangoapi.azurewebsites.net/api/MenuItem')
      .then((res) => res.json())
      .then((data) => setMenuItems(data.result));
  }, []);

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

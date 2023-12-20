import { useState, useEffect } from 'react';

const MenuItemList = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('https://redmangoapi.azurewebsites.net/api/MenuItem')
      .then((res) => res.json())
      .then((data) => setMenuItems(data.result));
  }, []);

  return <div>Menu Item List</div>;
};

export default MenuItemList;

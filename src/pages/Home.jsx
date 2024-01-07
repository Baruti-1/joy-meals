import React from 'react';
import { MenuItemList } from '../components/page/MenuItems';
import { Banner } from '../components/page/common';

const Home = () => {
  return (
    <>
      <Banner />
      <div className="container p-2">
        <MenuItemList />
      </div>
    </>
  );
};

export default Home;

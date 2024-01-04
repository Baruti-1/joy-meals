import React from 'react';
import withAuth from '../../hoc/withAuth';
import { useSelector } from 'react-redux';
import { useGetAllOrdersQuery } from '../../apis/orderApi';
import { MainLoader } from '../../components/page/common';
import OrderList from './OrderList';

const MyOrders = () => {
  const userId = useSelector((state) => state.userAuthStore.id);
  const { isLoading, data } = useGetAllOrdersQuery(userId);

  if (isLoading) {
    return <MainLoader />;
  }

  return <OrderList data={data} />;
};

export default withAuth(MyOrders);

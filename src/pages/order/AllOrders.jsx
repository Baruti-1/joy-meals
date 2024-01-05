import React from 'react';
import withAuth from '../../hoc/withAuth';
import { useGetAllOrdersQuery } from '../../apis/orderApi';
import { MainLoader } from '../../components/page/common';
import OrderList from '../../components/page/order/OrderList';

const AllOrders = () => {
  const { isLoading, data } = useGetAllOrdersQuery('');

  if (isLoading) {
    return <MainLoader />;
  }

  return <OrderList data={data} />;
};

export default withAuth(AllOrders);

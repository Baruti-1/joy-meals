const getStatusColor = (status) => {
  return status === 'confirmed'
    ? 'primary'
    : status === 'pending'
    ? 'secondary'
    : status === 'Cancelled'
    ? 'danger'
    : status === 'Completed'
    ? 'success'
    : status === 'Being Cooked'
    ? 'info'
    : status === 'Ready for Pickup' && 'warning';
};

export default getStatusColor;

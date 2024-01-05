const getStatusColor = (status) => {
  return status === 'confirmed'
    ? 'primary'
    : status === 'pending'
    ? 'secondary'
    : status === 'Cancelled'
    ? 'danger'
    : status === 'completed'
    ? 'success'
    : status === 'being_cooked'
    ? 'info'
    : status === 'ready_for_pickup' && 'warning';
};

export default getStatusColor;

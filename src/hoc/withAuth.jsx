const withAuth = (WrappedComponent) => {
  return (props) => {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      window.location.replace('/login');
      return;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="footer fixed-bottom text-center p-3 bg-dark text-white">
      &copy; 2023 - {year}
    </div>
  );
};

export default Footer;

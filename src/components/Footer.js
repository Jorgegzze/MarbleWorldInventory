
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p><a href="https://www.marbleworld.com">www.marbleworld.com</a></p>
        <p>2da de Magnolia 1617,<br/>Colonia Reforma,<br/>Monterrey, Nuevo León,<br/>México</p>
      </div>
      <div className="footer-center">
        <p><strong>Lunes - Viernes:</strong> 9:30 AM - 5:30 PM<br/>
           <strong>Sábado:</strong> 10:00 AM - 1:00 PM<br/>
           <strong>Domingo:</strong> Cerrado</p>
      </div>
      <div className="footer-right">
        <p><i className="fab fa-instagram"></i> @marbleworldmex</p>
        <p><i className="fab fa-facebook"></i> marbleworldmex</p>
        <p><i className="fab fa-whatsapp"></i> +52 81 4048 8845</p>
      </div>
    </footer>
  );
};

export default Footer;

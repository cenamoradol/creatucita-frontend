import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>CreaTuCita.com</h3>
          <p>Tu plataforma confiable para agendar citas de servicios profesionales.</p>
        </div>

        <div className="footer-section">
          <h4>Categorías</h4>
          <ul className="footer-links">
            <li><Link to="/salud">Salud</Link></li>
            <li><Link to="/estetica">Estética</Link></li>
            <li><Link to="/legal">Legal</Link></li>
            <li><Link to="/artesanal">Artesanal</Link></li>
            <li><Link to="/veterinaria">Veterinaria</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contacto</h4>
          <ul className="footer-contact">
            <li>
              <Mail size={16} />
              <span>info@creatucita.com</span>
            </li>
            <li>
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </li>
            <li>
              <MapPin size={16} />
              <span>San Pedro Sula, Cortes, Honduas</span>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Instagram</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 CreaTuCita.com. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom"
import "../designs/Footer.css"
import { useState } from 'react'

function Footer() {
  return (
    <>
    <footer>
      <div className="footer-container">
        {/* Main Content Section */}
        <div className="footer-content">
          <div className="footer-section">
            <h4>About</h4>
            <p>Passionate developer creating innovative web solutions with modern technologies and clean design principles.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/About">About</Link></li>
              <li><Link to="/Research">Research</Link></li>
              <li><Link to="/Connect">Contact</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Technologies</h4>
            <div className="tech-tags">
              <span>React</span>
              <span>JavaScript</span>
              <span>CSS</span>
              <span>Node.js</span>
              <span>HTML</span>
              <span>Python</span>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Connect</h4>
            <div className="contact-info">
              <p><i className="fas fa-envelope"></i> <a href="mailto:lpnk959@gmail.com">lpnk959@gmail.com</a></p>
              <p><i className="fas fa-map-marker-alt"></i> Available for remote work</p>
            </div>
            <div className="social-icons">
              <a href="https://www.instagram.com/khang_luong_314/" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/in/khang-luong-776ab8277/" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
              <a href="https://github.com/KhangLuong314" aria-label="GitHub"><i className="fab fa-github"></i></a>
              <a href="https://twitter.com" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-credits">
            <p>&copy; {new Date().getFullYear()} Khang Luong. All rights reserved.</p>
            <p>Built with React • Designed with passion</p>
          </div>
        </div>
      </div>
    </footer>
    </>
  )
}

export default Footer
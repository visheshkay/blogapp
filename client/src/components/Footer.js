import React from 'react'
import './Footer.css'
function Footer() {
    return (
        <footer className="section bg-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="">
                <h6 className="footer-heading text-uppercase text-white">
                  Information
                </h6>
                <ul className="list-unstyled footer-link mt-4">
                  <li>
                    <a href="">Pages</a>
                  </li>
                  <li>
                    <a href="">Our Team</a>
                  </li>
                  <li>
                    <a href="">Features</a>
                  </li>
                  <li>
                    <a href="">Pricing</a>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="col-lg-3">
              <div className="">
                <h6 className="footer-heading text-uppercase text-white">
                  Resources
                </h6>
                <ul className="list-unstyled footer-link mt-4">
                  <li>
                    <a href="">Wikipedia </a>
                  </li>
                  <li>
                    <a href="">React blog</a>
                  </li>
                  <li>
                    <a href="">Term &amp; Service</a>
                  </li>
                  <li>
                    <a href="">Angular dev</a>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="col-lg-2">
              <div className="">
                <h6 className="footer-heading text-uppercase text-white">Help</h6>
                <ul className="list-unstyled footer-link mt-4">
                  <li>
                    <a href="/new-user">Sign Up </a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                  <li>
                    <a href="">Terms of Services</a>
                  </li>
                  <li>
                    <a href="">Privacy Policy</a>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="col-lg-4">
              <div className="">
                <h6 className="footer-heading text-uppercase text-white">
                  Contact Us
                </h6>
                <p className="contact-info mt-4">
                  Contact us if need help with anything
                </p>
                <p className="contact-info">+91 7075638361</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="text-center mt-5">
          <p className="footer-alt mb-0 f-14" style={{color:"black"}}>2019 © BLOG, All Rights Reserved</p>
        </div>
      </footer>
    )
}

export default Footer

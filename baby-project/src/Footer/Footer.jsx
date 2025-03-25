import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from "react-icons/fa";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-sky-100 text-black py-10">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
             
              <div>
                <h3 className="text-lg font-semibold mb-3">Shop Now</h3>
                <ul className="space-y-2">
                  <li>Baby Wipes</li>
                  <li>Unscented Baby Products</li>
                  <li>Detergent & Cleanser</li>
                  <li>Baby Protection & Relief</li>
                  <li>Baby Creams & Lotions</li>
                  <li>Baby Soap & Body Wash</li>
                  <li>Baby Shampoo</li>
                  <li>Baby Oils</li>
                  <li>Baby Sunscreen</li>
                </ul>
              </div>
    
              
              <div>
                <h3 className="text-lg font-semibold mb-3">Categories</h3>
                <ul className="space-y-2">
                  <li>Under ₹149</li>
                  <li>Baby</li>
                  <li>Kids</li>
                  <li>Skin Care</li>
                  <li>Premium Gifts</li>
                  <li>New Arrivals</li>
                </ul>
              </div>
    
             
              <div>
                <h3 className="text-lg font-semibold mb-3">Useful Links</h3>
                <ul className="space-y-2">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Account</li>
                  <li>Blog</li>
                  <li>Track Order</li>
                  <li>Return Policy</li>
                  <li>Privacy Policy</li>
                  <li>Shipping Policy</li>
                  <li>Testimonials</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
    
             
              <div>
                <h3 className="text-lg font-semibold mb-3">Customer Support</h3>
                <p className="mb-2">Toll Free: <span className="font-bold">18001213694</span></p>
                <p className="mb-2">WhatsApp: <span className="font-bold">9817700876</span></p>
                <p className="mb-4">Email: <span className="font-bold">contact@mothersparsh.com</span></p>
                <p>Available: <span className="font-bold">Monday - Saturday, 10 AM - 6 PM</span></p>
    
               
                <div className="flex space-x-4 mt-4">
                  <FaFacebook className="text-2xl text-black hover:text-gray-500 cursor-pointer" />
                  <FaTwitter className="text-2xl text-black hover:text-gray-500 cursor-pointer" />
                  <FaPinterest className="text-2xl text-black hover:text-gray-500 cursor-pointer" />
                  <FaInstagram className="text-2xl text-black hover:text-gray-500 cursor-pointer" />
                </div>
              </div>
            </div>
    
           
            <div className="text-center mt-8 border-t border-gray-300 pt-4">
              <p>© 2025 Mother Sparsh. All Rights Reserved.</p>
            </div>
    
          </div>
        </footer>
      );
};

export default Footer;

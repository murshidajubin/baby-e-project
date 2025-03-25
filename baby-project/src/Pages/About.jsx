import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import Navbar from "../NavbarContext/Navbar";
import Footer from "../Footer/Footer";

const About = () => {
    return (
        <div className="w-full text-gray-800 bg-white">
           
            <Navbar />

           
            <div className="w-full bg-white">
                <img 
                    src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/mothercare/banner/318_202406131114_MC_Exclusive_Strip_Banner_05.06.24.jpg?width=1804&height=132&mode=fill&fill=solid&fill-color=FFFFFF" 
                    alt="Exclusive Baby Products"
                    className="w-full h-auto"
                />
            </div>

           
            <section className="max-w-5xl mx-auto p-6 text-center bg-white">
                <h1 className="text-4xl font-bold mb-4">About Us</h1>
                <p className="text-lg">
                    Welcome to <span className="font-semibold">Mother Sparsh</span>, your trusted destination for premium and eco-friendly baby products.
                    We are committed to offering high-quality, organic, and safe baby care essentials that cater to your little one's needs with love and care.
                </p>
            </section>

        
<section className="bg-gray-100 py-16 flex justify-center">
    <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-lg text-gray-600">
                At <span className="font-semibold text-gray-900">Mother Sparsh</span>, we strive to provide the best baby care essentials, from organic skincare to sustainable baby products.
                Our focus is on <strong className="text-gray-900">safety, purity, and innovation</strong>, ensuring that every product meets the highest standards of quality and sustainability.
            </p>
        </div>
    </div>
</section>


            
             <section className="bg-whit-100 py-10">
                <div className="max-w-5xl mx-auto px-6">
                    <h2 className="text-3xl font-semibold text-center mb-6 text-blue-600">Customer Reviews</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white shadow-md rounded-full p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">⭐️⭐️⭐️⭐️⭐️ - Emily R.</h3>
                            <p>"Absolutely love these products! My baby's skin has never been happier. Highly recommend!"</p>
                        </div>
                        <div className="bg-white shadow-md rounded-full p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">⭐️⭐️⭐️⭐️ - Michael D.</h3>
                            <p>"Great quality and very safe for my newborn. Will definitely purchase again."</p>
                        </div>
                    </div>
                </div>
            </section>
            
           
            <Footer/>
        </div>
    );
};

export default About;

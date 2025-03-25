import React, { useContext } from "react";
import Navbar from "../NavbarContext/Navbar";
import AuthContext from "../Context/AuthContext";
import Footer from "../Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";



const categories = [
  { name: "Skincare", image: "https://buny.wpbingosite.com/wp-content/uploads/2023/12/category-1.jpg", path: "/skincare" },
  { name: "Boy", image: "https://buny.wpbingosite.com/wp-content/uploads/2023/12/category-2.jpg", path: "/boy" },
  { name: "Girl", image: "https://buny.wpbingosite.com/wp-content/uploads/2023/12/category-3.jpg", path: "/girl" },
  { name: "Baby Toys", image: "https://buny.wpbingosite.com/wp-content/uploads/2023/12/category-4.jpg", path: "/toys" }
];


const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-pink-100">
      <Navbar />

     
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1741545000-mc_webbanner_babytrend_1920x650_final-100.jpg"
              className="d-block w-100"
              alt="Baby Trend"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1739730600-mc_ss25_launch_webbanner_1920x650-100.jpg"
              className="d-block w-100"
              alt="SS25 Launch"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1733682600-mcxmila_destopbanner_1920x650_desktopcopy4-100.jpg"
              className="d-block w-100"
              alt="MC Mila"
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://cdn.pixelspray.io/v2/black-bread-289bfa/XUefL6/wrkr/original/catalog/brandstore/Mothercare/316-1739903400-mc_webbanner_diaper50off_1920x650_final2x-100.jpg"
              className="d-block w-100"
              alt="Diaper 50% Off"
            />
          </div>
        </div>

        
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>


<div className="flex justify-center flex-wrap gap-12 p-10 bg-white">
  {categories.map((category, index) => (
    <div
      key={index}
      className="relative w-60 h-80 cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={() => navigate(category.path)}
    >
      <div className="w-full h-full overflow-hidden rounded-t-full relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
        {category.name}
      </div>
    </div>
  ))}
</div>
<div className="home-container flex justify-center items-center">
  <img 
    src="https://img.freepik.com/premium-psd/baby-fashion-cloth-wear-sale-banner-post-promotional-web-banner-psd-file_673898-771.jpg?w=1380"
    alt="Baby Products Banner"
    className="home-banner w-full h-[420px] object-cover object-center scale-100"
  />
</div>

 
      <Footer />
    </div>
  );
};

export default Home;

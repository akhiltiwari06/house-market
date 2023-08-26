import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";
import { getAuth } from "firebase/auth";
import { useNavigate, Link, useParams } from "react-router-dom";
import "../styles/listing.css";
// import SwipeCore, { EffectCoverflow, Navigation, Pagination } from "swiper";

// import SwipeCore, { EffectCoverflow, Pagination } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";


// New import statements
// import { Swiper, SwiperSlide } from "swiper/react";
// import SwiperCore, { EffectCoverflow, Pagination } from "swiper/core";
// import "swiper/swiper.scss"; // Import the main SCSS file instead of individual CSS files

import {
  FaBed,
  FaBath,
  FaParking,
  FaHouseDamage,
  FaArrowCircleRight,
} from "react-icons/fa";
import Spinner from "../components/Spinner";

// //config
// SwipeCore.use([EffectCoverflow, Pagination]);

//config
// SwiperCore.use([EffectCoverflow, Pagination]);

const Listing = () => {
  const [listing, setListing] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); //eslint-disable-line
  const params = useParams();
  const auth = getAuth(); //eslint-disable-line

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-4">
        <div className="card" style={{ width: "600px" }}>
          {/* <div className="card-header">
            {listing?.imgUrls === undefined ? (
              <Spinner />
            ) : (
              <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                coverflowEffect={{
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }}
                // Pagination={true}
                pagination={{ clickable: true }}
                className="mySwipe"
                wrapperClass="mySwipe"
                
              >
                {listing.imgUrls.map((url, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={listing.imgUrls[index]}
                      height={400}
                      width={800}
                      alt={listing.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div> */}
          <div className="col-md-4 listing-container-col2">
            <h3>{listing.name}</h3>
            <h6>
              Price :{" "}
              {listing.offer ? listing.discountedPrice : listing.regularPrice} /
              RS
            </h6>
            <p>Property For : {listing.type === "rent" ? "Rent" : "Sale"}</p>
            <p>
              {listing.offer && (
                <span>
                  {listing.regularPrice - listing.discountedPrice} Discount
                </span>
              )}
            </p>
            <p>
              <FaBed size={20} /> &nbsp;
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <p>
              <FaBath size={20} /> &nbsp;
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : "1 Bathroom"}
            </p>
            <p>
              <FaParking size={20} /> &nbsp;
              {listing.parking ? `Parking spot` : "no spot for parking"}
            </p>
            <p>
              <FaHouseDamage size={20} /> &nbsp;
              {listing.furnished ? `furnished house` : "not furnished"}
            </p>
            <Link
              className="button btn btn-success"
              to={`/contact/${listing.useRef}?listingName=${listing.name}`  }
            >
              Contact Landlord <FaArrowCircleRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Listing;

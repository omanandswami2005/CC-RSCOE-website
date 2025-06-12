import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Teams = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/items") // Your backend URL
      .then((res) =>
        setTestimonials(
          res.data.map((item) => ({
            id: item._id,
            title: item.title,
            text: item.text, // if your backend uses 'description'
            image: item.image || "", // depending on your schema
          }))
        )
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center bg-[#040015] items-center h-[40vh] m-auto mt-40 mb-60 w-[80%] p-6">
        <div
          className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-14"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          {"Our Teams"}
        </div>
        <div className="w-full flex justify-center bg-[#141327] items-center h-[80vh] max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            className="relative"
          >
            {testimonials.map((item) => (
              <SwiperSlide
                key={item.id}
                className="text-white p-6 rounded-lg shadow-lg w-[100%]"
              >
                <div className="flex flex-col  w-[50] p-6 justify-center items-center">
                  <div className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
                    {item.title}
                  </div>
                  <div className="flex max-lg:flex-col text-center items-center gap-4 justify-center md:w-[70%]">
                    <p className="text-gray-300 mt-2">{item.text}</p>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="mt-4 w-[30vw] h-[20vh] object-cover rounded-md"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Teams;

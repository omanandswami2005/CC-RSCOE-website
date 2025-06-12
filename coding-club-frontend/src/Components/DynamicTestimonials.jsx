import React, { useEffect, useState } from "react";
import { getTestimonials } from "../api/contentApi";
import { showErrorToast } from "../../utils/toastUtils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DynamicTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await getTestimonials({ active: true });
        setTestimonials(response.testimonials || []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        showErrorToast("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < rating ? 'text-yellow-400' : 'text-gray-600'
        }`}
      >
        ★
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center bg-[#040015] items-center h-[40vh] m-auto mt-40 mb-60 w-[80%] p-6">
        <div
          className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-14"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Loading Testimonials...
        </div>
        <div className="w-full flex justify-center bg-[#141327] items-center h-[80vh] max-w-4xl mx-auto animate-pulse">
          <div className="text-white p-6 rounded-lg shadow-lg w-full">
            <div className="flex flex-col w-full p-6 justify-center items-center">
              <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
              <div className="flex max-lg:flex-col text-center items-center gap-4 justify-center md:w-[70%]">
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-800 rounded"></div>
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                </div>
                <div className="w-[30vw] h-[20vh] bg-gray-700 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="flex flex-col justify-center bg-[#040015] items-center h-[40vh] m-auto mt-40 mb-60 w-[80%] p-6">
        <div
          className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-14"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          What People Say
        </div>
        <div className="text-center text-gray-400">
          <p>No testimonials available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col justify-center bg-[#040015] items-center h-[40vh] m-auto mt-40 mb-60 w-[80%] p-6">
        <div
          className="text-4xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-14"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          What People Say
        </div>
        <div className="w-full flex justify-center bg-[#141327] items-center h-[80vh] max-w-4xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            className="relative"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide
                key={testimonial._id}
                className="text-white p-6 rounded-lg shadow-lg w-full"
              >
                <div className="flex flex-col w-full p-6 justify-center items-center">
                  <div className="text-3xl font-bold inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-4">
                    {testimonial.name}
                  </div>
                  <div className="text-purple-300 text-lg mb-4">
                    {testimonial.role}
                  </div>
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  <div className="flex max-lg:flex-col text-center items-center gap-4 justify-center md:w-[70%]">
                    <p className="text-gray-300 mt-2 flex-1 text-lg leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    {testimonial.image && (
                      <img
                        src={testimonial.image.url}
                        alt={testimonial.name}
                        className="mt-4 w-[30vw] h-[20vh] object-cover rounded-md shadow-lg"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
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

export default DynamicTestimonials;
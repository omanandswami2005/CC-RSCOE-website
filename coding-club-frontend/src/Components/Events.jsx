import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

const EventCard = ({ event }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  console.log(event);

  return (
    <div className="max-w-md rounded-lg shadow-lg p-4">
      <Slider {...settings}>
        {event.Imgsrc.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`${event.title} ${index + 1}`}
              className="w-full h-56 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
      <div className="mt-4 text-center">
        <h2 className="text-xl text-white font-bold">{event.title}</h2>
        <p className="text-gray-300">{event.date}</p>
        <p className="mt-2 text-gray-300">{event.description}</p>
      </div>
    </div>
  );
};
EventCard.propTypes = {
  event: PropTypes.shape({
    Imgsrc: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;

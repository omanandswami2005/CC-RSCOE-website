import PropTypes from "prop-types";

const EventCard = ({ title, date, description, imgSrc }) => {
  return (
    <div className="bg-[#130229] bg-opacity-50 p-4 rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer">
      <img
        src={imgSrc || "../Images/default.jpg"}
        alt={title}
        className="w-full h-40 object-cover rounded-lg"
        onError={(e) => {
          e.target.src = "../Images/default.png";
        }}
      />

      <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-300">{date}</p>
      <p className="text-sm text-gray-200 mt-1">{description}</p>
    </div>
  );
};

EventCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default EventCard;

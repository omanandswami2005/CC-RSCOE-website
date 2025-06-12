import PropTypes from 'prop-types'; // Import PropTypes

const ProgressBar = ({ percentage = 50 }) => {
  const radius = 45; // Radius of the circle
  const stroke = 5; // Stroke width
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * Math.PI; // Half-circle circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width="250" height="150" viewBox="0 0 120 60">
      {/* Background Half-Circle */}
      <path
        d="M 10,50 A 40,40 0 0,1 110,50"
        fill="transparent"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth={stroke}
      />
      {/* Progress Half-Circle with Glow */}
      <path
        d="M 10,50 A 40,40 0 0,1 110,50"
        fill="transparent"
        stroke="url(#glowGradient)"
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.5s ease-in-out',
        }}
      />
      {/* Gradient for Glowing Effect */}
      <defs>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6f00ff" />
        </linearGradient>
      </defs>
      {/* Percentage Text */}
      <text
        x="60"
        y="40"
        textAnchor="middle"
        dy="0.3em"
        fontSize="18"
        fill="#c084fc"
        fontWeight="bold"
      >
        {percentage}
      </text>
    </svg>
  );
};

// Define PropTypes
ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired, // Ensure 'percentage' is a required number
};

export default ProgressBar;

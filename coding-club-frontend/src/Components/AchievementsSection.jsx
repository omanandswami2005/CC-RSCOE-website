import React, { useState, useEffect } from "react";
import { getAchievements } from "../api/contentApi";
import { showErrorToast } from "../../utils/toastUtils";
import PropTypes from "prop-types";

const AchievementCard = ({ achievement }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'competition': return 'bg-yellow-600';
      case 'project': return 'bg-blue-600';
      case 'recognition': return 'bg-green-600';
      case 'milestone': return 'bg-purple-600';
      default: return 'bg-gray-600';
    }
  };

  const nextImage = () => {
    if (achievement.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === achievement.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (achievement.images.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? achievement.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className={`glassmorphism rounded-xl p-6 shadow-lg hover:scale-105 transition-all duration-300 ${
      achievement.isHighlighted ? 'ring-2 ring-yellow-400' : ''
    }`}>
      {achievement.isHighlighted && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
          ⭐ Featured
        </div>
      )}
      
      {achievement.images && achievement.images.length > 0 && (
        <div className="relative mb-4 rounded-lg overflow-hidden">
          <img
            src={achievement.images[currentImageIndex].url}
            alt={achievement.title}
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.target.src = "/api/placeholder/400/192";
            }}
          />
          
          {achievement.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-all"
              >
                →
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {achievement.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs text-white ${getCategoryColor(achievement.category)}`}>
            {achievement.category}
          </span>
        </div>
        
        <p className="text-purple-300 text-sm">{formatDate(achievement.date)}</p>
        <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
        
        {achievement.participants && achievement.participants.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-purple-200 mb-2">Participants:</h4>
            <div className="flex flex-wrap gap-2">
              {achievement.participants.map((participant, index) => (
                <div key={index} className="bg-gray-800 rounded-full px-3 py-1 text-xs">
                  <span className="text-white font-medium">{participant.name}</span>
                  <span className="text-gray-400 ml-1">({participant.role})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AchievementCard.propTypes = {
  achievement: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    isHighlighted: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      caption: PropTypes.string
    })),
    participants: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired
    }))
  }).isRequired,
};

const AchievementsSection = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const params = { limit: 12 };
        if (filter !== 'all') {
          if (filter === 'highlighted') {
            params.highlighted = 'true';
          } else {
            params.category = filter;
          }
        }
        
        const response = await getAchievements(params);
        setAchievements(response.achievements || []);
      } catch (error) {
        console.error("Error fetching achievements:", error);
        showErrorToast("Failed to load achievements");
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, [filter]);

  const filterOptions = [
    { value: 'all', label: 'All Achievements' },
    { value: 'highlighted', label: 'Featured' },
    { value: 'competition', label: 'Competitions' },
    { value: 'project', label: 'Projects' },
    { value: 'recognition', label: 'Recognition' },
    { value: 'milestone', label: 'Milestones' }
  ];

  if (loading) {
    return (
      <div className="bg-[#040313] py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-12" style={{ fontFamily: "Sora, sans-serif" }}>
            Loading Achievements...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glassmorphism rounded-xl p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#040313] py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-12" style={{ fontFamily: "Sora, sans-serif" }}>
          Our Achievements
        </h2>
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === option.value
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {achievements.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            <p className="text-xl">No achievements found for the selected filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement) => (
              <AchievementCard key={achievement._id} achievement={achievement} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;
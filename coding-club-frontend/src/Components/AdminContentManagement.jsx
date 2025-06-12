import React, { useState, useEffect } from "react";
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent,
  getFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement
} from "../api/contentApi";
import { showSuccessToast, showErrorToast } from "../../utils/toastUtils";

const AdminContentManagement = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [events, setEvents] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form states
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    description: '',
    content: '',
    category: 'workshop',
    location: '',
    registrationLink: '',
    maxParticipants: '',
    tags: '',
    images: null
  });

  const [faqForm, setFaqForm] = useState({
    question: '',
    answer: '',
    category: 'general',
    order: 0
  });

  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    order: 0,
    image: null
  });

  const [achievementForm, setAchievementForm] = useState({
    title: '',
    description: '',
    date: '',
    category: 'competition',
    participants: '',
    isHighlighted: false,
    images: null
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case 'events':
          const eventsRes = await getEvents({ limit: 50 });
          setEvents(eventsRes.events || []);
          break;
        case 'faqs':
          const faqsRes = await getFAQs({ active: 'all' });
          setFaqs(faqsRes.faqs || []);
          break;
        case 'testimonials':
          const testimonialsRes = await getTestimonials({ active: 'all' });
          setTestimonials(testimonialsRes.testimonials || []);
          break;
        case 'achievements':
          const achievementsRes = await getAchievements({ limit: 50 });
          setAchievements(achievementsRes.achievements || []);
          break;
      }
    } catch (error) {
      showErrorToast(`Failed to fetch ${activeTab}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      const formData = new FormData();

      switch (activeTab) {
        case 'events':
          Object.keys(eventForm).forEach(key => {
            if (key === 'images' && eventForm[key]) {
              Array.from(eventForm[key]).forEach(file => {
                formData.append('images', file);
              });
            } else if (eventForm[key]) {
              formData.append(key, eventForm[key]);
            }
          });

          if (editingItem) {
            response = await updateEvent(editingItem._id, formData);
          } else {
            response = await createEvent(formData);
          }
          break;

        case 'faqs':
          if (editingItem) {
            response = await updateFAQ(editingItem._id, faqForm);
          } else {
            response = await createFAQ(faqForm);
          }
          break;

        case 'testimonials':
          Object.keys(testimonialForm).forEach(key => {
            if (key === 'image' && testimonialForm[key]) {
              formData.append('image', testimonialForm[key]);
            } else if (testimonialForm[key]) {
              formData.append(key, testimonialForm[key]);
            }
          });

          if (editingItem) {
            response = await updateTestimonial(editingItem._id, formData);
          } else {
            response = await createTestimonial(formData);
          }
          break;

        case 'achievements':
          Object.keys(achievementForm).forEach(key => {
            if (key === 'images' && achievementForm[key]) {
              Array.from(achievementForm[key]).forEach(file => {
                formData.append('images', file);
              });
            } else if (achievementForm[key]) {
              formData.append(key, achievementForm[key]);
            }
          });

          if (editingItem) {
            response = await updateAchievement(editingItem._id, formData);
          } else {
            response = await createAchievement(formData);
          }
          break;
      }

      showSuccessToast(`${activeTab.slice(0, -1)} ${editingItem ? 'updated' : 'created'} successfully!`);
      resetForm();
      setShowModal(false);
      setEditingItem(null);
      fetchData();
    } catch (error) {
      showErrorToast(`Failed to ${editingItem ? 'update' : 'create'} ${activeTab.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    setLoading(true);
    try {
      switch (activeTab) {
        case 'events':
          await deleteEvent(id);
          break;
        case 'faqs':
          await deleteFAQ(id);
          break;
        case 'testimonials':
          await deleteTestimonial(id);
          break;
        case 'achievements':
          await deleteAchievement(id);
          break;
      }

      showSuccessToast(`${activeTab.slice(0, -1)} deleted successfully!`);
      fetchData();
    } catch (error) {
      showErrorToast(`Failed to delete ${activeTab.slice(0, -1)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    
    switch (activeTab) {
      case 'events':
        setEventForm({
          title: item.title || '',
          date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
          description: item.description || '',
          content: item.content || '',
          category: item.category || 'workshop',
          location: item.location || '',
          registrationLink: item.registrationLink || '',
          maxParticipants: item.maxParticipants || '',
          tags: item.tags ? item.tags.join(', ') : '',
          images: null
        });
        break;
      case 'faqs':
        setFaqForm({
          question: item.question || '',
          answer: item.answer || '',
          category: item.category || 'general',
          order: item.order || 0
        });
        break;
      case 'testimonials':
        setTestimonialForm({
          name: item.name || '',
          role: item.role || '',
          content: item.content || '',
          rating: item.rating || 5,
          order: item.order || 0,
          image: null
        });
        break;
      case 'achievements':
        setAchievementForm({
          title: item.title || '',
          description: item.description || '',
          date: item.date ? new Date(item.date).toISOString().split('T')[0] : '',
          category: item.category || 'competition',
          participants: item.participants ? JSON.stringify(item.participants) : '',
          isHighlighted: item.isHighlighted || false,
          images: null
        });
        break;
    }
    
    setShowModal(true);
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      date: '',
      description: '',
      content: '',
      category: 'workshop',
      location: '',
      registrationLink: '',
      maxParticipants: '',
      tags: '',
      images: null
    });
    setFaqForm({
      question: '',
      answer: '',
      category: 'general',
      order: 0
    });
    setTestimonialForm({
      name: '',
      role: '',
      content: '',
      rating: 5,
      order: 0,
      image: null
    });
    setAchievementForm({
      title: '',
      description: '',
      date: '',
      category: 'competition',
      participants: '',
      isHighlighted: false,
      images: null
    });
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'events':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={eventForm.title}
              onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="date"
              value={eventForm.date}
              onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={eventForm.description}
              onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-24"
              required
            />
            <textarea
              placeholder="Content (optional)"
              value={eventForm.content}
              onChange={(e) => setEventForm({...eventForm, content: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-32"
            />
            <select
              value={eventForm.category}
              onChange={(e) => setEventForm({...eventForm, category: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            >
              <option value="workshop">Workshop</option>
              <option value="hackathon">Hackathon</option>
              <option value="seminar">Seminar</option>
              <option value="competition">Competition</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Location (optional)"
              value={eventForm.location}
              onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="url"
              placeholder="Registration Link (optional)"
              value={eventForm.registrationLink}
              onChange={(e) => setEventForm({...eventForm, registrationLink: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="number"
              placeholder="Max Participants (optional)"
              value={eventForm.maxParticipants}
              onChange={(e) => setEventForm({...eventForm, maxParticipants: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={eventForm.tags}
              onChange={(e) => setEventForm({...eventForm, tags: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setEventForm({...eventForm, images: e.target.files})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingItem ? 'Update Event' : 'Create Event')}
            </button>
          </form>
        );

      case 'faqs':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={faqForm.question}
              onChange={(e) => setFaqForm({...faqForm, question: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <textarea
              placeholder="Answer"
              value={faqForm.answer}
              onChange={(e) => setFaqForm({...faqForm, answer: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-32"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={faqForm.category}
              onChange={(e) => setFaqForm({...faqForm, category: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="number"
              placeholder="Order"
              value={faqForm.order}
              onChange={(e) => setFaqForm({...faqForm, order: parseInt(e.target.value)})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingItem ? 'Update FAQ' : 'Create FAQ')}
            </button>
          </form>
        );

      case 'testimonials':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={testimonialForm.name}
              onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <input
              type="text"
              placeholder="Role"
              value={testimonialForm.role}
              onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <textarea
              placeholder="Testimonial Content"
              value={testimonialForm.content}
              onChange={(e) => setTestimonialForm({...testimonialForm, content: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-32"
              required
            />
            <select
              value={testimonialForm.rating}
              onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseInt(e.target.value)})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            >
              <option value={5}>5 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={2}>2 Stars</option>
              <option value={1}>1 Star</option>
            </select>
            <input
              type="number"
              placeholder="Order"
              value={testimonialForm.order}
              onChange={(e) => setTestimonialForm({...testimonialForm, order: parseInt(e.target.value)})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setTestimonialForm({...testimonialForm, image: e.target.files[0]})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingItem ? 'Update Testimonial' : 'Create Testimonial')}
            </button>
          </form>
        );

      case 'achievements':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Achievement Title"
              value={achievementForm.title}
              onChange={(e) => setAchievementForm({...achievementForm, title: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={achievementForm.description}
              onChange={(e) => setAchievementForm({...achievementForm, description: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-24"
              required
            />
            <input
              type="date"
              value={achievementForm.date}
              onChange={(e) => setAchievementForm({...achievementForm, date: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
              required
            />
            <select
              value={achievementForm.category}
              onChange={(e) => setAchievementForm({...achievementForm, category: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            >
              <option value="competition">Competition</option>
              <option value="project">Project</option>
              <option value="recognition">Recognition</option>
              <option value="milestone">Milestone</option>
            </select>
            <textarea
              placeholder="Participants (JSON format: [{'name': 'John', 'role': 'Developer'}])"
              value={achievementForm.participants}
              onChange={(e) => setAchievementForm({...achievementForm, participants: e.target.value})}
              className="w-full p-3 bg-gray-800 text-white rounded h-24"
            />
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={achievementForm.isHighlighted}
                onChange={(e) => setAchievementForm({...achievementForm, isHighlighted: e.target.checked})}
                className="mr-2"
              />
              Highlight this achievement
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => setAchievementForm({...achievementForm, images: e.target.files})}
              className="w-full p-3 bg-gray-800 text-white rounded"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingItem ? 'Update Achievement' : 'Create Achievement')}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  const renderList = () => {
    let items = [];
    switch (activeTab) {
      case 'events':
        items = events;
        break;
      case 'faqs':
        items = faqs;
        break;
      case 'testimonials':
        items = testimonials;
        break;
      case 'achievements':
        items = achievements;
        break;
    }

    return (
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item._id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-white font-semibold">
                {item.title || item.question || item.name}
              </h3>
              <p className="text-gray-300 text-sm mt-1">
                {item.description || item.answer || item.content || item.role}
              </p>
              {item.date && (
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              )}
            </div>
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#040313] text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
          Content Management
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 space-x-2">
          {['events', 'faqs', 'testimonials', 'achievements'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="text-center mb-8">
          <button
            onClick={() => {
              resetForm();
              setEditingItem(null);
              setShowModal(true);
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Content List */}
        {loading ? (
          <div className="text-center py-20">
            <p>Loading...</p>
          </div>
        ) : (
          renderList()
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab.slice(0, -1)}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              {renderForm()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContentManagement;
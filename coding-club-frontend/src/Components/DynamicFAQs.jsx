import { useState, useEffect, useRef } from "react";
import { getFAQs } from "../api/contentApi";
import { showErrorToast } from "../../utils/toastUtils";

export default function DynamicFAQAccordion() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRefs = useRef([]);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await getFAQs({ active: true });
        setFaqs(response.faqs || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        showErrorToast("Failed to load FAQs");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  useEffect(() => {
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.setProperty("--max-height", ref.scrollHeight + "px");
      }
    });
  }, [openIndex, faqs]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (loading) {
    return (
      <div className="mt-[200px] max-w-6xl mx-auto p-6" style={{ fontFamily: "Sora, sans-serif" }}>
        <h2 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-8">
          Loading FAQs...
        </h2>
        <div className="space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border border-gray-700 rounded-md p-4 animate-pulse">
              <div className="h-6 bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-800 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (faqs.length === 0) {
    return (
      <div className="mt-[200px] max-w-6xl mx-auto p-6" style={{ fontFamily: "Sora, sans-serif" }}>
        <h2 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="text-center text-gray-400">
          <p>No FAQs available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[200px] max-w-6xl mx-auto p-6" style={{ fontFamily: "Sora, sans-serif" }}>
      <h2 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-8">
        Maybe We Have An Answer
      </h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={faq._id} className="border border-gray-700 rounded-md overflow-hidden">
            <button
              className="w-full text-left flex justify-between items-center p-4 text-white hover:bg-gray-800 transition-colors duration-300"
              onClick={() => toggleFAQ(index)}
            >
              <span className="font-bold opacity-80">{faq.question}</span>
              <span
                className={`text-xl transition-transform duration-300 ease-in-out ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="overflow-hidden bg-gray-900 border-t border-gray-700 transition-all duration-300 ease-in-out"
              style={{
                maxHeight: openIndex === index ? "var(--max-height)" : "0px",
                opacity: openIndex === index ? 1 : 0,
              }}
            >
              <div className="p-4 text-gray-300">{faq.answer}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";

const faqs = [
  {
    question: "Why should I choose Coding Club RSCOE?",
    answer:
      "The Coding Club is a vibrant community of tech enthusiasts passionate about software development, design, and emerging technologies which will help you throughout your college journey.",
  },
  {
    question: "Can a student of any branch join Coding Club RSCOE?",
    answer: "We only accept students from Computer Engineering, Compuuter and Business Systems and Information Technology.",
  },
  {
    question: "What is the special 'Discord Benefit'?",
    answer: "By joining any of the paid tiers, you get access to our special Discord Server, with curated channels and guidance from experienced seniors.",
  },
  {
    question: "Where can you contact us?",
    answer: "You can contact us at our official mail or DM us on our official instagram handle",
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);

  useEffect(() => {
    // Dynamically set --max-height based on content height
    // eslint-disable-next-line no-unused-vars
    contentRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.style.setProperty("--max-height", ref.scrollHeight + "px");
      }
    });
  }, [openIndex]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-[200px] max-w-6xl mx-auto p-6" style={{ fontFamily: "Sora, sans-serif" }}>
      <h2 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500 mb-8">Maybe We Have An Answer</h2>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-700 rounded-md overflow-hidden">
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

import { useState } from "react";

const DSAQuestionCard = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "Two Sum" },
    { id: 2, text: "Reverse Linked List" },
    { id: 3, text: "Binary Tree Inorder Traversal" },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([
        ...questions,
        { id: questions.length + 1, text: newQuestion },
      ]);
      setNewQuestion("");
    }
  };

  const removeQuestion = (id) => {
    setQuestions(questions.filter((question) => question.id !== id));
  };

  return (
    <div className="bottom-0 mx-4 md:mx-8 lg:mx-40 outline-8 rounded-xl bg-[#7073916f] py-2 px-4 border-t border-gray-300 shadow-lg">
      <div className="max-w-full md:max-w-3xl lg:max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
          DSA Questions
        </h2>

        {/* Add Question Input */}
        <div className="flex flex-col md:flex-row mb-4">
          <input
            type="text"
            className="flex-1 px-4 py-2 border text-gray-300 border-gray-300 rounded-md mb-2 md:mb-0 md:mr-2"
            placeholder="Add new question..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button
            className="bg-cyan-900 text-white px-4 py-2 rounded-md hover:bg-green-700"
            onClick={addQuestion}
          >
            Add Question
          </button>
        </div>

        {/* Dropdown to show/hide the questions */}
        <button
          className="w-full bg-violet-500 text-white px-4 py-2 rounded-md mb-2"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {dropdownOpen ? "Hide Questions" : "Show Questions"}
        </button>

        {/* Questions List */}
        {dropdownOpen && (
          <div>
            {questions.map((question) => (
              <div
                key={question.id}
                className="flex justify-between items-center text-cyan-100 py-2 border-b border-gray-300"
              >
                <span>{question.text}</span>
                <button
                  className="bg-cyan-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                  onClick={() => removeQuestion(question.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DSAQuestionCard;

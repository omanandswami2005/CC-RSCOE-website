import React from "react";


const AdminDashboard = () => {
  return (
    <div className="px-2 min-h-screen bg-[#040313]">
      {/* Header */}
      <header className="bg-[#070620] text-white py-4">
        <h1 className="text-center text-3xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row justify-center mb-4 gap-4">
          {/* Box 1 */}
          <div className="shadow-md rounded-lg p-6 w-full md:w-1/3 h-60 bg-[#141327]">
            <h2 className="text-xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
              Team Management
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src="teammanage.jpeg"
                alt="Team Management"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-white px-4 py-2 rounded bg-gradient-to-r from-purple-700 to-indigo-900 shadow-md transition duration-300 ease-in-out hover:bg-purple-700 focus:ring-2 focus:ring-purple-600"
                onClick={() => (window.location.href = "/admin/teams")}
              >
                Manage
              </button>
            </div>
          </div>

          {/* Box 2 */}
          <div className="shadow-md rounded-lg p-6 w-full md:w-1/3 h-60 bg-[#141327]">
            <h2 className="text-xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
              Member Management
            </h2>
            <div className="flex justify-center mb-4">
              <img
                src="download.jpeg"
                alt="Member Management"
                className="w-24 h-24 rounded-full"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-white px-4 py-2 rounded bg-gradient-to-r from-purple-700 to-indigo-900 shadow-md transition duration-300 ease-in-out hover:bg-purple-700 focus:ring-2 focus:ring-purple-600"
                onClick={() => (window.location.href = "/admin/members")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-center mb-6">
          <div className="shadow-md rounded-lg p-6 w-full md:w-1/3 h-55 bg-[#191832]">
            <h2 className="text-xl text-center font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-500">
              Event Management
            </h2>
            <div className="flex justify-center mb-3">
              <img
                src="event.jpeg"
                alt="Event Management"
                className="w-20 h-20 rounded-full"
              />
            </div>
            <div className="flex justify-center">
              <button
                className="text-white px-4 py-2 rounded bg-gradient-to-r from-purple-700 to-indigo-900 shadow-md transition duration-300 ease-in-out hover:bg-purple-700 focus:ring-2 focus:ring-purple-600"
                onClick={() => (window.location.href = "/admin/events")}
              >
                Manage
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

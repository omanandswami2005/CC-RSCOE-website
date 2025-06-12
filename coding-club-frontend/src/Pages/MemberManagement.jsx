import { useState } from "react";

const MemberManagement = () => {
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", team: "Engineering", role: "Admin" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", team: "Marketing", role: "Member" },
    { id: 3, name: "Charlie Brown", email: "charlie@example.com", team: "Sales", role: "Guest" },
  ]);
  const [newMember, setNewMember] = useState({ name: "", email: "", team: "", role: "" });
  const [editMember, setEditMember] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) &&
      (teamFilter ? user.team === teamFilter : true) &&
      (roleFilter ? user.role === roleFilter : true)
  );

  const handleAddMember = () => {
    // Only add if all fields are filled.
    if (!newMember.name || !newMember.email || !newMember.team || !newMember.role) return;
    setUsers([...users, { id: Date.now(), ...newMember }]);
    setNewMember({ name: "", email: "", team: "", role: "" });
    setShowAddModal(false);
  };

  const handleEditMember = (id) => {
    const member = users.find((user) => user.id === id);
    setEditMember(member);
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editMember.id ? editMember : user)));
    setEditMember(null);
    setShowEditModal(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-white text-2xl font-bold mb-4">Members Management</h1>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-[#141327] text-white w-full md:w-1/3 p-2 border rounded"
        />

        <select
          onChange={(e) => setTeamFilter(e.target.value)}
          className="bg-[#141327] text-white w-full md:w-1/4 p-2 border rounded "
        >
          <option value="">All Teams</option>
          <option value="Engineering">Engineering</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
        </select>

        <select
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-[#141327] text-white w-full md:w-1/4 p-2 border rounded"
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="Member">Member</option>
          <option value="Guest">Guest</option>
        </select>

        <button onClick={() => setShowAddModal(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Member
        </button>
      </div>

      {showEditModal && editMember && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#040313] text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Edit Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={editMember.name}
              onChange={(e) => setEditMember({ ...editMember, name: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={editMember.email}
              onChange={(e) => setEditMember({ ...editMember, email: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Team"
              value={editMember.team}
              onChange={(e) => setEditMember({ ...editMember, team: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Role"
              value={editMember.role}
              onChange={(e) => setEditMember({ ...editMember, role: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleSaveEdit} className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setShowEditModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-[#040313] text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Add New Member</h2>
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="email"
              placeholder="Email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Team"
              value={newMember.team}
              onChange={(e) => setNewMember({ ...newMember, team: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })} 
              className="bg-[#141327] text-white p-2 border rounded mb-2 w-full"
            />
            <div className="flex justify-end gap-2">
              <button onClick={handleAddMember} className="bg-blue-600 text-white px-4 py-2 rounded">
                Add
              </button>
              <button onClick={() => setShowAddModal(false)} className="bg-gray-600 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#141327] text-white p-4 rounded-lg shadow-md">
        <table className="w-full border-collapse border border-gray-700">
          <thead>
            <tr className="bg-gray-800">
              <th className="border border-gray-700 px-4 py-2">Name</th>
              <th className="border border-gray-700 px-4 py-2">Email</th>
              <th className="border border-gray-700 px-4 py-2">Team</th>
              <th className="border border-gray-700 px-4 py-2">Role</th>
              <th className="border border-gray-700 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="odd:bg-gray-900 even:bg-gray-800">
                <td className="border border-gray-700 px-4 py-2">{user.name}</td>
                <td className="border border-gray-700 px-4 py-2">{user.email}</td>
                <td className="border border-gray-700 px-4 py-2">{user.team}</td>
                <td className="border border-gray-700 px-4 py-2">{user.role}</td>
                <td className="border border-gray-700 px-4 py-2">
                  <button onClick={() => handleEditMember(user.id)} className="bg-blue-600 text-white font-semibold px-3 py-1 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemberManagement;

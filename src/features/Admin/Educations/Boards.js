import React, { useEffect, useState } from "react";
import Education from "../../../services/Education.api";

const Boards = () => {
  const [board, setBoard] = useState({
    name: "",
    code: null,
  });
  const [allBoards, setAllBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    setBoard((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setBoard({ name: "" });
    setError(null);
    setSuccessMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!board.name.trim()) {
        throw new Error("board name cannot be empty");
      }
      if (!board.code) {
        throw new Error("board code cannot be empty");
      }

      const res = await Education.addBoard(board);
      setSuccessMessage("board added successfully!");
      resetForm();
      getBoards(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add board");
    } finally {
      setLoading(false);
    }
  };

  const getBoards = async () => {
    setLoading(true);
    try {
      const res = await Education.getAllBoards();
      setAllBoards(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch boards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage States</h2>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="boardInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Board
            </label>
            <input
              id="boardInput"
              name="name"
              value={board?.name}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter Board name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            />
          </div>
          <div>
            <label
              htmlFor="codeInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Board
            </label>
            <input
              id="codeInput"
              name="code"
              value={board?.code}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter Code"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            />
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? "Adding..." : "Add State"}
          </button>
        </form>
      </div>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h3 className="text-xl font-bold mb-4">Board List</h3>
        {loading && <p>Loading...</p>}
        {allBoards.length === 0 && !loading ? (
          <p className="text-gray-600">No board added yet</p>
        ) : (
          <ul className="space-y-2">
            {allBoards.map((bord) => (
              <li
                key={bord._id}
                className="border-b py-2 px-4 hover:bg-gray-50"
              >
                {bord?.name}({bord?.code})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Boards;

import React, { useEffect, useState } from "react";
import Education from "../../../services/Education.api";

const LevelStreams = () => {
  const [levelStream, setLevelStream] = useState({
    name: "",
    qualificationId: null,
  });
  const [allQualifications, setAllQualifcatons] = useState([]);
  const [allLevelStreams, setAllLevelStreams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const onInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name + " " + value);
    setLevelStream((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setLevelStream({ name: "", qualificationId: null });
    setError(null);
    setSuccessMessage("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      if (!levelStream.name.trim()) {
        throw new Error("LevelStream name cannot be empty");
      }
      if (!levelStream.qualificationId) {
        throw new Error("Please select a qualificaton");
      }
      const res = await Education.addLevelStream(levelStream);
      setSuccessMessage("LevelStream added successfully!");
      resetForm();
      getLevelStreams(); // Refresh the list
    } catch (err) {
      setError(err.message || "Failed to add LevelStream");
    } finally {
      setLoading(false);
    }
  };
  const getQualificaton = async () => {
    setLoading(true);
    try {
      const res = await Education.getQualifications();
      setAllQualifcatons(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch Qualification");
    } finally {
      setLoading(false);
    }
  };
  const getLevelStreams = async () => {
    setLoading(true);
    try {
      const res = await Education.getLevelStreams();
      setAllLevelStreams(res?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch LevelStream");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQualificaton();
    getLevelStreams();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage States</h2>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              htmlFor="qualificationSelect"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Select Qualification
            </label>
            <select
              id="qualificationSelect"
              name="qualificationId"
              value={levelStream.qualificationId}
              onChange={onInputChange}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              <option value="">Select Qualificaton</option>
              {allQualifications.map((qual) => (
                <option key={qual._id} value={qual._id}>
                  {qual.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="stateInput"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Enter Level-Stream
            </label>
            <input
              id="levelStramInput"
              name="name"
              value={levelStream?.name}
              type="text"
              onChange={onInputChange}
              required
              placeholder="Enter Level-stream"
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
        <h3 className="text-xl font-bold mb-4">Level-Stream List</h3>
        {loading && <p>Loading...</p>}
        {allLevelStreams.length === 0 && !loading ? (
          <p className="text-gray-600">No Level-stream added yet</p>
        ) : (
          <ul className="space-y-2">
            {allLevelStreams.map((lstream) => (
              <li
                key={lstream._id}
                className="border-b py-2 px-4 hover:bg-gray-50"
              >
                {lstream?.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LevelStreams;

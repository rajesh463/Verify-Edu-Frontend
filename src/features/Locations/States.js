import React, { useState, useEffect } from "react";
import Service from "../../services/Services";
import "./States.css";

const States = () => {
  const [state, setState] = useState({
    name: "",
  });
  const [allStates, setAllStates] = useState([]);
  const [editingState, setEditingState] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await Service.updateState(editingState._id, { name: state.name });
        setIsEditing(false);
        setEditingState(null);
      } else {
        await Service.addState({ name: state.name });
      }
      setState({ name: "" });
      fetchStates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setState({ ...state, name: e.target.value });
  };

  const handleEdit = (stateItem) => {
    setIsEditing(true);
    setEditingState(stateItem);
    setState({ name: stateItem.name });
  };

  const handleDelete = async (id) => {
    try {
      await Service.deleteState(id);
      fetchStates();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingState(null);
    setState({ name: "" });
  };

  const fetchStates = async () => {
    try {
      const response = await Service.getStates();
      setAllStates(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  return (
    <div className="states-container">
      <div className="states-form-container">
        <h1>{isEditing ? "Edit State" : "Add State"}</h1>
        <form onSubmit={handleSubmit} className="states-form">
          <input
            type="text"
            placeholder="State Name"
            value={state.name}
            onChange={handleChange}
            className="state-input"
          />
          <div className="button-group">
            <button type="submit" className="submit-btn">
              {isEditing ? "Update State" : "Add State"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="states-list">
        <h2>States List</h2>
        <div className="table-container">
          <table className="states-table">
            <thead>
              <tr>
                <th>Sr. No.</th>
                <th>State Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allStates.map((stateItem, index) => (
                <tr key={stateItem._id}>
                  <td>{index + 1}</td>
                  <td>{stateItem.name}</td>
                  <td>
                    <div className="state-actions">
                      <button
                        onClick={() => handleEdit(stateItem)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stateItem._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default States;

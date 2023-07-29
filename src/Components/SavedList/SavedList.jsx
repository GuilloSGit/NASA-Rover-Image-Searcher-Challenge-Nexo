import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../../index.css";
import { Button } from "react-bootstrap";

function SavedList({ setListVisibility }) {
  const [searches, setSearches] = useState(
    JSON.parse(localStorage.getItem("savedSearches")) || []
  );

  const savedSearches = JSON.parse(localStorage.getItem("savedSearches"));

  const handleClose = () => {
    setListVisibility(false);
  };

  const handleDelete = (id) => {
    const updatedSearches = searches.filter((search) => search.id !== id);
    setSearches(updatedSearches);
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
  };

  const handleShare = () => {};

  return (
    <div className="list-container">
      <div className="table-section">
        <div className="table-header-section">
          <h2 className="table-title">Saved Search List</h2>
          <Button type="button btn" onClick={handleClose}>
            X
          </Button>
        </div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Rover</th>
              <th>Camera</th>
              <th>Earth Date</th>
              <th>Sol Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedSearches ? (
              savedSearches.map((search) => (
                <tr key={search.id}>
                  <td>{search.id != "" ? search.id : "-"}</td>
                  <td>{search.rover != "" ? search.rover : "-"}</td>
                  <td>{search.camera != "" ? search.camera : "-"}</td>
                  <td>{search.earthDate != "" ? search.earthDate : "-"}</td>
                  <td>{search.solDate != "" ? search.solDate : "-"}</td>
                  <td>
                    <Button
                      type="button"
                      variant="warning"
                      onClick={handleShare}
                    >
                      ✉️ Send
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => handleDelete(search.id)}
                    >
                      🗑️ Delete
                    </Button>{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>1</td>
                <td colSpan={4}>No data saved yet</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SavedList;

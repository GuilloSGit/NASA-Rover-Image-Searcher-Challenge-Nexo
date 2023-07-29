import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../../index.css";
import { Button } from "react-bootstrap";

const WWW = import.meta.env.VITE_WWWW

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
    localStorage.setItem("savedSearches", JSON.stringify(updatedSearches));
    setSearches(updatedSearches);
  };

  const handleShare = (id) => {
    const itemToShare = searches.filter((search) => search.id === id);
    const composedMessage = `I am delighted with what I have just seen on the Internet at ${WWW}.\t
    I found images${itemToShare[0].rover!=""?` of the rover ${(itemToShare[0].rover).toUpperCase()}`:''} ${itemToShare[0].camera!=""?` taken with the camera ${(itemToShare[0].camera).toUpperCase()}`:''}.\t
    Come check it out!`
    const textEncoded = window.encodeURI(composedMessage);
    window.open(`https://wa.me/?text=${textEncoded}`, '_blank');
  };

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
            {savedSearches && savedSearches!="[]" ? (
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
                      onClick={() => handleShare(search.id)}
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
                <td colSpan={5}>No data saved yet</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default SavedList;

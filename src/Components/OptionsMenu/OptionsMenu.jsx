import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../../index.css";

/* Archivos JSON con opciones */
import cameraOptions from "./OptionsJSON/cameraOptions.json";
import roverOptions from "./OptionsJSON/roverOptions.json";

function OptionsMenu({ onSearch }) {
  const [rover, setRover] = useState("curiosity");
  const [roverPhotosCamera, setRoverPhotosCamera] = useState("RHAZ");
  const [date, setDate] = useState("");
  const [solDate, setSolDate] = useState("");

  const handleReset = () => {
    setRover("curiosity");
    setRoverPhotosCamera("FHAZ");
    setDate("");
    setSolDate("");
  };

  const handleRoverChange = (e) => {
    const selectedRover = e.target.value;
    setRover(selectedRover);
  };

  const handleCameraChange = (e) => {
    const selectedCamera = e.target.value;
    setRoverPhotosCamera(selectedCamera);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  const handleSolDateChange = (e) => {
    const selectedSolDate = e.target.value;
    setSolDate(selectedSolDate);
  };

  const handleSearchClick = () => {
    const searchData = {
      rover: rover,
      camera: roverPhotosCamera,
      earthDate: date,
      solDate: solDate,
    };

    onSearch(searchData);
  };

  return (
    <div className="container options-main-container">
      <Form className="form-selection-form">
        <div className="rover-options options-container">
          {/* Rover selector */}
          <Form.Control as="select" value={rover} onChange={handleRoverChange}>
            {roverOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </div>

        <div className="camera-options options-container">
          {/* Camera selector */}
          <Form.Control
            as="select"
            value={roverPhotosCamera}
            onChange={handleCameraChange}
          >
            {cameraOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Control>
        </div>

        <div className="earthdate-options options-container">
          {/* Earth Date selector */}
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </div>

        <div className="soldate-options options-container">
          {/* Sol Date selector */}
          <Form.Control
            type="number"
            value={solDate}
            placeholder="e.g. 2890"
            onChange={handleSolDateChange}
          />
        </div>

        {/* Action buttons section */}
        <div className="form-buttons-section options-container">
          <Button type="button" onClick={handleSearchClick}>
            Search
          </Button>
          <Button type="button" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default OptionsMenu;

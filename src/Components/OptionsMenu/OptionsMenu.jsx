import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "../../index.css";

/* Archivos JSON con opciones */
import cameraOptions from "./OptionsJSON/cameraOptions.json";
import roverOptions from "./OptionsJSON/roverOptions.json";

function OptionsMenu({ onSearch }) {
  const [rover, setRover] = useState("curiosity");
  const [camera, setCamera] = useState("");
  const [date, setDate] = useState("");
  const [solDate, setSolDate] = useState("");
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    setDate(formattedDate);
  }, []);

  useEffect(() => {
    const savedSearchData = localStorage.getItem("searchData");
    if (savedSearchData) {
      const parsedSearchData = JSON.parse(savedSearchData);
      setSearchData(parsedSearchData);
    }
  }, []);

  const handleReset = () => {
    setRover("curiosity");
    setCamera("");
    setDate("");
    setSolDate("");
  };

  const handleRoverChange = (e) => {
    const selectedRover = e.target.value;
    setRover(selectedRover);
  };

  const handleCameraChange = (e) => {
    const selectedCamera = e.target.value;
    setCamera(selectedCamera);
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
      camera: camera,
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
          <Form.Label>Rover:</Form.Label>
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
          <Form.Label>Camera:</Form.Label>
          <Form.Control
            as="select"
            value={camera}
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
          <Form.Label>Earth: {date}</Form.Label>
          <Form.Control type="date" value={date} onChange={handleDateChange} />
        </div>

        <div className="soldate-options options-container">
          {/* Sol Date selector */}
          <Form.Label>Sol date: {solDate}</Form.Label>
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

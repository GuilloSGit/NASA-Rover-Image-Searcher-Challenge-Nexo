import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { buildQuery } from "./utils/scripts";
import { Button } from "react-bootstrap";

import OptionsMenu from "./Components/OptionsMenu/OptionsMenu";

function App() {
  const [response, setResponse] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchData, setSearchData] = useState("");

  const IMAGES_PER_PAGE = 25;

  useEffect(() => {
    const initialSearchData = {
      rover: "curiosity",
      camera: "FHAZ",
      earthDate: "",
      solDate: "",
    };

    fetchData(initialSearchData);
  }, []);

  const resetSearch = () => {
    setCurrentPage(1);
  };

  const handleSearch = (data) => {
    setSearchData(data);
    fetchData(data);
    resetSearch();
  };

  const fetchData = async (queryData) => {
    try {
      const { data } = await axios.get(buildQuery(queryData));
      setResponse(data.photos);
      setTotalPages(Math.ceil(data.photos.length / IMAGES_PER_PAGE));
      resetSearch();
    } catch (error) {
      setErrorMessage("Error fetching NASA API.");
      console.log("Error fetching NASA API: ", error);
    }
  };

  const getCurrentPagePhotos = () => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    return response.slice(startIndex, endIndex);
  };

  const isNextButtonDisabled = currentPage >= totalPages;
  const isPrevButtonDisabled = currentPage <= 1;

  return (
    <div>
      <div className="container">
        <header className="header-container">
          <img
            src={"https://api.nasa.gov/assets/img/favicons/favicon-192.png"}
            alt="NASA Open APIs logo"
            className="logo"
          />
          <h1 className="title">NASA - Images</h1>
        </header>
        <div className="search-section">
          <OptionsMenu onSearch={handleSearch} />
        </div>
        <div className="buttons">
          {errorMessage && <p className="error-msg"> {errorMessage} </p>}
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={isPrevButtonDisabled}
            className={isPrevButtonDisabled ? "disabled-button" : ""}
          >
            &#124;&#60;
          </Button>
          <p>
            {currentPage} / {totalPages}
          </p>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={isNextButtonDisabled}
            className={isNextButtonDisabled ? "disabled-button" : ""}
          >
            &#62;|
          </Button>
        </div>
        <div className="container">
          {response.length === 0 && (
            <div>No results with these parameters.</div>
          )}
          <ul>
            {getCurrentPagePhotos().map((photo) => (
              <li key={photo.id}>
                <img
                  src={photo.img_src}
                  alt={photo.camera.full_name}
                  className="image"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;

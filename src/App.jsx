import { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import { buildQuery } from "./utils/scripts";
import { Button, Dropdown } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";

import OptionsMenu from "./Components/OptionsMenu/OptionsMenu";
import SavedList from "./Components/SavedList/SavedList.jsx";

function App() {
  const [response, setResponse] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchData, setSearchData] = useState("");
  const [loading, setLoading] = useState(false);
  const [listVisibility, setListVisibility] = useState(false);
  const [nextId, setNextId] = useState(1);

  const isNextButtonDisabled = currentPage >= totalPages;
  const isPrevButtonDisabled = currentPage <= 1;
  const IMAGES_PER_PAGE = 25;

  useEffect(() => {
    const initialSearchData = {
      rover: "curiosity",
      camera: "",
      earthDate: "",
      solDate: "",
    };

    fetchData(initialSearchData);
  }, []);

  const handleSave = () => {
    const currentSearch = { ...searchData, id: nextId };
    const savedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    if (savedSearches === null) {
      localStorage.setItem("savedSearches", JSON.stringify([currentSearch]));
    } else {
      const newList = [...savedSearches, currentSearch];
      localStorage.setItem("savedSearches", JSON.stringify(newList));
    }
    setNextId((prevId) => prevId + 1);
  };

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
      setLoading(true);
      const { data } = await axios.get(buildQuery(queryData));
      setResponse(data.photos);
      setTotalPages(Math.ceil(data.photos.length / IMAGES_PER_PAGE));
      resetSearch();
    } catch (error) {
      setErrorMessage("Error fetching NASA API.");
      console.log("Error fetching NASA API: ", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const getCurrentPagePhotos = () => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    const endIndex = startIndex + IMAGES_PER_PAGE;
    return response.slice(startIndex, endIndex);
  };

  const toggleListView = () => {
    setListVisibility(true);
  };

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
          <div>{loading && <div className="spinner">Loading...</div>}</div>
          {response.length === 0 && (
            <div className="no-results-message-container">
              <p className="no-results-message">
                No results with these parameters.
              </p>
            </div>
          )}
          <ul>
            {getCurrentPagePhotos().map((photo) => (
              <li key={photo.id}>
                <LazyLoadImage
                  src={photo.img_src}
                  alt={photo.camera.full_name}
                  className="image"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="floating-button">
        <Dropdown>
          <Dropdown.Toggle variant="danger" id="dropdown-basic">
            Actions
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {searchData != "" && (
              <Dropdown.Item onClick={handleSave}>📝 Save search</Dropdown.Item>
            )}
            <Dropdown.Item onClick={toggleListView}>
              🔍 See saved list
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div>
        {listVisibility && <SavedList setListVisibility={setListVisibility} />}
      </div>
    </div>
  );
}

export default App;

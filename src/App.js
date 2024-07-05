import { useEffect, useState } from "react";
import "./App.css";
import SidePanel from "./components/SidePanel";
import Error from "./components/Error";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSide, setShowSide] = useState(false);
  const [error, setError] = useState(null);
  const [qoutes, setQoutes] = useState(() => {
    const savedQoutes = JSON.parse(localStorage.getItem("qoutelist"));
    return savedQoutes || [];
  });

  const addItem = (newItem) => {
    setQoutes([...qoutes, newItem]);
  };

  const fetchQuote = () => {
    fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };
  const sidePanelFunc = (e) => {
    e.stopPropagation();
    setShowSide((prev) => !prev);
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  useEffect(() => {
    localStorage.setItem("qoutelist", JSON.stringify(qoutes));
  }, [qoutes]);
  return (
    <>
    {error  && <Error error={error} />}
      {showSide && <SidePanel qoutes={qoutes} />}
      <div className="App" onClick={() => setShowSide(()=>false)}>
        <button
          className={loading ? "loading" : "btn"}
          onClick={(e) => sidePanelFunc(e)}
        >
          {showSide ? "Hide" : "Show"} saved
        </button>
        <div className="container">
          <h3>Quotes</h3>
          <div id="quote" className="quote">
            {data}
          </div>
          <button
            id="quoteBtn"
            className="btn"
            onClick={() => fetchQuote()}
          >
            Get quote
          </button>
          <button
            className="btn"
            onClick={() => addItem(data)}
          >
            Save to list
          </button>
        </div>
      </div>
    </>
  );
}

export default App;

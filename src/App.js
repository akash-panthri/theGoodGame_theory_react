import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSide, setShowSide] = useState(false);
  const [error, setError] = useState(null);
  const [qoutes, setQoutes] = useState(() => {
    const savedQoutes = JSON.parse(localStorage.getItem('qoutelist'));
    return savedQoutes || [];
  });

  const addItem = (newItem) => {
    setQoutes([...qoutes, newItem]);
  };

  const fetchQuote=()=>{
    fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(response => response.json())
    .then(data => {
      setData(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }
  useEffect(() => {
    fetchQuote()
  }, []);
  useEffect(() => {
    localStorage.setItem('qoutelist', JSON.stringify(qoutes));
  }, [qoutes]);
  return (
    <div className="App">
        <button  className={loading ? 'loading':'btn'} onClick={()=>setShowSide((prev)=> !prev)} >{showSide ?'Hide' : 'Show' } saved</button>
      <div className="container">
        <h3>Don't Laugh Challenge</h3>
        <div id="quote" className="quote">
{data}
        </div>
        <button id="quoteBtn" className={loading ? 'loading':'btn'} onClick={()=>fetchQuote()}>Getquote</button>
        <button  className={loading ? 'loading':'btn'} onClick={()=>addItem(data)} >Save to list</button>
        
    </div>
    </div>
  );
}

export default App;

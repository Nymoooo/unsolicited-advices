import React, { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(0);

  async function getAdvice() {
    try {
      const res = await fetch('https://api.adviceslip.com/advice');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setAdvice(data.slip.advice);
      setCount((c) => c + 1);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  }

  useEffect(() => {
    // Do not fetch advice initially when the component mounts
    // This will ensure the advice is fetched only after the button is clicked.
  }, []);

  return (
    <div>
      <h1>Click the button below for unsolicited advices. </h1>
      {advice !== '' && (
        <>
          <h2>{advice}</h2>
          <Message count={count} />
        </>
      )}
      <button onClick={getAdvice}>Click Me!</button>
      <Footer />
    </div>
  );
}

function Message(props) {
  return (
    <p>
      You have read <strong>{props.count}</strong> pieces of advice.
    </p>
  );
}

function Footer() {
  return (
    <footer>
      <p>Created by Ezekiel Narvasa.</p>
    </footer>
  );
}

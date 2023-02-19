import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(1);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count);

    if (!count || count <= 0) {
      const random = Math.floor(Math.random() * data.length);
      let randomText = data[random];
      setText([randomText]);
    }
    if (count > 9) {
      let tempText = data.slice(0, amount);
      let tempNum = amount - 9;
      for (let i = 0; i < tempNum; i++) {
        tempText.push(data[Math.floor(Math.random() * data.length)]);
      }
      setText(tempText);
    }
    if (count <= 9) {
      setText(data.slice(0, amount));
    }
  };
  return (
    <section className="section-center">
      <h3>lorem ipsum generator</h3>
      <form className="lorem-form" onSubmit={handleSubmit}>
        <label htmlFor="amount">Paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="1"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button type="submit" className="btn">
          generate
        </button>
      </form>
      <article className="lorem-text">
        {text.map((item, index) => {
          return <p key={index}>{item}</p>;
        })}
      </article>
    </section>
  );
}

export default App;

import React from "react";
import "./App.css";
import Carousel from "./Carousel";
import images from "./images";

function App() {
  return (
    <div>
      <Carousel images={images} autoPlay={false}>
        <div className="center">
          <h1>React.js Carousel</h1>
          <p>Test task for Scandiweb React Developer position</p>
        </div>
      </Carousel>
    </div>
  );
}

export default App;

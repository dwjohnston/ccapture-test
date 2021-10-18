import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

const randInt = () => {
  return Math.floor(Math.random() * 500);
};

function App() {

  const canvasRef = useRef<null | HTMLCanvasElement>(null);

  //@ts-ignore
  const capturerRef = useRef(new CCapture({
    format: "webm"
  }));

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context) {
      const draw = () => {

        context.strokeStyle = "red";
        context.strokeRect(randInt(), randInt(), randInt(), randInt())
        window.requestAnimationFrame(draw);

        capturerRef.current.capture(canvasRef.current);
      };

      window.requestAnimationFrame(draw);
    }


  }, []);

  return (
    <div className="App">


      <button onClick={() => {
        //@ts-ignore
        capturerRef.current.start();
      }}>start </button>

      <button onClick={() => {
        //@ts-ignore
        capturerRef.current.stop();
        capturerRef.current.save();

      }}> stop </button>

      <canvas ref={canvasRef} width="500" height="500"></canvas>

    </div>
  );
}

export default App;

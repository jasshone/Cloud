import { useState } from 'react'
import jasmine from './assets/jasmineshone.jpeg'
import './App.css'
import { Link } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  
  const [count, setCount] = useState(0)
  const [visitors, setVisitors] = useState(0)
  useEffect(()=>{
    const requestOptions = {
      method: "PUT",
      headers:{
        "Content-Type": "application/json"
      }}
      const getVisitors = async () =>{
        const response = await fetch('https://g5ydhtxnbi.execute-api.us-east-2.amazonaws.com/Prod/item', requestOptions);
        const data = await response.json();
        console.log(data)
        setVisitors(data);
      }
      getVisitors();
      
      
    

  },[])
  return (
    <>
      <div>
        <a href="https://jasshone.github.io/" target="_blank">
          <img src={jasmine} className="logo" alt="Jasmine picture" />
        </a>
      </div>
      <h1>Jasmine Shone</h1>
      <h2>You could say I wear many hats.</h2>
      <p>This site is under construction and will be updated periodically.</p>
      <p>In the meantime, here's my description from my other site + blog: </p>
      <p>"Hi! I’m Jasmine Shone, a current student at MIT. This summer, I am a research intern at the Learning and Intelligent Systems lab at MIT under Professor Kaelbling and Professor Lozano-Perez, working on robots that are better able to transfer knowledge from training data to real-world environments. I have experience building projects in Computer Vision, NLP, medical ML, deep learning, and robotics, as well as experience with data science and full stack development. In my free time, I enjoy singing/composing music, as well as writing short stories/making videogames."</p>
      <p>Visitor Count: {visitors}</p>
      <div className="card flex">
        <a href = "src/assets/Resume.pdf" download = "Jasmine_Shone_Resume.pdf"><button>
          Resume
        </button></a>
        <a href = "https://www.linkedin.com/in/jasmine-shone-a90853149/"><button>
          LinkedIn
        </button></a>
        <Link to={{pathname: '/Cloud-Resume'}}><button>
          Cloud Resume Challenge
        </button></Link>
        <button onClick={() => setCount((count) => count + 1)}>
          click here? {count}
        </button>
        
      </div>
      <p className="read-the-docs">
        Template from Vite
      </p>
    </>
  )
}

export default App

import { useState } from 'react';
import './App.css';
import APIForm from './Components/APIform';
import Gallery from './Components/gallery';

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  const [inputs, setInputs] = useState({
    url: "",
    format: "",
    no_ads: "",
    no_cookie_banners: "",
    width: "",
    height: "",
  });
  
  const submitForm = () => {
    let defaultValues = {
      format: "jpeg",
      no_ads: "true",
      no_cookie_banners: "true",
      width: "600",
      height: "600",
    };

    if (inputs.url == ""||inputs.url == " "){
      alert("You forgot to submit an url!");
    }
    else{
      //obj
      for (const[key,value] of Object.entries(inputs)){
        if (value == ""){
          inputs[key] = defaultValues[key]
        }
      }
      makeQuery();
    }
  
  }

  const makeQuery = () => {
    let wait_until = "network_idle";
    let response_type = "json";
    let fail_on_status = "400%2C404%2C500-511";
    let url_starter = "https://";
    let fullURL = url_starter + inputs.url;
    let query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${inputs.format}&width=${inputs.width}&height=${inputs.height}&no_cookie_banners=${inputs.no_cookie_banners}&no_ads=${inputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;
    callAPI(query).catch(console.log("We are here!!!"));
  }

  const callAPI =  async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log(response)
    console.log(json)
    if (json.url == null){
      alert("Oops! Something went wrong with that query, let's try again!")
    } 
    else{
      console.log("reacheed here")
      setCurrentImage(json.url);
      setPrevImages((images) => [...images, json.url]);
      
    }
    reset();
  }

  const reset = () => {
    setInputs({
      url: "",
      format: "",
      no_ads: "",
      no_cookie_banners: "",
      width: "",
      height: ""
    });
  }

  const [currentImage, setCurrentImage] =  useState(null);
  
  const [prevImages, setPrevImages] = useState([]);
  return (
    <div className="whole-page">
      <h1>Build Your Own Screenshot! 📸</h1>
      <APIForm
        inputs={inputs}
        handleChange={(e) =>
          setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value.trim(),
          }))
        }
        onSubmit={submitForm}
      />

        {currentImage ? (
          <img
            className="screenshot"
            src={currentImage}
            alt="Screenshot returned"
          />
        ) : (
          <div> </div>
        )}
        <div className="container">
          <h3> Current Query Status: </h3>
          <div className="container">
            <Gallery images={prevImages} />
          </div>
          <p>
            https://api.apiflash.com/v1/urltoimage?access_key={ACCESS_KEY}    
            <br></br>
            &url={inputs.url} <br></br>
            &format={inputs.format} <br></br>
            &width={inputs.width}
            <br></br>
            &height={inputs.height}
            <br></br>
            &no_cookie_banners={inputs.no_cookie_banners}
            <br></br>
            &no_ads={inputs.no_ads}
            <br></br>
          </p>
        </div>

        <br></br>
      
      <br></br>

    </div>
  )
}

export default App

import React, { useEffect , useState} from "react";
import SliderComponents from "../components/slider/SliderComponents";

const Slider = () => {
  const [pictures, setPictures] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const data = await response?.json();
      if (data) {
        setPictures(data);
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Here I will Crearte Code for Slider
    <SliderComponents data={pictures}/>
  
  </div>;
};

export default Slider;

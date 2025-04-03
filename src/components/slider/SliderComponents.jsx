import React, { act, useEffect, useState } from "react";
import "./slider.css";

const SliderComponents = (props) => {
  const [active, setActive] = useState(props?.data[0]);

  const handleNext = () => {
    const findIndex = props?.data.findIndex((item) => item.id === active.id);
    if (findIndex !== props.data.length-1) {
      setActive(props?.data[findIndex + 1]);
    } else {
      setActive(props?.data[0]);
    }
  };

  const handlePrev = () => {

    const findIndex = props?.data.findIndex((item) => item.id === active.id);
    console.log(findIndex,'fin')
    if (findIndex !== 0) {
      setActive(props?.data[findIndex - 1]);
    } else {
      setActive(props?.data[props?.data?.length - 1]);
    }
  };

  useEffect(() => {
    setActive(props?.data[0]);
  }, []);

  const handleSelectetImage = (item) => {
    setActive(item);
  };

  if (props?.data?.length === 0) {
    return <p>No Data</p>;
  }
  console.log(active, "ff");
  return (
    <div className="slider">
      <button onClick={handlePrev}>Prev</button>
      <button onClick={handleNext}>Next</button>
      <div>
        <img src={active?.download_url} width={"500px"} height={"500px"} />
      </div>
      <div className="slider-list">
        {props?.data.map((item) => (
          <button
            key={item?.id}
            className="slider-item"
            onClick={() => handleSelectetImage(item)}
            style={{
              border: item?.id === active?.id ? "2px solid red" : "none",
            }}
          >
            <img
              src={item?.download_url}
              alt="item.url"
              width={"200px"}
              height={"100px"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SliderComponents;

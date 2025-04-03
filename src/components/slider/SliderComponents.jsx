import React, { useEffect, useState, useRef } from "react";
import "./slider.css";

const SliderComponent = ({ data = [], autoInterval = 3000 }) => {
  // Use a default empty array if data is undefined
  const [active, setActive] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  // Use ref to store the interval ID
  const autoPlayIntervalRef = useRef(null);

  useEffect(() => {
    // Reset active slide when data changes
    if (data && data.length > 0) {
      setActive(data[0]);
      setError(null);
    } else {
      setError("No images to display");
      setActive(null);
    }
    setIsLoading(false);
    
    // Clean up interval on unmount or data change
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [data]);

  // Start or stop autoplay when isAutoPlaying changes
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    
    return () => stopAutoPlay();
  }, [isAutoPlaying]);

  const startAutoPlay = () => {
    if (!data || data.length <= 1) return;
    
    // Clear any existing interval first
    stopAutoPlay();
    
    // Create new interval that calls handleNext
    autoPlayIntervalRef.current = setInterval(() => {
      handleNext();
    }, autoInterval);
  };

  const stopAutoPlay = () => {
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(prev => !prev);
  };

  const handleNext = () => {
    if (!data || !active) return;
    
    const currentIndex = data.findIndex((item) => item.id === active.id);
    if (currentIndex === -1) return;
    
    const nextIndex = currentIndex === data.length - 1 ? 0 : currentIndex + 1;
    setActive(data[nextIndex]);
  };

  const handlePrev = () => {
    if (!data || !active) return;
    
    const currentIndex = data.findIndex((item) => item.id === active.id);
    if (currentIndex === -1) return;
    
    const prevIndex = currentIndex === 0 ? data.length - 1 : currentIndex - 1;
    setActive(data[prevIndex]);
  };

  const handleSelectImage = (item) => {
    setActive(item);
    
    // Optional: pause autoplay when manually selecting an image
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <div className="slider-loading">Loading...</div>;
  }

  // Error state
  if (error || !data || data.length === 0) {
    return <div className="slider-error">{error || "No images available"}</div>;
  }

  // Make sure active is defined before rendering
  if (!active) {
    return <div className="slider-error">Unable to display slider</div>;
  }

  return (
    <div className="slider">
      <div className="slider-controls">
        <button 
          className="slider-button prev-button" 
          onClick={handlePrev}
          aria-label="Previous image"
        >
          Previous
        </button>
        
        <button 
          className={`slider-button auto-button ${isAutoPlaying ? 'playing' : ''}`}
          onClick={toggleAutoPlay}
          aria-label={isAutoPlaying ? "Stop auto slideshow" : "Start auto slideshow"}
        >
          {isAutoPlaying ? "Stop Auto" : "Start Auto"}
        </button>
        
        <button 
          className="slider-button next-button" 
          onClick={handleNext}
          aria-label="Next image"
        >
          Next
        </button>
      </div>

      <div className="slider-main-image">
        {active.download_url ? (
          <img 
            src={active.download_url} 
            alt={active.author || "Slider image"} 
            width="500" 
            height="500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/500?text=Image+Error";
            }}
          />
        ) : (
          <div className="image-placeholder">Image unavailable</div>
        )}
      </div>

      <div className="slider-list">
        {data.map((item) => (
          <button
            key={item?.id || Math.random().toString()}
            className={`slider-item ${item?.id === active?.id ? "active" : ""}`}
            onClick={() => handleSelectImage(item)}
            aria-label={`Select image ${item.id || ""}`}
          >
            {item?.download_url ? (
              <img
                src={item.download_url}
                alt={item.author || "Thumbnail"}
                width="200"
                height="100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/200x100?text=Error";
                }}
              />
            ) : (
              <div className="thumbnail-placeholder">No image</div>
            )}
          </button>
        ))}
      </div>
      
      {/* Auto play indicator */}
      {isAutoPlaying && (
        <div className="auto-play-indicator">
          Auto-play enabled
        </div>
      )}
    </div>
  );
};

export default SliderComponent;
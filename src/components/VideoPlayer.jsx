function VideoPlayer() {
  // ... existing code ...
  
  return (
    <div className="video-container">
      <video ref={videoRef}>
        {/* ... video source ... */}
      </video>
      <div className="controls">
        <div className="controls-left">
          {/* Left side controls (play, volume etc) */}
        </div>
        
        {/* Move the Screenshot button here, between left and right controls */}
        <button className="screenshot-btn" onClick={handleScreenshot}>
          Screenshot
        </button>
        
        <div className="controls-right">
          {/* Right side controls */}
        </div>
      </div>
    </div>
  );
} 
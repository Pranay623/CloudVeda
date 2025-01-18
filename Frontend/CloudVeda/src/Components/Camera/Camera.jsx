import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const Camera = () => {
  const webcamRef = useRef(null);
  const [url, setUrl] = useState(null);
  const [mediaError, setMediaError] = useState(null);

  
  const capturePhoto = useCallback(async() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUrl(imageSrc);
  }, [webcamRef]);

  // Handle user media events (if needed)
  const onUserMedia = (stream) => {
    console.log("User media stream:", stream);
  };

  // Handle errors when accessing user media
  const onUserMediaError = (error) => {
    console.error("Error accessing user media:", error);
    setMediaError("Failed to access camera.");
  };

  return (
    <>
      <Webcam
        ref={webcamRef}
        audio={true}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
        onUserMedia={onUserMedia}
        onUserMediaError={onUserMediaError}
        mirrored={false}
      />
      <button onClick={capturePhoto}>Capture</button>
      <button onClick={() => { setUrl(null); }}>Refresh</button>
      {mediaError && <p className="text-red-500">{mediaError}</p>}
      {url && (
        <div>
          <img src={url} alt="Screenshot" />
        </div>
      )}
    </>
  );
};

export default Camera;

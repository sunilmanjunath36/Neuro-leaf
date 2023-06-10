import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Dropzone from "./Dropzone";
import { useState } from "react";

function Home() {
  const [showDropzone, setShowDropzone] = useState(false);

  const handleClick = () => {
    setShowDropzone(true);
  };

  return (
    <>    
      <div className="home">
        <div className="header">
          <h1>Neuro Leaf's</h1>
          <h3>"I'm just a Potato that won't quit"</h3>
          <h4>Potato leaf infection detection</h4>
        </div>
        {showDropzone && <Dropzone />}
        <div className="upload-buttons">
          <button onClick={handleClick}>
            <CloudUploadIcon />
          </button>
        </div>
      </div>
    </>
  );
}

export default Home;

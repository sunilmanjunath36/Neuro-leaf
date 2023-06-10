import React, { useEffect, useState } from "react";
import axios from "axios";

const Dropzone = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState();
  const [preview, setPreview] = useState();


  const sendFile = async () => {
    console.log("sending to server");
    let formData = new FormData();
    formData.append("file", selectedFile);
    let res = await axios({
      method: "post",
      url: "http://127.0.0.1:8000/predict",
      data: formData,
    });
    if (res.status === 200) {
      setData(res.data);
    }
    setIsloading(false);
  };

  useEffect(()=>{
    if (!selectedFile) {
        setPreview(undefined);
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
  }, [selectedFile])

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedFile(event.dataTransfer.files[0]);
  };

  return (
    <div className="dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
      {
        data ? (
            <div className="result">
                <h3>Result</h3>
              {preview && <img src={preview} alt="preview" />}<br/>

                class: {data.class}<br/>
                confidence: {data.confidence}
            </div>
        ) : selectedFile ? (
            <div className="selected">
              <p>Selected file: {selectedFile.name}</p>
              {preview && <img src={preview} alt="preview" />}<br/>
              <button onClick={sendFile}>Predict</button>
            </div>
          ) : (
            <div className="drop-area">
              <p>Drag and drop a file here, or click to select a file</p>
              <input type="file" onChange={handleFileChange} />
            </div>
          )
      }
    </div>
  );
};

export default Dropzone;

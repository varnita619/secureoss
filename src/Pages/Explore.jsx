import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../Config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

export const Explore = () => {
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);
  const fileListRef = ref(storage, "images/");
  const uploadFile = () => {
    if (file === null) return;
    const fileReference = ref(storage, `files/${file.name + v4()}`);
    uploadBytes(fileReference, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFilesList((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFilesList((prev) => [...prev, url]);
        });
      });
    });
  }, [fileListRef]);

  return (
    <div className="App">
      <h2>Upload Image</h2>
      <input type="file" onChange={(event) => setFile(event.target.files[0])} />
      <button onClick={() => uploadFile()}>Upload File</button>

      {filesList.map((url) => {
        return <img src={url} alt="file" />;
      })}
    </div>
  );
};

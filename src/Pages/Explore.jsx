import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { storage } from "../Config/firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import axios from "axios";

export const Explore = () => {
  const [fileUpload, setFileUpload] = useState(null);
  const [filesListUrl, setFilesListUrl] = useState([]);
  const [userRepos, setUserRepos] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  const fileListRef = ref(storage, "files/");
  const uploadFile = () => {
    if (fileUpload == null) return;
    const fileReference = ref(storage, `files/${fileUpload.name + v4()}`);
    uploadBytes(fileReference, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFilesListUrl((prev) => [...prev, url]);
      });
    });
  };

  useEffect(() => {
    listAll(fileListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setFilesListUrl((prev) => [...prev, url]);
        });
      });
    });
  },[]);

  const handleRepos = async () => {
    try {
      const result = await axios(
        `https://api.github.com/users/${searchUser}/repos`
      );
      setUserRepos(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <h2>Upload Image</h2>
        <input
          type="file"
          onChange={(event) => setFileUpload(event.target.files[0])}
        />
        <button onClick={uploadFile}>Upload File</button>
      </div>
      {filesListUrl.map((url, i) => (
        <img
          key={i}
          style={{ width: "10%", height: "10%" }}
          src={url}
          alt="file"
        />
      ))}

      <div>
        <input
          type="text"
          onChange={(event) => setSearchUser(event.target.value)}
        />
        <button onClick={handleRepos}>Get Repos</button>

        {userRepos.map((eachRepo, i) => {
          return (
            <div style={{ width: "20%", padding: ".5rem", margin: "1rem" }}>
              <a
                href={eachRepo.html_url}
                target="_blank"
                key={i}
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                <li>{eachRepo.name}</li>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

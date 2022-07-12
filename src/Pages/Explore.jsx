import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export const Explore = () => {
  const [userRepos, setUserRepos] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const { logout } = useAuth();

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `token ${token}`,
  };

  const handleRepos = async () => {
    try {
      const result = await axios("https://api.github.com/user/repos", {
        headers: headers,
      });

      setUserRepos(result.data);
    } catch (err) {
      console.error(err);
    }
  };
  // https://api.snyk.io/rest/
  // https://snyk.io/api/v1/orgs

  const head = {
    "Content-Type": "application/json",
    Authorization: "token ac19fd59-038d-47c6-8702-cd717bfca4a5",
  }

  const snykHandler = async () => {
    try {
      const result = await axios("https://snyk.io/api/v1/org/26a3b7a1-9725-41a6-8eb2-722b5058024e/projects", {
        headers: {
          head
        },
      });
      console.log(result);
    } catch (error) {
      console.error(error);
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
        <input
          type="text"
          onChange={(event) => setSearchUser(event.target.value)}
        />
        <button onClick={handleRepos}>Get Repos</button>
        <h3>{searchUser}</h3>
        {userRepos.map((eachRepo, i) => {
          return (
            <div style={{ width: "55%", padding: ".5rem", margin: "1rem" }}>
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

      <div>
        <button onClick={snykHandler}>Snyk</button>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

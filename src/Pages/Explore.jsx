import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

export const Explore = () => {
  const [userRepos, setUserRepos] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const {logout} = useAuth();

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
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

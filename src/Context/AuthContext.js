import { createContext, useContext, useState } from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../Config/firebase";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const signInWithGithub = async () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/explore");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <AuthContext.Provider value={{ signInWithGithub, token }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };

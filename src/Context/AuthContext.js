import { createContext, useContext } from "react";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../Config/firebase";

export const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  // const [error, setError] = useState("");

  const signInWithGithub = () => {
    signInWithPopup(auth, new GithubAuthProvider())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <AuthContext.Provider value={{ signInWithGithub }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthContextProvider };

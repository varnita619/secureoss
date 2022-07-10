import { useAuth } from "../Context/AuthContext";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
  const { signInWithGithub } = useAuth();

  return (
    <>
      <button onClick={ signInWithGithub}>Sign In With Github</button>
    </>
  );
};

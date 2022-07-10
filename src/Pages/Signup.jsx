import { useAuth } from "../Context/AuthContext";

export const Signup = () => {
  const { signInWithGithub } = useAuth();

  return (
    <>
      <button onClick={ signInWithGithub}>Sign In With Github</button>
    </>
  );
};

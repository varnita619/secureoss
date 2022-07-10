import "./App.css";
import { Signup, Explore } from "./Pages";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/explore" element={<Explore />}></Route>
      </Routes>
    </>
  );
}

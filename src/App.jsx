import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import AllLists from "./Components/AllLists/AllLists";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/Signup";

import './App.scss';

function App() {

  return (
    
    <>
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<AllLists />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

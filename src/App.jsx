import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import AllLists from "./Components/AllLists/AllLists";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/Signup";
import SingleList from "./Components/SingleList/SingleList";

import './App.scss';
import OrganizedList from "./Components/SingleList/OrganizedList/OrganizedList";
import Footer from "./Components/Footer/Footer";

function App() {

  return (
    
    <>
    <div className="full-page">
      <BrowserRouter>
      <div className="full-page__content">
        <Header />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/lists" element={<AllLists />} />
            <Route path="/lists/:id" element={<SingleList />} />
            <Route path="/lists/:id/organized" element={<OrganizedList />} />
          </Routes>
      </div>
      <div className="full-page__footer">
        <Footer />
      </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;

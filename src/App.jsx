import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";
import AddList from "./Components/AddList/AddList";

import './App.scss';
// import ListItem from "../pages/ListItem/ListItem";

function App() {
  const handleAddNewList = (new_list_name) => {
    setNewList(prevList => ([...prevList, new_list_name]));
}
  return (
    
    <>
    <BrowserRouter>
      <Header />
    <Routes>
      <Route path="/" element={<AddList />} />
      {/* <Route path="/listItem" element={<ListItem addNewList={new} />} */}
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

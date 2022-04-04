import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../DefaultPages/Login";
import Contacts from "../DefaultPages/Contacts";
import Home from "../DefaultPages/Home";

const Router = () => (
  <main>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/log_in" element={<Login />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  </main>
);

export default Router;

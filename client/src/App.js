import { Route, Routes, Link, Outlet } from "react-router-dom";
import "./App.css";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Home from "./components/Home";
import Card from "./components/Card";
import Favourites from "./components/Favourites";
import Join from "./components/Join";
import Post from "./components/Post";
import Login from "./components/Login";
import AllCards from "./components/AllCards";

function NotFound() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home");
  });

  return (
    <div>
      <h2>Not Found - 404</h2>
      <button onClick={() => navigate("/home")}>Go Home</button>
    </div>
  );
}

function App() {
  return (
    <>
      <div>
        <div className="ui inverted segment">
          <div className="ui inverted secondary pointing menu">
            <Link className="item" to="/">
              Home
            </Link>
            <Link className="item" to="/recipe/favourites">
              Favourites
            </Link>
            <Link className="item" to="/recipe/join">
              Join
            </Link>
            <Link className="item" to="/recipe/login">
              Login
            </Link>
            <Link className="item" to="/recipe/post">
              Post Recipe
            </Link>
          </div>
        </div>
        <div className="ui action input">
          <input type="text" placeholder="Search..." />
          <button className="ui button teal">Search</button>
        </div>

        <Routes>
          {/* <Route path="/" /> */}
          <Route path="/" element={<Home />} />
          <Route path="/recipe/favourites" element={<Favourites />} />
          {/* </Route> */}
          <Route path="/recipe/join" element={<Join />} />
          <Route path="/recipe/" element={<AllCards />} />
          <Route path="/recipe/:id" element={<Card />} />
          <Route path="/recipe/post" element={<Post />} />
          <Route path="*" element={<NotFound />} />
          {/* <Route
          path="*"
          element={
            <main>
              <p>There's nothing here!</p>
            </main>
          }
        /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;

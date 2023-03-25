import { NavLink, Link } from "react-router-dom";

import Voting from "./img/voting.png";
import Breeds from "./img/breeds.png";
import gallery from "./img/gallery.png";

import React from "react";

import "./category.css";
const Category = () => {
  return (
    <>
      <p className="category__desc">Lets start using The Cat API</p>
      <div>
        <nav className="category__list">
          <div className="category__item">
            <Link to="/" className="category__img">
              <img src={Voting} alt="Voting" />
            </Link>
            <NavLink
              className={({ isActive, isPending }) =>
                isActive
                  ? "active category__btn"
                  : isPending
                  ? "pending"
                  : "category__btn"
              }
              to={`/voting`}
              // className="category__btn"
            >
              Voting
            </NavLink>
          </div>

          <div className="category__item">
            <Link to="/" className="category__img">
              <img src={Breeds} alt="Breed" />
            </Link>
            <NavLink to="/breeds" className="category__btn">
              Breeds
            </NavLink>
          </div>
          <div className="category__item">
            <Link to="/" className="category__img">
              <img src={gallery} alt="gallery" />
            </Link>
            <NavLink to="/gallery" className="category__btn">
              Gallery
            </NavLink>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Category;

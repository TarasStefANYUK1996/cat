import "./SearchPanel.css";
import Likes from "../likes/likes";
import serch__btn from "./svg/search.svg";
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
const breads = [
  { name: "All breads", type: "" },
  { name: "Abyssinian", type: "abys" },
  { name: "Aegean", type: "aege" },
  { name: "American Bobtail", type: "abob" },
  { name: "American Curl", type: "acur" },
  { name: "American Shorthair", type: "asho" },
  { name: "American Wirehair", type: "awir" },
];

const breadNames = breads.map((bread) => bread.name);
const SearchPanel = ({ getCatAll, arrLike }) => {
  const [filt, setFilt] = useState("");
  const navigate = useNavigate();
  const filter = useCallback(
    (letters, breadNames) => {
      let regx = new RegExp(letters, "i");

      if (letters.length === 0 || breadNames.indexOf(letters) !== -1) {
        return "";
      } else {
        return breadNames
          .filter((item) => {
            return regx.test(item);
          })
          .map((item, index) => {
            const aegeanBread = breads.find(
              (bread) => bread.name === item
            ).type;

            return (
              <div
                className="item__filter"
                onClick={(e) => {
                  navigate("/breeds");

                  setFilt(item);
                  getCatAll(aegeanBread);
                }}
                key={index}
              >
                {item}
              </div>
            );
          });
      }
    },
    [getCatAll, navigate]
  );
  const filteredBreads = filter(filt, breadNames);

  return (
    <div className="wr__top">
      <div className="search__wrap">
        <div className="wrap__input">
          <input
            onChange={(e) => setFilt(e.target.value)}
            className="search__input"
            type="text"
            placeholder="Search for breeds by name "
            value={filt}
          />
          <Link
            className="serch__btn"
            to="/breeds"
            onClick={(e) => {
              const selectedBreed = breads.find((bread) => bread.name === filt);
              if (selectedBreed) {
                const selectedBreedType = selectedBreed.type;
                getCatAll(selectedBreedType);
              }
            }}
          >
            <img src={serch__btn} alt="search" />
          </Link>
        </div>
        {filteredBreads}
      </div>
      <Likes arrLike={arrLike} />
    </div>
  );
};

export default SearchPanel;

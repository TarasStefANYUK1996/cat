import Btn from "../../btn/back/btn";
import BtnType from "../../btn/type/btntype";
import "./gallery.css";
import SearchPanel from "../../searchpanel/SearchPanel";
import Selects from "./select/selects";
import Image from "../../breeds/filter/imageCollage/image";
import { useState, useEffect } from "react";
import "./gallery.css";

const Gallery = (props) => {
  console.log(props);
  const [param, setParam] = useState({
    limit: "4",
    order: "DESC",
    type: "All",
    breed: "abys",
  });
  const test = (type, e) => {
    setParam((prev) => {
      prev[type] = e;
      return prev;
    });
  };
  async function getGallery() {
    const response = await fetch(
      `https://api.thecatapi.com/v1/favourites?limit=${param.limit}&order=${param.order}&type=${param.type}&breed=${param.breed}`,
      {
        headers: {
          "content-type": "application/json",
          "x-api-key":
            "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
        },
      }
    );
    const favourites = await response.json();

    props.updateGallery(favourites);
    console.log(favourites);
  }

  useEffect(() => {
    getGallery();
  }, []);
  return (
    <>
      <SearchPanel arrLike={props.arrLike} />
      <div className="rightContent">
        <div className="wr__btnVoting">
          <div className="btnL">
            <Btn text="&#60;" prevCat={props.prevCat} />
            <BtnType text="Gallery" getCat={props.getCat} />
          </div>

          {/* <BtnType text="Upload" getCat={getGallery} /> */}
        </div>
        <div className="filter__gallery">
          <Selects
            test={test}
            name="order"
            optionValue={[
              { value: "Random", name: "Random" },
              { value: "Desc", name: "Desc" },
              { value: "Asc", name: "Asc" },
            ]}
          />
          <Selects
            name="type"
            test={test}
            optionValue={[
              { value: "All", name: "All" },
              { value: "Static", name: "Static" },
              { value: "Animated", name: "AmerAnimatedican" },
            ]}
          />
          <Selects
            name="breed"
            test={test}
            optionValue={[
              { value: "abys", name: "Abyssinian" },
              { value: "aege", name: "Aegean" },
              { value: "abob", name: "American" },
            ]}
          />
          <Selects
            name="limit"
            test={test}
            optionValue={[
              { value: "5", name: "5 items per page" },
              { value: "10", name: "10 items per page" },
              { value: "15", name: "15 items per page" },
              { value: "20", name: "20 items per page" },
            ]}
          />
        </div>
        <div className="images">
          <Image
            arrLike={props.arrLike}
            type="gallery"
            catallImg={props.gallery}
          />
        </div>
      </div>
    </>
  );
};
export default Gallery;

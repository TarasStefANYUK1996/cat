import { Link } from "react-router-dom";
import "./image.css";
const Image = (props) => {
  let ars;
  let galleryButton = "";
  if (props.type !== "gallery") {
    console.log("notgallery");
    ars = props.catallImg[props.catallImg.length - 1];
    console.log(ars);
    galleryButton = (item) => {
      return;
    };
  } else {
    console.log("gallery");
    ars = props.catallImg;
    const Img = props.arrLike[1].img;

    galleryButton = (item) => {
      return (
        <Link
          onClick={async (e) => {
            e.preventDefault();
            //Пост запит з видаленням item
            const favouriteId = item;
            var requestOptions = {
              method: "DELETE",
              headers: {
                "content-type": "application/json",
                "x-api-key":
                  "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
              },
            };
            await fetch(
              `https://api.thecatapi.com/v1/favourites/${favouriteId}`,
              requestOptions
            );
          }}
          to="#"
          className="img__btn galleryButton"
        >
          <Img />
        </Link>
      );
    };
  }
  // console.log(ars);
  const res = ars.map((item, index) => {
    // console.log(item);
    let name;
    let urll;
    if (item.hasOwnProperty("url")) {
      // console.log(item);
      urll = item.url;
    } else {
      // console.log("hhhhhh");
      urll = item.image.url;
    }
    try {
      name = (
        <Link
          to="/type"
          onClick={(e) => {
            // e.preventDefault();
            props.itemDesc(props.catallImg[props.catallImg.length - 1][index]);
          }}
          className="img__btn"
        >
          {item.breeds[0].name}
        </Link>
      );
    } catch (e) {}
    return (
      <div key={index} className={"item item" + index}>
        <div className="WrImg">
          {/* <Descriptions /> */}
          <img src={urll} alt="" />
          {name !== "" ? name : ""}
          {galleryButton(item.id)}
        </div>
      </div>
    );
  });
  return <> {res}</>;
};
export default Image;

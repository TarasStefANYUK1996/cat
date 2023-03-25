import "./likes.css";
import { NavLink } from "react-router-dom";
const likes = (props) => {
  const likeshow = props.arrLike.map((item, index) => {
    const ImgTag = item.img;
    return (
      <NavLink
        to={"/filter/id" + index}
        className={({ isActive }) => (isActive ? "active img__wr" : "img__wr")}
        onClick={() => item.func()}
        key={index}
      >
        <ImgTag />
      </NavLink>
    );
  });

  return <div className="likes__wrap">{likeshow}</div>;
};
export default likes;

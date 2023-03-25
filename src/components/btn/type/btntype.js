import { Link } from "react-router-dom";
import "./btntype.css";
const BtnType = (props) => {
  return (
    <>
      <Link
        onClick={(e) => {
          e.preventDefault();
          console.log(props);
          props.getCat("");
        }}
        className="bottomVoting"
        to="#"
      >
        {props.text}
      </Link>
    </>
  );
};
export default BtnType;

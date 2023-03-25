import { Link } from "react-router-dom";
import "./btn.css";
const Btn = (props) => {
  return (
    <>
      <Link onClick={(e) => props.prevCat(e)} className="backVoting" to="#">
        {props.text}
      </Link>
    </>
  );
};
export default Btn;

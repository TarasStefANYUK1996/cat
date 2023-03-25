import Btn from "../btn/back/btn";
import BtnType from "../btn/type/btntype";
import "./section.css";
const Section = (props) => {
  return (
    <>
      <div className="wr__btnVoting">
        <div className="btnL">
          <Btn text="&#60;" prevCat={props.prevCat} />
          <BtnType text="Voting" getCat={props.getCat} />
        </div>
      </div>
    </>
  );
};
export default Section;

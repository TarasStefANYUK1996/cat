import "./filter.css";
import Btn from "../../btn/back/btn";
import BtnType from "../../btn/type/btntype";
import { HandySvg } from "handy-svg";
import sorting_ba from "../img/sorting_ba.svg";
import sorting_ab from "../img/sorting_ab.svg";

const Filter = (props) => {
  const selectLimit = (e) => {
    props.val(e.target.value, "val");
  };
  const selectType = (e) => {
    props.val(e.target.value, "type");
  };
  return (
    <>
      <div className="filter">
        <Btn text="&#60;" prevCat={props.prevCatAll} />
        <BtnType text="Breeds" getCat={props.getCatAll} />

        <form className="form" action="" method="POST">
          <select
            onChange={(e) => selectType(e)}
            className="folter__select"
            name="form_select"
          >
            <option defaultValue="selected" value="All">
              All Breeds
            </option>
            <option value="abys">Abyssinian</option>
            <option value="aege">Aegean</option>
            <option value="abob">American Bobtail</option>
            <option value="acur">American Curl</option>
            <option value="asho">American Shorthair</option>
            <option value="awir">American Wirehair</option>
          </select>
        </form>
        <form className="form" action="" method="POST">
          <select
            className="folter__select"
            onChange={(e) => selectLimit(e)}
            name="form_select"
          >
            <option defaultValue="selected" value="5">
              Limit: 5
            </option>
            <option value="10">Limit: 10</option>
            <option value="15">Limit: 15</option>
            <option value="20">Limit: 20</option>
          </select>
        </form>
        <button className="btn__sort">
          <HandySvg src={sorting_ba} className="icon" width="12" height="12" />
        </button>
        <button className="btn__sort">
          <HandySvg src={sorting_ab} className="icon" width="12" height="12" />
        </button>
      </div>
    </>
  );
};
export default Filter;

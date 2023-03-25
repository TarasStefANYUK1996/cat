import SearchPanel from "../../searchpanel/SearchPanel";
import Btn from "../../btn/back/btn";
import BtnType from "../../btn/type/btntype";
import "./descriptions.css";
const Descriptions = (props) => {
  console.log(props);
  return (
    <div className="Descriptions__wrap">
      <SearchPanel arrLike={props.arrLike} />
      <div className="wrBtn">
        <Btn text="&#60;" prevCat={props.prevCatAll} />
        <BtnType text="Breeds" getCat={props.getCatAll} />
        <button className="descID bottomVoting">{props.itemDescs.id}</button>
      </div>
      <div className="desc__top">
        <img src={props.itemDescs.url} alt="" />
      </div>
      <fieldset>
        <legend align="center">
          <h1>{props.itemDescs.breeds[0].name}</h1>
        </legend>
        <div className="desc__text">
          <p className="head__name">Family companion cat</p>
          <div className="desc__textWrap">
            <div className="d__text__left">
              <span>Temperament: </span>
              {props.itemDescs.breeds[0].temperament}
            </div>

            <div className="d__text__right">
              <div className="desc__item__r">
                <span>Origin: </span>
                {props.itemDescs.breeds[0].origin}
              </div>
              <div className="desc__item__r">
                <span>Weight: </span>
                {props.itemDescs.breeds[0].weight.metric}
              </div>
              <div className="desc__item__r">
                <span>Life span: </span>
                {props.itemDescs.breeds[0].life_span}
              </div>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  );
};
export default Descriptions;

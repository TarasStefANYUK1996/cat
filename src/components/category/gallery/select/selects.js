import "./selects.css";
const Selects = (props) => {
  const optionValue = props.optionValue;
  const name = props.name;
  const res = optionValue.map((item, index) => {
    return (
      <option key={index} value={item.value}>
        {item.name}
      </option>
    );
  });
  return (
    <>
      <form className="gallery__form" action="" method="POST">
        <label className="label" htmlFor="">
          {name}
        </label>
        <select
          onChange={(e) => props.test(name, e.target.value)}
          className="folter__select"
          name="form_select"
        >
          {res}
        </select>
      </form>
    </>
  );
};
export default Selects;

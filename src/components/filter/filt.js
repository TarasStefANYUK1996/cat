const Filter = (props) => {
  const filterItems = props.filt.map((item, index) => {
    return (
      <div className={"item item" + index}>
        <div className="WrImg">
          <img key={index} alt="" src={item.image.url} />
        </div>
      </div>
    );
  });
  return <> {<div className="images">{filterItems}</div>}</>;
};
export default Filter;

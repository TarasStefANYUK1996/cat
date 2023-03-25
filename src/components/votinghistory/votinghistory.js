import { ReactComponent as Like } from "../../components/likes/img/like.svg";
import { ReactComponent as Favourites } from "../../components/likes/img/favourites.svg";
import { ReactComponent as Deslike } from "../../components/likes/img/deslike.svg";
import "./votinghistory.css";
const Votinghistory = (props) => {
  // console.log(props);

  let test = props.getUser.slice(0);

  test.sort((a, b) =>
    new Date(a.created_at) > new Date(b.created_at) ? -1 : 1
  );
  test.splice(4);
  let res = test.map((element, index) => {
    return (
      <div key={index} className="votinghistoryItem">
        <div className="wrhistorText">
          <div className="votinghistoryDate">
            {element.created_at.split("T")[1].slice(0, 5)}
          </div>
          <div className="votinghistoryText">
            Image ID: <span className="votingImageId">{element.image_id}</span>{" "}
            - was added to
            {element.value === 1
              ? "like"
              : element.value === -1
              ? "Dislikes"
              : "favourites"}
            was added to
          </div>
        </div>

        <div className="votinghistoryIcon">
          {element.value === 1 ? (
            <Like />
          ) : element.value === -1 ? (
            <Deslike />
          ) : (
            <Favourites />
          )}
        </div>
        {/* <div className="votinghistoryValue"></div> */}
      </div>
    );
  });

  return <div className="votinghistoryWr">{res}</div>;
};
export default Votinghistory;

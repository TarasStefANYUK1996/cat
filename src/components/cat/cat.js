import React, { useEffect } from "react";
import { Discuss } from "react-loader-spinner";

import "./cat.css";

const getFavourites = async (url) => {
  const res = await fetch(url, {
    headers: {
      "content-type": "application/json",
      "x-api-key":
        "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
    },
  });
  return await res.json();
};

const Cat = ({ getUserd, arrLike, catImg, loading }) => {
  // console.log(props);
  // const { getUserd } = props;

  const PostVoting = async (image_idn, url, type) => {
    console.log(url);
    let data = {
      image_id: image_idn,
      value: type,
    };
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json, text/plain, */*",
        "x-api-key":
          "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await response.json();
      fetchItems();
    } else {
      alert("Ошибка HTTP: " + response.status);
    }
  };

  const fetchItems = async () => {
    const favouritesItems = await getFavourites(
      "https://api.thecatapi.com/v1/favourites?api_key=live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh&limit=5&order=DESC"
    );
    const voteItems = await getFavourites(
      "https://api.thecatapi.com/v1/votes?api_key=live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh&limit=4&order=DESC"
    );

    getUserd(() => [...favouritesItems, ...voteItems]);
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const catsLike = arrLike.map((item, index) => {
    let Tags = item.img;
    let styleColor = { background: "#" + item.color };

    return (
      <div
        onClick={() => {
          let imid = catImg[catImg.length - 1]
            .split("images/")[1]
            .split(".")[0];
          if (item.type === "like") {
            PostVoting(imid, "https://api.thecatapi.com/v1/votes/", 1);
          } else if (item.type === "deslike") {
            PostVoting(imid, "https://api.thecatapi.com/v1/votes/", -1);
          } else if (item.type === "favourites") {
            PostVoting(imid, "https://api.thecatapi.com/v1/favourites/");
          }
        }}
        style={styleColor}
        key={index}
        className="img__wr"
      >
        <Tags className="catLikes" />
      </div>
    );
  });

  if (loading) {
    return (
      <div className="spinner">
        <Discuss
          visible={loading}
          height="100%"
          width="100%"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="#fff"
          backgroundColor="#F4442E"
        />
      </div>
    );
  }
  return (
    <div className="catImg">
      <img src={catImg[catImg.length - 1]} alt="cat" />
      <div className="catLike">{catsLike}</div>
    </div>
  );
};
export default Cat;

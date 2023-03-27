import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Logo from "./components/logo/logo";
import "normalize.css";
import Description from "./components/description/description";
import Category from "./components/category/category";
import SearchPanel from "./components/searchpanel/SearchPanel";
import Descriptions from "./components/breeds/description/description";
import Section from "./components/section/section";
import Cat from "./components/cat/cat";
import Votinghistory from "./components/votinghistory/votinghistory";
import { ReactComponent as Like } from "./components/likes/img/like.svg";
import { ReactComponent as Favourites } from "./components/likes/img/favourites.svg";
import { ReactComponent as Deslike } from "./components/likes/img/deslike.svg";
import Filter from "./components/breeds/filter/filter";
import Image from "./components/breeds/filter/imageCollage/image";
import Gallery from "./components/category/gallery/gallery";
import Filt from "../src/components/filter/filt";

const Render = () => {
  const arrLike = [
    { img: Like, color: "97EAB9", type: "like", func: () => getVoting(1) },
    {
      img: Favourites,
      color: "FF868E",
      type: "favourites",
      func: () => getVoting("favourites"),
    },
    {
      img: Deslike,
      color: "FFD280",
      type: "deslike",
      func: () => getVoting(-1),
    },
  ];
  const [catParams, setCatParams] = useState({ val: 5, type: "" });
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState([]);

  const val = (value, type) => {
    setCatParams((prev) => {
      prev[type] = value;
      return prev;
    });
  };

  let [char, setChar] = useState([]);
  const getUserd = (it) => {
    setChar(it);
  };
  const getCat = async () => {
    setLoading(true);
    //рандомне фото кота
    const url = "https://api.thecatapi.com/v1/images/search";
    const response = await fetch(url);
    if (response.ok) {
      let json = await response.json();
      setLoading(false);
      setCatImg((prev) => {
        return [...prev, ...[json[0].url]];
      });
    } else {
      alert("error: " + response.status);
    }
  };

  const getCatAll = async (ren) => {
    // рандомне фото кота

    const breedIds =
      ren !== "" ? `&breed_ids=${ren}` : `&breed_ids=${catParams.type}`;

    const url = `https://api.thecatapi.com/v1/images/search?limit=${catParams.val}${breedIds}`;
    const headers = {
      "content-type": "application/json",
      "x-api-key":
        "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
    };

    try {
      const response = await fetch(url, {
        headers,
      });
      if (response.ok) {
        const json = await response.json();

        setCatallImg((prev) => {
          return prev.concat([json]);
        });
      } else {
        alert("error: " + response.status);
      }
    } catch (error) {
      alert(`Errocr: ${error.message}`);
    }
  };
  const prevCat = (e) => {
    e.preventDefault();
    setCatImg((prev) => {
      prev.splice(prev.length - 1, prev.length);
      return [...prev];
    });
  };
  const prevCatAll = (e) => {
    e.preventDefault();

    setCatallImg((prev) => {
      if (prev.length > 3) {
        prev.splice(prev.length - 1, prev.length);
      }
      return [...prev];
    });
  };
  const itemDesc = (item) => {
    setItemDescs(item);
  };
  const [catImg, setCatImg] = useState([]);
  const [catallImg, setCatallImg] = useState([[], []]);
  const [itemDescs, setItemDescs] = useState([]);
  const [gallery, setGallery] = useState([]);
  console.log(catallImg);
  const updateGallery = (gallery) => {
    setGallery(gallery);
  };
  useEffect(() => {
    getCat();
  }, []);
  useEffect(() => {
    getCatAll("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getVoting(num) {
    let url;
    if (num === "favourites") {
      url = "favourites";
    } else {
      url = "votes";
    }
    const response = await fetch(
      `https://api.thecatapi.com/v1/${url}?limit=10&order=DESC`,
      {
        headers: {
          "content-type": "application/json",
          "x-api-key":
            "live_ueSLmenurxVzNj0cXpa1IY2VuK9quqac7wB5OOsjGavCNnfxILHCXPwDul1uI6vh",
        },
      }
    );
    const favourites = await response.json();
    let res;
    if (num !== "favourites") {
      res = favourites.filter((item) => item.value === num);
    } else {
      res = favourites;
    }
    setFilter(res);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <div className="app__left">
            <div className="logo">
              <Logo />
            </div>

            <Description />
            <Category />
          </div>
          <div className="app__right">
            <Outlet />
          </div>
        </>
      ),
      children: [
        {
          path: "/voting",
          index: true,
          element: (
            <>
              <SearchPanel getCatAll={getCatAll} arrLike={arrLike} />
              <div className="rightContent">
                <Section prevCat={prevCat} getCat={getCat} />
                <Cat
                  loading={loading}
                  getUserd={getUserd}
                  catImg={catImg}
                  arrLike={arrLike}
                />

                <Votinghistory arrLike={arrLike} getUser={char} />
              </div>
            </>
          ),
        },
        {
          path: "/breeds",
          element: (
            <>
              <SearchPanel getCatAll={getCatAll} arrLike={arrLike} />
              <div className="rightContent">
                <Filter
                  val={val}
                  catallImg={catallImg}
                  getCatAll={getCatAll}
                  prevCatAll={prevCatAll}
                  itemDesc={itemDesc}
                />
                <div className="images">
                  <Image itemDesc={itemDesc} catallImg={catallImg} />
                </div>
              </div>
            </>
          ),
          children: [],
        },
        {
          path: "/type",
          element: (
            <>
              <Descriptions arrLike={arrLike} itemDescs={itemDescs} />
            </>
          ),
        },

        {
          path: "/filter/:id",
          element: (
            <>
              <SearchPanel getCatAll={getCatAll} arrLike={arrLike} />
              <Filt filt={filter} />
            </>
          ),
        },
        {
          path: "/gallery",
          element: (
            <>
              <Gallery
                updateGallery={updateGallery}
                gallery={gallery}
                arrLike={arrLike}
              />
            </>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default Render;

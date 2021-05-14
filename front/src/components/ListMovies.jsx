import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorite,
  removeToFavorite,
  allFavoritesUser,
} from "../state/favorites";

export default ({ movie }) => {
  const user = useSelector((state) => state.users.control.id);
  const favorite = useSelector((state) => state.favorites.all);

  const dispatch = useDispatch();

  const userId = useSelector((state) => state.users.control.id);

  useEffect(() => {
    dispatch(allFavoritesUser(userId));
  }, []);
  const handleClick = (e) => {
    const mov = movie.Title;

    dispatch(addToFavorite({ mov, userId }));
  };
  const handleDelete = (e) => {
    const mov = movie.Title;

    // console.log(userId, "useeeeeeeeeeeeeeeeee");

    return (
      dispatch(removeToFavorite({ mov, userId })) &&
      dispatch(allFavoritesUser(userId))
    );
  };
  const prueba = () => {
    const now = favorite.forEach((e) => {
      console.log(e, "eeeeeeeeeeeeeeeee", movie.Title);
      if (e.movie === movie.Title) return true;
      else return false;
    });
    return now;
  };
  console.log(prueba(), "pruebaaaaaaaaaaaaaaa");
  // const filtrado = () => {
  //   const f = favorite.filter((e) => e.movie === movie.Title);
  //   return f.length ? true : false;
  // };

  return (
    <div className="col-md-4 card ">
      <div className="card-body ">
        <Link to={`/peliculas/${movie.imdbID}`}>
          {/* le paso el id en el App.js el match con el id al componente que renderizo */}
          <h2> {movie.Title}</h2>
          <img
            className="rounded 
                mx-auto d-block"
            src={movie.Poster}
            alt=""
          />
        </Link>
        <h2>{movie.Year}</h2>
        <h2>{movie.Type}</h2>
      </div>
      {/* {favorite.map((m) => */}
      {/* m.movie === movie.Title ? ( */}
      {/* <button
        onClick={handleDelete}
        value={movie.Title}
        type="button"
        class="btn btn-outline-success"
      >
        Quitar de favoritos
      </button> */}
      {/* ) : ( */}
      <button
        onClick={handleClick}
        value={movie.Title}
        type="button"
        class="btn btn-outline-success"
      >
        Añadir a Favoritos
      </button>
    </div>
  );
};
{
}

import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { setMovie } from "../state/movies";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const SingleMovie = ({ matchId }) => {
  console.log(matchId);
  const [movieSelect, setMovieSelect] = useState([]);

  useEffect(() => {
    axios
      .get(`http://www.omdbapi.com/?i=${matchId}&apikey=6161af3c`)
      .then((movie) => {
        return setMovieSelect(movie.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Link to="/peliculas">
            <h4>Volver a todas</h4>
          </Link>
          <img
            src={movieSelect.Poster}
            alt={movieSelect.Title}
            style={{ width: 390, height: 600 }}
          />
        </div>
        <div className="col" style={{ width: 350 }}>
          <h1>Titulo: {movieSelect.Title}</h1>
          <h3>Año :{movieSelect.Year}</h3>
          <h3>Director: {movieSelect.Director}</h3>
          <h3>Genero : {movieSelect.Genre}</h3>
          <h3>Actores : {movieSelect.Writer}</h3>
          <h3>Pais :{movieSelect.Country}</h3>
          <h3>Productores :{movieSelect.Production}</h3>
          <h3> Tipo: {movieSelect.Type}</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleMovie;

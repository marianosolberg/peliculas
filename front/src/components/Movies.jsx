import React, { Component, Fragment, useState, useEffect } from "react";
import axios from "axios";
import ListMovies from "./ListMovies";
import { setMovie } from "../state/movies";
import { useDispatch, useSelector } from "react-redux";

const Movies = () => {
  const API = "http://www.omdbapi.com/?i=tt3896198&apikey=6161af3c";

  //const [cargando, setCargando] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const movies = useSelector((state) => state.movies);
  //me traigo las peliculas guardadas en la linea 22 para mapearlas en la linea 73
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API}&s=cars`)
      .then((res) => res.data.Search)
      .then((peliculas) => {
        dispatch(setMovie(peliculas));
        //guardo en el estado de redux para luego mapearlas.
      });
  }, []);

  const handleChange = (e) => {
    console.log(e.target.value);
    const key = e.target.name;
    const value = e.target.value;
    setSearch(value);
    //setetamos el estado de busqueda con el value del input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      //si el usuario toca enter sin escribir nada en el input
      return setError("ingrese un nombre valido");
    }

    axios
      .get(`${API}&s=${search}`)
      .then((res) => res.data.Search)
      .then((peliculas) => {
        if (!peliculas) {
          // si no hay peliculas y no lo atajamos con el if va a romper el map
          return setError("no existe peliculas con ese nombre");
        }
        dispatch(setMovie(peliculas));
        setError(""); // borramos el error
        setSearch(""); //seteamos el search a un "" vacio
      });
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-md-4 offset-md-4 p-4">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="form-control"
              placeholder="Busqueda"
              onChange={handleChange}
              autoFocus
              value={search}
            />
          </form>
          <p className="text-white"> {error ? error : ""}</p>
        </div>
      </div>
      <div className="row">
        {movies.map((peli, i) => {
          return <ListMovies movie={peli} key={i} />;
        })}
      </div>
      //{" "}
    </Fragment>
  );
};

export default Movies;

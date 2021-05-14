import React, { useEffect } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { controlLogin } from "./state/user";
import { useDispatch } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import SingleMovie from "./components/SingleMovie";
import AllMoviesUser from "./components/AllMoviesUser";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(controlLogin());
  }, []);
  return (
    <div>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/peliculas" component={Movies} />
        <Route exact path="/movies_user" component={AllMoviesUser} />

        <Route
          exact
          path="/peliculas/:id"
          render={({ match }) => <SingleMovie matchId={match.params.id} />}
        />
      </Switch>
    </div>
  );
}

export default App;

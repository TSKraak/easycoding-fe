import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { selectAppLoading } from "./store/appState/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserWithStoredToken } from "./store/user/actions";

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      {isLoading ? <Loading /> : null}
      <MessageBox />

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        {/* <Route exact path="/posts/:language?">
<PostsPage />
</Route> */}
        <Route path="/" component={NotFound} />
      </Switch>
    </div>
  );
}
export default App;

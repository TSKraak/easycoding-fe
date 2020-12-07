import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import RequestPage from "./pages/RequestPage";
import FavouritePage from "./pages/FavouritePage";
import ManageUsersPage from "./pages/ManageUsersPage";
import ProfilePage from "./pages/ProfilePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { selectAppLoading } from "./store/appState/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserWithStoredToken } from "./store/user/actions";
import Footer from "./components/Footer";

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
      <div className="App-Content">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/posts">
            <PostPage />
          </Route>

          <Route exact path="/posts/:language?">
            <PostPage />
          </Route>

          <Route exact path="/requests">
            <RequestPage />
          </Route>

          <Route exact path="/favourites">
            <FavouritePage />
          </Route>

          <Route exact path="/admin/manage-users">
            <ManageUsersPage />
          </Route>

          <Route exact path="/profile">
            <ProfilePage />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/signup">
            <SignUp />
          </Route>

          <Route path="/" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}
export default App;

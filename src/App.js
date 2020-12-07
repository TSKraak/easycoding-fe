import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const NotFound = () => {
  return <h3>Oops, sorry. Page doesn't exist.</h3>;
};

function App() {
  return (
    <div className="App">
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

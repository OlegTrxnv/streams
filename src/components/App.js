import React from "react";
import { Router, Route } from "react-router-dom";
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:streamId" exact component={StreamEdit} />
          <Route path="/streams/delete" exact component={StreamDelete} />
          <Route path="/streams/show" exact component={StreamShow} />
        </div>
      </Router>
    </div>
  );
};

export default App;


// Generic Router with custom history object leveraged here instead of BrowserRouter (to make programmatic navigation possible from non-components as well)
// Besides BrowserRouter there are HashRouter and MemoryRouter
// HashRouter uses everything after # in path to be able to deal with servers that return 404 on unknown paths,
// and React always responds with index.html
// MemoryRouter does not use URL to track navigation

// exact in Route is to avoid paths containing one another (React is able to render different routes on same screen)
// With React-Router, each component needs to be designed to work in isolation (fetch its own data and don't rely on other components)
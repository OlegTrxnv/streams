import { createBrowserHistory } from "history";
export default createBrowserHistory();

// Internally BrowserRouter creates history object
// History object:
//    tracks address bar (and is able to change it)
//    communicates back to BrowserRouter
//    is provided to every React component directly rendered by BrowserRouter (we can easily trigger navigation this way)
// Obviously, making programmatic navigation from non-component requires painful passing around of history object
// Instead use generic Router and wire up this custom history object. Import it and leverage programmatic navigation where ever needed

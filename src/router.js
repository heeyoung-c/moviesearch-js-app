// template
const homeTemplate = require('./pages/Home.hbs')
const movieTemplate = require('./pages/Movie.hbs')
const notFoundTemplate = require('./pages/NotFound.hbs')

const Home = homeTemplate()
const Movie = movieTemplate()
const NotFound = notFoundTemplate()

const routes = {
  '/': Home,
  '/movie': Movie,
  '/notfount': NotFound,
}

// entry point
const initialRoutes = (el) => {
  renderHTML(el, routes["/"]);

  window.onpopstate = () =>
    renderHTML(el, routes[window.location.pathname]);
};

// set browser history
const historyRouterPush = (pathName, el) => {
  window.history.pushState({}, pathName, window.location.origin + pathName);
  renderHTML(el, routes[pathName]);
};

// render
const renderHTML = (el, route) => {
  el.innerHTML = route;
};

module.exports = {
  initialRoutes,
  historyRouterPush,
};
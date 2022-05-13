// scss
import "./scss/main.scss";

// js
const { test } = require("./js/search")
test()
// router
const {
  initialRoutes,
  historyRouterPush,
} = require('./router')

// app division
const contentDiv = document.querySelector('#app')

// Browser History
initialRoutes(contentDiv)

window.onload = () => {
  const historyLinker = document.querySelectorAll('span.history')

  historyLinker.forEach(el => {
    el.addEventListener('click', event => {
      const pathName = event.target.getAttribute('route')

      historyRouterPush(pathName, contentDiv)
    })
  })
}
const reload = () => {
  document.querySelector('header span').addEventListener('click', () => {
    location.reload()
  })
}

export default reload
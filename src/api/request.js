const create = new Promise((resolve) => {
  setTimeout(() => {
    resolve(200)
  }, 500)
})

export { create }

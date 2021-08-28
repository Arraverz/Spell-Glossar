export default (context, inject) => {
  const allTrue = (obj) => {
    for (const o in obj) if (!obj[o]) return false

    return true
  }

  inject('allTrue', allTrue)
}

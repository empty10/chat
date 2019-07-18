export const debounce = function (fun, wait) {
  let timeout = null
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(fun, wait)
  }
}

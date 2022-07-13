import { trimSpace } from "../utils/tools"

export default ($) => {
  const $headerSearch = $('.J_headerSearch')
  const $searchInput = $headerSearch.children('input')
  const $searchBtn = $searchInput.children('button')

  const init = () => {
    bindEvent()
  }

  const bindEvent = () => {
    $searchBtn.on('click', onSearchAction)
  }

  const onSearchAction = () => {
    const val = trimSpace($searchInput.val())

    if (val.length === 0) {
      return
    }

    window.open('/list/' + val)
  }

  return {
    init
  }
}
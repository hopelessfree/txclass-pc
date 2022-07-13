function searchData(data, keyword) {
  if (keyword === '' || keyword === undefined) {
    return data
  }

  return data.filter((item) => {
    return item.courseName.toLowerCase().includes(keyword.toLowerCase())
  })
}

module.exports = {
  searchData
}

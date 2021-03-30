// 处理题目，展示题目
function setSubject (content) {
  let list = []
  if (localStorage.getItem('subjectList')) {
    list = [...JSON.parse(localStorage.getItem('subjectList'))]
  }
  list.push(content)
  localStorage.removeItem('subjectList')
  localStorage.setItem('subjectList', JSON.stringify(list))
  return list
}

function getSubject () {
  let list = []
  list = localStorage.getItem('subjectList') && [...JSON.parse(localStorage.getItem('subjectList'))]
  return list || []
}

export { setSubject, getSubject }

const members = [
  {id: 1, name: 'Trung'},
  {id: 2, name: 'Dung'},
  {id: 3, name: 'Luc'},
  {id: 4, name: 'Son'},  // sửa ifd thành id
  {id: 5, name: 'Giang'},
  {id: 7, name: 'Hoc'},
  {id: 8, name: 'Dat'},
  {id: 9, name: 'Huy'},
  {id: 10, name: 'Vuong'},
]

let filteredMembers = [...members]
let curInput = 0

const inputEs = document.querySelectorAll('input')
const e = inputEs[1] // input name
const listElement = document.querySelector('.dropdown')
let cursor = null;

e.addEventListener('focus', () => {
  if (e.value.trim() === '') {
    filteredMembers = [...members]
    onRender()
    listElement.style.display = 'block'
    cursor = null
  }
})

e.addEventListener('input', () => {
  filteredMembers = members.filter(member => member.name.toLowerCase().includes(e.value.toLowerCase()))
  if (filteredMembers.length > 0) {
    onRender()
    listElement.style.display = 'block'
  } else {
    listElement.style.display = 'none'
  }
  cursor = null
})


const onRender = () => {
  listElement.innerHTML = ''
  filteredMembers.forEach(member => {
    listElement.innerHTML += `<div class="item">${member.name}</div>`
  })

  // Gán lại sự kiện click cho từng item sau khi render
  const itemElements = Array.from(document.getElementsByClassName('item'))
  itemElements.forEach((item, index) => {
    item.onclick = () => {
      e.value = item.textContent
      listElement.style.display = 'none'  // ẩn dropdown sau khi chọn
      cursor = index
    }
  })
}

e.addEventListener('input', () => {
  filteredMembers = members.filter(member => member.name.toLowerCase().includes(e.value.toLowerCase()))
  if (filteredMembers.length > 0) {
    onRender()
    listElement.style.display = 'block'
  } else {
    listElement.style.display = 'none'
  }
  cursor = null
})

const onInput = (event) => {
  event.preventDefault()
  const itemElements = Array.from(document.getElementsByClassName('item'))
  if (cursor !== null && itemElements[cursor]) {
    e.value = itemElements[cursor].textContent
    listElement.style.display = 'none'
  }
  curInput++
  if (curInput < inputEs.length) {
    inputEs[curInput].focus()
  }
}

e.addEventListener('keydown', (event) => {
  if (![40, 38, 13].includes(event.keyCode)) return

  const itemElements = Array.from(document.getElementsByClassName('item'))

  if (cursor === null) cursor = 0
  else if (event.keyCode === 40) cursor++
  else if (event.keyCode === 38) cursor--

  if (cursor < 0) cursor = filteredMembers.length - 1
  if (cursor >= filteredMembers.length) cursor = 0

  itemElements.forEach((itemElement, index) => {
    if (index === cursor) itemElement.classList.add('highlight')
    else itemElement.classList.remove('highlight')
  })

  if (event.keyCode === 13) onInput(event)
})

inputEs.forEach((inputE, index) => {
  inputE.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      onInput(event)
    }
  })
  inputE.addEventListener('focus', () => {
    curInput = index
  })
})

// Khởi tạo render lần đầu
onRender()
listElement.style.display = 'none'

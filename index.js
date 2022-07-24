const STUDENTS_URL = 'https://my-json-server.typicode.com/paraplancrm/api/students';
const STATUSES_URL = 'https://my-json-server.typicode.com/paraplancrm/api/statuses';

initApp()

async function initApp() {
    const [students, statuses] = await fetchStudentsAndStatuses()
    const studentsWithStatuses = students.map(student => {
        return {
            name: student.name,
            statusInfo: statuses.find(status => status.id === student.status)
        }
    })

    console.log(studentsWithStatuses[0].statusInfo.active)
    const activeStudents = studentsWithStatuses
        .filter(student => student.statusInfo.active)
        .sort(sortArray)

    const noActiveStudents = studentsWithStatuses
        .filter(student => !student.statusInfo.active)
        .sort(sortArray)

    createListStudents(activeStudents)
    createListStudents(noActiveStudents)
    changeColorText ('.list-text', 'red')
    createStyleCssArray()
    

}

function fetchJson(url) {
    return fetch(url).then(response => response.json())
}

function fetchStudents() {
    return fetchJson(STUDENTS_URL)
}

function fetchStatuses() {
    return fetchJson(STATUSES_URL)
}

function fetchStudentsAndStatuses() {
    return Promise.all([fetchStudents(), fetchStatuses()])
}

function sortArray(a, b) {
    if (a.statusInfo.order > b.statusInfo.order) return 1;
    if (a.statusInfo.order < b.statusInfo.order) return -1;
    if (a.name > b.name) return 1;
    if (a.name < b.name) return -1;
    return 0;
}

const container = document.querySelector('.container')
function createListStudents(arr) {
    const userBox = document.createElement('div')
    userBox.className = 'userBox'
    userBox.innerHTML = `active: ${arr[0].statusInfo.active}`
    for (i = 0; i < arr.length; i++) {
        const list = document.createElement('li')
        list.className = 'list-text'
        list.innerHTML = `name: ${arr[i].name} status: ${arr[i].statusInfo.name}`
        userBox.append(list)
        container.append(userBox)
    }

}

function createStyleCssArray() {
    const styleClassNameContainer = document.querySelector('.userBox')
    styleClassNameContainer.style.paddingRight = '30px'

    const styleClassNameUserBox = document.querySelector('.container')
    styleClassNameUserBox.style.cssText = `display: flex; jusify-content: center;`
}

function changeColorText(className, color) {
    const elems = document.querySelectorAll(className)
    for (i = 0; i < elems.length; i++) {
        elems[i].style.color = color;
    }
}
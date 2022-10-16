'use strict'
const noList=document.querySelector('.noTodosTitle')
function onInit() {
    renderTodos()
}
function renderTodos() {
    const todos = getTodosForDisplay()
    const strHTMLs = todos.map(todo => `
        <li class="${(todo.isDone) ? 'done' : `${todo.importance}`} note " onclick="onToggleTodo('${todo.id}')">
            ${todo.txt}
            <button class="delete-icon"onclick="onRemoveTodo(event,'${todo.id}')" >X</button>
            <div class="timeStamp">Created:${todo.createdAt}</div>
        </li>
    `)
    document.querySelector('ul').innerHTML = strHTMLs.join('')
    document.querySelector('span.total').innerText = getTotalCount()
    document.querySelector('span.active').innerText = getActiveCount()
}
function onRemoveTodo(ev, todoId) {
    ev.stopPropagation()
    var response=confirm("Are You Sure You Want To delete This Important Pice Of History?")
   if(response){removeTodo(todoId)
                renderTodos()
                
   }
   else{alert("Thank You For Reconsidering")}
}
function onToggleTodo(todoId) {
    toggleTodo(todoId)
    if (getDoneCount()<2 || getActiveCount()<2) { onAddTitle("", gFilterBy.status) }
    renderTodos() 
}
function onAddTodo(ev) {
    ev.preventDefault()
    const elTxt = document.querySelector('[name=txt]')
    const txt = elTxt.value
    if (txt) { addTodo(txt)
               renderTodos()
               elTxt.value = ''
    } 
}
function onSetFilter(filterBy) {
    setFilter(filterBy)
    renderTodos()
}
function onSetFilterByTxt(txt) {
    setFilterByTxt(txt)
    renderTodos()
}
function onSortSelection(sortBy) {
    setSort(sortBy)
    renderTodos()
}
function onAddTitle(todos, filterBy) {
    if (filterBy && gTodos.length) {
        var filter = filterBy[0].toUpperCase() + filterBy.substring(1)
        if (getDoneCount() === 0 && filterBy === 'done'||getActiveCount() === 0 && filterBy === 'active') {
            noList.innerText = `No ${filter} Todos`
        }
        if (getDoneCount() && filterBy === 'done'||getActiveCount() && filterBy === 'active') {
            noList.innerText = ""
        }
    }
    if (!filterBy && gTodos.length === 0) {
        noList.innerText = "No Todos'"
    } 
}
function onRemoveTitle() {
    noList.innerText = ""
}

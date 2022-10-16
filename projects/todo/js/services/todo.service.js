'use strict'
var gImportance ='highImportance'
const STORAGE_KEY = 'todoDB'
var gFilterBy = {
    txt: '',
    status: ''
}
var gTodos
_createTodos()
function getTodosForDisplay() {
    var todos = gTodos

    if (gFilterBy.status) {
        todos = todos.filter(todo =>
            (todo.isDone && gFilterBy.status === 'done') ||
            (!todo.isDone && gFilterBy.status === 'active')
        )
    }
    todos = todos.filter(todo => todo.txt.toLowerCase().includes(gFilterBy.txt.toLowerCase()))
    return todos
}
function removeTodo(todoId) {
    const todoIdx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(todoIdx, 1)
    _saveTodosToStorage()
    if(gTodos.length===0){onAddTitle(gTodos),console.log('activated')}
}
function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}
function addTodo(txt) {
    const todo = _createTodo(txt)
    gTodos.push(todo)
    _saveTodosToStorage()
    if(gTodos.length===1){onRemoveTitle()}
}
function setFilter(status) {
    
    gFilterBy.status = status
    if (status) { onAddTitle(gTodos, status) }
    if(!status&&gTodos.length>0){onRemoveTitle()}
}
function setFilterByTxt(txt) {
    gFilterBy.txt = txt  
}
function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    var count = gTodos.filter(todo => !todo.isDone).length
    return count
}
function getDoneCount() {
    var count = gTodos.filter(todo => todo.isDone).length
    return count
}
function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY)
    if (!todos || !todos.length) {
        todos = [
            {
                id: 't101',
                txt: 'Learn HTML',
                isDone: true,
                createdAt: createTimestamp(),
                importance : gImportance,
            },
            {
                id: 't102',
                txt: 'Master JS',
                isDone: false,
                createdAt: createTimestamp(),
                importance : gImportance,
            },
            {
                id: 't103',
                txt: 'Study CSS',
                isDone: false,
                createdAt: createTimestamp(),
                importance : gImportance,
            },
        ]
    }
    gTodos = todos
    _saveTodosToStorage()
}
function _createTodo(txt) {
    const todo = {
        id: _makeId(),
        txt,
        isDone: false,
        createdAt: createTimestamp(),
        importance : gImportance,
    }
    return todo
}
function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos)
}
function _makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return txt;
}
function createTimestamp() {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    today.toUTCString()
    return today
}
function importanceValue(importance) {
   gImportance=importance
    return gImportance
}
function setSort(sortType) {
    if (sortType === 'txt') {gTodos.sort((a,b) =>(a.txt>b.txt)?1:((b.txt>a.txt)?-1:0))}
    if (sortType === 'createdAt') {gTodos.sort((a,b)=>(Date.parse(a.createdAt)>Date.parse(b.createdAt))?1:((Date.parse(b.createdAt)>Date.parse(a.createdAt))?-1:0))}
    if (sortType === 'importance') {gTodos.sort((a,b) => (a.importance>b.importance) ? 1 : ((b.importance > a.importance) ? -1 : 0))}
}

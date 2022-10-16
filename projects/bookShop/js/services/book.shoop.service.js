'use strict'
const STORAGE_KEY = 'bookDB'
const VIEW_TYPE_KEY = 'viewStyle'
const QUERY_STRING_PARAMS_KEY = 'queryStringParams'
var gPageIdx = 0
var gBooks
const gNames = ['Da Vinci Code,The', 'Harry Potter and the Deathly Hallows', 'Harry Potter and the Philosopher\'s Stone', 'Harry Potter and the Order of the Phoenix', 'Fifty Shades of Grey','Harry Potter and the Goblet of Fire','Harry Potter and the Chamber of Secrets','Harry Potter and the Prisoner of Azkaban','Angels and Demons','Twilight','Lost Symbol,The','New Moon','Deception Point','Eclipse','Lovely Bones,The','Digital Fortress','Short History of Nearly Everything,A','Breaking Dawn','Kite Runner,The']
const PAGE_SIZE = 6
_createBooks()
var gFilterBy = { txt: '', maxPrice: 0, minRate: 0}
function getBooks() {
      // Filtering:
    var books = gBooks.filter(
        book =>book.name.toLowerCase().includes(gFilterBy.txt) &&
            book.price <= gFilterBy.maxPrice &&
            book.rate >= +gFilterBy.minRate)
   const startIdx = gPageIdx * PAGE_SIZE
    books = books.slice(startIdx, startIdx + PAGE_SIZE)
    return books
}
function deleteBook(bookId) {
 const bookIdx = gBooks.findIndex(book => bookId === book.id)
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage()   
}
 function addBook(newBookName,newBookPrice){
     const book = _createBook(newBookName,newBookPrice)
    gBooks.unshift(book)
    _saveBooksToStorage()
    return book
 }
function getBookById(bookId) {
     const book = gBooks.find(book => bookId === book.id)
    return book
}
function updateBook(bookId, newPrice) {
    const book = gBooks.find(book => book.id === bookId)
    book.price=newPrice
    _saveBooksToStorage()
    return book
}
function getNames() {
    return gNames
}
function _createBook(newBookName, newBookPrice) {
    var newBook
    if (newBookName && !newBookPrice) {
        newBook = {
            id: makeId(),
            name: newBookName,
            price: +getRandomIntInclusivePrice(0.01, 100.00),
            imgNumber: getRandomIntInclusive(1, 19),
            rate: 0
        }
    }
    if (!newBookName && newBookPrice) {
        newBook = {
            id: makeId(),
            name: gNames[getRandomIntInclusive(0, gNames.length - 1)],
            price: +newBookPrice,
            imgNumber: getRandomIntInclusive(1, 19),
            rate: 0
        }
    }
    if (newBookName && newBookPrice) {
        newBook = {
            id: makeId(),
            name: newBookName,
            price: newBookPrice,
            imgNumber: getRandomIntInclusive(1, 19),
            rate:0
        }
           
    } return newBook
}
function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < 30; i++) {
            var name = gNames[getRandomIntInclusive(0, gNames.length - 1)]
            books.push(_createBook(name))
        }
    }
    gBooks = books
    _saveBooksToStorage()
}
function _saveBooksToStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
}
function pageChange(action) {
    gPageIdx = gPageIdx + +action
    if (gPageIdx === Math.ceil(gBooks.length/PAGE_SIZE)-1) {
        return 'nextPgBtn'
    }
    if (gPageIdx === 0) {
        return 'previousPgBtn'
    }
}
function setBookFilter(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
    if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
    return gFilterBy
}
function setBookSort(sortBy = {}) {
    if (sortBy.price !== undefined) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.price)
    } else if (sortBy.name !== undefined) {
        gBooks.sort((b1, b2) => b1.name.localeCompare(b2.name) * sortBy.name)
    }
}
function renderView() {
    var viewStyle
    if (!loadFromStorage(VIEW_TYPE_KEY)) { viewStyle = 'table' }
    else{viewStyle=loadFromStorage(VIEW_TYPE_KEY)}
    return viewStyle
}
function setViewStyle(viewType) {
    saveToStorage(VIEW_TYPE_KEY, viewType)
}
function updateRateToStorage() {
    _saveBooksToStorage()
}
function resetFilter() {
    gFilterBy = { txt: '', maxPrice: getMaxMinPrice('max'), minRate: 0 }
    return gFilterBy
}
function getFilterValue(valueField) {
    var fieldUpdate
    if (valueField === 'price') { fieldUpdate= gFilterBy.maxPrice }
    if (valueField === 'rate') { fieldUpdate = gFilterBy.minRate }
    return fieldUpdate
}
function getMaxMinPrice(maxMin) {
    const prices = gBooks.map(book => book.price)
    if (maxMin === "max") {
        var max = Math.max(...prices)
        gFilterBy.maxPrice = max
        return max
    }
    if(maxMin==="min")return Math.min(...prices)
}
function saveQueryStringParamsToStorage(queryString) {
    saveToStorage(QUERY_STRING_PARAMS_KEY,queryString)
}
function loadQueryStringParamsFromStorage() {
    var queryStringParams = loadFromStorage(QUERY_STRING_PARAMS_KEY)
    return queryStringParams
}


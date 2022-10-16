'use strict'
var gCardsVsTable 
var gIsDesc=-1
var gModalId=""
function onInit() {
    setQueryParamsFromStorage()
    gCardsVsTable = renderView()
    renderMinMax()
    renderBooks()
    renderFilterByQueryStringParams() 
}
function setQueryParamsFromStorage() {
    var queryStringParams = loadQueryStringParamsFromStorage()
    if(!queryStringParams){return}
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
}
function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    console.log(queryStringParams.get('txt'))
    const filterBy = {
        txt: queryStringParams.get('txt')||'',
        maxPrice: queryStringParams.get('maxPrice') || 0,
        minRate: queryStringParams.get('minRate') || 0,
        modal: queryStringParams.get('modal') || 0,
    }
    console.log(filterBy)
     if (filterBy.modal) { onReadBook(filterBy.modal)}
    if (!filterBy.minRate && !filterBy.txt && !filterBy.maxPrice) return
    onSetFilterBy({txt: filterBy.txt,maxPrice:filterBy.maxPrice,minRate:filterBy.minRate})
    document.querySelector('.textFilterInput').value = filterBy.txt
    onSearchTxtSubmit()
    document.querySelector('.filterPriceRange').value = filterBy.maxPrice
    document.querySelector('.filterRateRange').value = filterBy.minRate
}
function renderBooks() {
    var books = getBooks()
    if (gCardsVsTable === 'cards') {
        var starterString = `<section class="booksContainerCards">`
        var endOfString = `</section>`
        var strHtmls = books.map(book => `
        <article class="book-preview">
            <button class="btn-remove" onclick="onDeleteBook('${book.id}')">Delete</button>
            <h2 class"bookName">${book.name}</h2>
            <h5 class"bookPriceLine>Spacial Wizard Price: <span>${book.price}</span> Sickle</h5>
            <button class="detailsBookBtn"onclick="onReadBook('${book.id}')">Details</button>
            <button class="updateBookBtn"onclick="onUpdateBook('${book.id}')">Update</button>
            <img class="bookImgSizing" onerror="this.src='img/19.png'" src="img/${book.imgNumber}.png" alt="Book Name ${book.name}">
        </article> 
        `
        )
        document.querySelector('.bookInfoContainer').innerHTML =starterString + strHtmls.join('') + endOfString
    }
    if (gCardsVsTable === 'table') {
        var starterString = `
        <section class="booksContainerTable">
        <table class="tableSize">
            <thead>
                <tr>
            <th>Id</th>
		    <th class="clickable" onClick="onSetSortBy('name')">&#8595 Title &#8593</th>
		    <th class="clickable" onClick="onSetSortBy('price')">&#8595 Price &#8593</th>
		    <th>Actions</th>
        </tr>
            </thead>
                <tbody class="tableContent">`
       var endString=`</tbody>
        </table> 
        </section>`
        var strHtmls = books.map(book => `
        
         <tr class="bookTablePreview">
            <td class="tableBookId"><h2 class"bookNameTable>${book.id}</h2></td>
            <td class="tableBookName"><h2 class"bookNameTable>${book.name}</h2></td>
            <td class="tableBookPrice"><h5 class"bookPriceLineTable><span>${book.price}</span></h5></td>
            <td class="tableActions" width="30%"><button class="detailsBookBtnTable"onclick="onReadBook('${book.id}')">Details</button>
                <button class="updateBookBtnTable"onclick="onUpdateBook('${book.id}')">Update</button> 
                <button class="btnRemoveTable" onclick="onDeleteBook('${book.id}')">Delete</button></td>
         </tr>
         
         `
         )
        document.querySelector('.bookInfoContainer').innerHTML =starterString + strHtmls.join('') + endString
    }
}
function onDeleteBook(bookId){
    const book = getBookById(bookId)
    deleteBook(bookId)
    renderBooks()
    flashMsg(`The Book ${book.name} Was Deleted`)
}
function onAddBook() {
    var newBookName = prompt('Please enter the Book Name you want to add', 'The Bible')
    var newBookPrice = prompt('Please enter the Book Price', '25')
    if (newBookName||newBookPrice) {
        const book = addBook(newBookName,newBookPrice)
        renderBooks()
        flashMsg(`Book Added (Id: ${book.id} Name: ${book.name})`)
    }
    renderMinMax()
}
function onUpdateBook(bookId){
    const book = getBookById(bookId)
    var newPrice = prompt('Price?', book.price)
    if (newPrice&&book.price !== newPrice) {
        const book = updateBook(bookId, newPrice)
        renderBooks()
        flashMsg(`Price of ${getBookById(bookId).name} updated to: ${getBookById(bookId).price}`)
    }
    renderMinMax()
}
function onCloseModal(){
    document.querySelector('.modal').classList.remove('open')
    gModalId = "" 
    var filterBy = setBookFilter()
    filterBy.modalId=gModalId
    renderQueryParams(filterBy)
}
function onSetFilterBy(filterBy) {

    filterBy = setBookFilter(filterBy)
    document.querySelector('.maxPriceValue').innerText = getFilterValue('price')
    document.querySelector('.rateValue').innerText=getFilterValue('rate')
    renderBooks()
    renderQueryParams(filterBy)

}
function onResetFilter() {
    renderMinMax()
    var resetValue = resetFilter()
    document.querySelector('.filterRateRange').value = resetValue.minRate
    renderBooks()
    flashMsg(`Filter Cleared`)
    renderQueryParams(resetValue)
}
function flashMsg(msg){
    const el = document.querySelector('.user-msg')
    el.innerText = msg
    el.classList.add('open')
    setTimeout(() => {
        el.classList.remove('open')
    }, 3000)
}
function onSetSortBy(prop) {
    gIsDesc=gIsDesc*-1
    const sortBy = {
        [prop]: (gIsDesc)
    }
    
    setBookSort(sortBy)
    renderBooks()
}
function onPaging(action){
    var disableBtn = pageChange(action)
    
    if (!disableBtn) {
        document.querySelector(".nextPgBtn").classList.remove("disableBtn")
        document.querySelector(".previousPgBtn").classList.remove("disableBtn")
    }
    if (disableBtn === "previousPgBtn") (document.querySelector(".previousPgBtn").classList.add("disableBtn"))
    if(disableBtn==="nextPgBtn")(document.querySelector(".nextPgBtn").classList.add("disableBtn"))
    renderBooks()
}
function onSetView(viewType) {
    gCardsVsTable = viewType
    setViewStyle(viewType)
    renderBooks()
}
function onReadBook(bookId) {
    gModalId = bookId 
    var book = getBookById(bookId)
    var elModal = document.querySelector('.modal')
    elModal.querySelector('h3').innerText = book.name
    elModal.querySelector('h4 span').innerText = book.price
    elModal.querySelector('p').innerText = makeLorem()
    document.querySelector('.subtractRateModal').setAttribute("onClick",`onRateUpdate('-1','${book.id}')`)
    document.querySelector('.addRateModal').setAttribute("onClick", `onRateUpdate('+1','${book.id}')`)
    document.querySelector('.bookRate').innerText = book.rate 
    elModal.classList.add('open')
    gModalId = book.id
    var filterBy = setBookFilter()
    filterBy.modalId=gModalId
    renderQueryParams(filterBy)
}
function onRateUpdate(action, bookId) {
    const book = getBookById(bookId)
    if (action === '+1' && book.rate < 10 || action === '-1' && book.rate > 0) {
        book.rate = book.rate + +action
        document.querySelector('.bookRate').innerText = book.rate
        updateRateToStorage()
        renderBooks()
    }
}
function onSearchTxtSubmit() {
    document.querySelector('.textFilterInput').value=''
}
function renderMinMax(){
    document.querySelector('.filterPriceRange').max = getMaxMinPrice('max')
    document.querySelector('.filterPriceRange').value = getMaxMinPrice('max')
    document.querySelector('.filterPriceRange').min = getMaxMinPrice('min')
    document.querySelector('.maxPriceValue').innerText = getMaxMinPrice('max')
    renderBooks()
}
function renderQueryParams(setValue) {
    const queryStringParams = `?txt=${setValue.txt}&maxPrice=${setValue.maxPrice}&minRate=${setValue.minRate}&modal=${setValue.modalId||gModalId}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    saveQueryStringParamsToStorage(queryStringParams)
}
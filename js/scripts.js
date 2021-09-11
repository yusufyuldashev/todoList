const elForm = selectElem(".todo-form")
const elInput = selectElem(".todo-input")
const elList =selectElem(".todo-list ")
const elAllIndex = selectElem(".all-count")
const elComplateIndex = selectElem(".complated-count")
const elUncomplateIndex = selectElem(".uncomplated-count")
const elTemplate = selectElem("#todo-item--template").content
let todoStorage = JSON.parse(window.localStorage.getItem('todos'))
let elArray = todoStorage || []

function template(){
    renderTodos(elArray, elList)
    window.localStorage.setItem("todos" , JSON.stringify(elArray))
}
function deleteBtn(data) {
    let dataClick =  data.target.dataset.uuid
    let findIndex = elArray.findIndex((x) => x.id == dataClick)
    elArray.splice(findIndex , 1)
    template()
}
function complateTodo(e){
    const checkedTodo = e.target.dataset.uuid
    let findComplated =  elArray.find((elem) => elem.id == checkedTodo)
    findComplated.isCompleted = !findComplated.isCompleted
    // window.localStorage.setItem('todos' , JSON.stringify(elArray))
    template()
}
function renderTodos(todoArray , element){
    let Completed = 0
    element.innerHTML = null
    todoArray.forEach((elem) =>{
        let cloneTemplate = elTemplate.cloneNode(true)
        
        
        const elTitle = selectElem(".todo-item-complete-text" , cloneTemplate)
        const elDeleteBtn = selectElem(".todo-item-delete-btn " , cloneTemplate)
        const elCheckBox = selectElem(".todo-input-complete" , cloneTemplate)
        
        // if(elem.isCompleted){
            //     console.log("ok")
            // }
            elTitle.textContent = elem.title
            elCheckBox.checked= elem.isCompleted
            elCheckBox.dataset.uuid = elem.id
            elDeleteBtn.dataset.uuid = elem.id
            
            if(elem.isCompleted){
                elTitle.classList.add("text-danger")
                elTitle.style.textDecoration  = "line-through"   
                Completed++
            }else{
                elTitle.classList.remove("changed")
            }
        elAllIndex.textContent = elArray.length 
        elComplateIndex.textContent = Completed
        elUncomplateIndex.textContent = elArray.length - Completed
        elDeleteBtn.addEventListener("click" , deleteBtn)
        elCheckBox.addEventListener("click" , complateTodo)
        element.appendChild(cloneTemplate)

    })
}
elForm.addEventListener("submit", (event) =>{
    event.preventDefault()
    const valueInput = elInput.value.trim()
    const uniqId = elArray[elArray- 1] ?elArray[elArray -1].id +1 :0 

    elArray.push({
        id:elArray.length,
        title:valueInput,
        isCompleted:false
    })
    
    // window.localStorage.setItem('todos' , JSON.stringify(elArray))
    template()
    elInput.value = null
})
renderTodos(elArray , elList)




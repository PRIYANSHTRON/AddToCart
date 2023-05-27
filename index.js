import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js'

const appSettings = {
    databaseURL: "https://addtocart-feced-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

//connecting firebase project to our project
const app = initializeApp(appSettings)

//connecting our project to firebase database
const database = getDatabase(app)


//creating reference in database
const items = ref(database, "items")
// argument 1 - name of database in which reference is to be created
// argument 2 - name of the refrence 


const input_field = document.getElementById('input-field')
const add_button = document.getElementById('add-button')

add_button.addEventListener('click', function () {
    //pushes the value in DB
    let itemName = input_field.value

    push(items, itemName)
    // argument 1 - reference
    // argument 2 - data to be pushed

    clearInputField()
})

function clearInputField() {
    input_field.value = ""
}

function appendItems(itemName) {

    // document.getElementById('list').innerHTML += `<li>${itemName}</li>`
    let newItem = document.createElement("li")

    newItem.textContent = itemName[1]
    // console.log(newItem.textContent=itemName)

    document.getElementById('list').appendChild(newItem)

    newItem.addEventListener('click', function () {
        let itemToBeDeleted = ref(database, `items/${itemName[0]}`)
        if (confirm('Item will be deleted from the list \nAre you sure ?')) {
            remove(itemToBeDeleted)
        }
    })
}

onValue(items, function (snapshot) {

    if (snapshot.exists()) {
        let fetched_Items_Array = Object.entries(snapshot.val())

        document.getElementById('list').innerHTML = ''

        for (let i = 0; i < fetched_Items_Array.length; i++) {

            appendItems(fetched_Items_Array[i])

        }
    }
    else {
        document.getElementById('list').innerHTML='No items in the Cart'
    }


})
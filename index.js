import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js'

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
    
    push(items,input_field.value)
    // argument 1 - reference
    // argument 2 - data to be pushed

    clearInputField()

    // if (itemName.length == 0)
    //     alert('error')
    // else   
        appendItems(itemName)
    

})

function clearInputField(){ 
    input_field.value=""
 }

function appendItems(itemName) {
    document.getElementById('list').innerHTML += `<li>${itemName}</li>`
}
//JavaScript script for To-Do List

//Referencing the three elements created in the HTML file.
const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

//The items variable will be defined by the items returned from local storage.
let items = getItems();

//getItems function will retrieve the values from local storage.
function getItems() {
    
    const value = localStorage.getItem("todo") || "[]";

    return JSON.parse(value);

}

function setItems(items) {

    //JSON.stringify is a method that converts a JavaScript value to a JSON string.
    const itemsJson = JSON.stringify(items);

    localStorage.setItem("todo", itemsJson);

}

function addItem() {

    //Moves new items to the top
    items.unshift({
        description: "",
        completed: false
    });

    //Saves the new item to local storage
    setItems(items);
    refreshList();

}

function updateItem(item, key, value) {
    item[key] = value;
    setItems(items);
    refreshList();
}

//Defining the function refreshList()
//When called, will sort the items alphabetically
function refreshList() {
    items.sort((a, b) => {
        if(a.completed) {
            return 1;
        }

        if (b.completed) {
            return -1;
        }

        return a.description < b.description ? -1 : 1;

    });

    ITEMS_CONTAINER.innerHTML = "";

    for (const item of items) {
        const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
        const descriptionInput = itemElement.querySelector(".item-description");
        const completedInput = itemElement.querySelector(".item-completed");

        descriptionInput.value = item.description;
        completedInput.checked = item.completed;

        descriptionInput.addEventListener('change', () => {
            updateItem(item, "description", descriptionInput.value);
        });

        completedInput.addEventListener('change', () => {
            updateItem(item, "completed", completedInput.checked);
        });

        ITEMS_CONTAINER.append(itemElement);
    }

}

//The event listener will wait for the add button to be clicked, and then call the addItem function defined above.
ADD_BUTTON.addEventListener('click', () => {
    addItem();
});

refreshList();
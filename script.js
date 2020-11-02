// checks if local storage is empty or not
function checkIfStorageEmpty(storageKey){
    let empty = false;
    let localStorageData = localStorage.getItem(storageKey);
    if(localStorageData){
        if(localStorageData === null || typeof localStorageData == "undefined" || localStorageData === ""){
            empty = true;
        }
        else{
            empty = false;
        }
    }
    else{
        empty = true;
    }
    return empty;
}


// function to update local storage after each transaction/change
function updateLocalStorage(storageKey){
    if(storageKey === "appData"){
        localStorage.setItem("appData", JSON.stringify(friends));
    }
    else if(storageKey === "categoryData"){
        localStorage.setItem("categoryData", JSON.stringify(categories));
    }
    
}

function renderRecommendations(friendObj){
    let outputHtml = "";
    let allRecs = friendObj.recList;
    // check if recommendations are empty
    if(friendObj.recCount == 0){
        let displayHtml =  `
        <div class = "col-12 col-md-6 col-lg-4">
        <div class = "rec-card"><i class="fa fa-info-circle" aria-hidden="true"></i> This friend has no recommendations...</div>
        </div>
        `;

        outputHtml += displayHtml;
    }
    else{
        for(let i = 0; i < friendObj.recCount; i++){
            let displayHtml = `
            <div class = "col-12 col-md-6 col-lg-4">
                <div class = "rec-card">${allRecs[i].title}</div>
            </div>
            `;
            outputHtml += displayHtml;
        }
    }
    return outputHtml;
}



function renderAllCategories(){
    console.log("This function works");
    let totalHtml = "";
    let allCategories = categories.categories;
    // looping through all the categories
    for(let eachCategory of allCategories){
        let htmlChunk = `
            <option>${eachCategory.name}</option>
        `;
        totalHtml += htmlChunk;
    }

    return totalHtml;
}


function renderFriends(){
    let outputHtml = "";

    // looping through friends
    for(let i = 0; i < friends.friendCount; i++){
        let selectedFriend = friends.getFriend(i);
        let friendDisplayHtml = `
        <div class = "col-12 col-md-12 col-lg-12 friend-card">
        <h3>${selectedFriend.name}'s Recommendations</h3>
        <div class = "row">
        `;
        friendDisplayHtml += renderRecommendations(selectedFriend);
        friendDisplayHtml += "</div>";

        // adding input field and buttons
        friendDisplayHtml += `
            <div class = "row">
                <div class = "col-12 col-md-6 col-lg-4">
                    <div class = "rec-card">
                    <input type="text" class = "list-input-field" id="${selectedFriend.name}_${selectedFriend.id}" placeholder="${selectedFriend.name} recommends...">
                    <div id = "${selectedFriend.id}-error-message" class="input-error-message"></div>
                    <select class="form-control category-select" id="${selectedFriend.name}_${selectedFriend.id}_select">
                        <option>Pick a category</option>
        `;

        // rendering all the categories
        friendDisplayHtml += renderAllCategories();

        friendDisplayHtml += ` </select>
        <button class = "list-button" onclick="addNewRec(${selectedFriend.id})">Add it to the list!</button>
        </div>
        </div>
        </div>`;
        friendDisplayHtml += "</div>";
        outputHtml += friendDisplayHtml;
    }
    //remove message div
    document.getElementById("message-box").style.display = "none";

    // render in html
    document.getElementById("friend-display").innerHTML = outputHtml;
}


function renderCategories(){
    let outputHtml = "";

    // looping through categories array
    for(let i = 0; i < categories.categoryCount; i++){
        let selectedCategory = categories.getCategory(i);
        let categoryDisplayHtml = `
            <div class = "col-12 col-md-4 col-lg-4">
            <div class = "category-card">
            ${selectedCategory.name}
            </div>
            </div>
        `;

        outputHtml += categoryDisplayHtml;
    }

    //remove message div
    document.getElementById("message-c-box").style.display = "none";

    // render in html
    document.getElementById("category-display").innerHTML = outputHtml;
}

function addNewCategory(cName){
    let newId = 1;
    if(categories.categoryCount == 0){
        categories.addNewCategory(newId, cName); 
    }
    else{
        let lastId = categories.categories[categories.categoryCount - 1].id;
        newId = lastId + 1;
        categories.addNewCategory(newId, cName);
    }

    // update to local storage
    updateLocalStorage("categoryData");

    // render all categories
    renderCategories();
}

function addCategoryOnClick(){
    let categoryName = document.getElementById("category-name").value;
    if(categoryName === "" || !categoryName){
        document.getElementById("category-name").style.borderColor = "#b55921";
        document.getElementById("category-input-error").style.display = "block";
        document.getElementById("category-input-error").innerHTML = "<p><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> The category name wasn't typed in</p>";
    }
    else{
        // clear the no friends added message 
        showMessageInBox("", "message-c");

        document.getElementById("category-name").style.borderColor = "#ccc";
        document.getElementById("category-input-error").style.display = "none";
        addNewCategory(categoryName);

        // clear text field
        document.getElementById("category-name").value = "";
    }
    
}


function addNewRec(friendID){
    // identify the specific friend and get the associated
    // object
    let selectedFriend = friends.getFriend(friendID - 1);

    // fetch the title text for the recommendation
    // input element id convention: name_id
    let inputElementId = `${selectedFriend.name}_${selectedFriend.id}`;
    let errorMessageId = `${selectedFriend.id}-error-message`;
    let recTitle = document.getElementById(inputElementId).value;

    // empty field validation check
    if(recTitle === "" || !recTitle){
        document.getElementById(inputElementId).style.borderColor = "#b55921";
        document.getElementById(errorMessageId).innerHTML = "<p><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> No recommendation typed in</p>";
    }
    else{
         // create a new rec object and add it to the array inside selectedFriend
        selectedFriend.addRecommendation(recTitle);

        // update to local storage
        updateLocalStorage("appData");

        // render again
        renderFriends();
    }
}

function addNewFriend(fName){
    let newId = 1;
    // check to see if friends is empty
    if(friends.friendCount == 0){
        friends.addFriend(newId, fName);
    }
    else{
    // new id will be an increment of the old id
        let lastId = friends.friendList[friends.friendCount - 1].id;
        newId = lastId + 1;
        console.log(newId);
        friends.addFriend(newId, fName);
    }

    console.log(friends);

    // update to local storage
    updateLocalStorage("appData");

    // render all friends
    renderFriends();
}

function showMessageInBox(messageString, boxSelect){
    let finalMessage = `
    <h3 class="fa fa-info-circle" aria-hidden="true"></h3>
    <p>${messageString}</p>`;
    document.getElementById(boxSelect).innerHTML = finalMessage;
}

function addFriendOnClick(){
    let friendName = document.getElementById("friend-name").value;
    if(friendName === "" || !friendName){
        document.getElementById("friend-name").style.borderColor = "#b55921";
        document.getElementById("friend-input-error").style.display = "block";
        document.getElementById("friend-input-error").innerHTML = "<p><i class='fa fa-exclamation-triangle' aria-hidden='true'></i> Your friend's name wasn't typed in</p>";
    }
    else{

        // clear the no friends added message 
        showMessageInBox("", "message");

        document.getElementById("friend-name").style.borderColor = "#ccc";
        document.getElementById("friend-input-error").style.display = "none";
        addNewFriend(friendName);

        // clear text field
        document.getElementById("friend-name").value = "";
    }   
}


function changeToFriendDisplay(){
    document.getElementById("friend-view").style.display = "block";
    document.getElementById("category-view").style.display = "none";
    
    // change button highlight
    let friendButton = document.getElementById("friend-selected").classList;
    let categoryButton = document.getElementById("category-selected").classList;
    friendButton.remove("head-button");
    friendButton.add("selected-head-button");
    categoryButton.remove("selected-head-button");
    categoryButton.add("head-button");

    

    if(checkIfStorageEmpty("appData")){
        showMessageInBox("No friends created. Add a new friend to start keeping track of all the recommendations they keep imposing on you!", "message");
    }
    else{
        // load the category array on startup as well
        let categoryData = JSON.parse(localStorage.getItem("categoryData"));
        categories.generateFromLocalStorage(categoryData);

        // fetch data from local storage and parse it
        document.getElementById("message-box").style.display = "none";
        let friendData = JSON.parse(localStorage.getItem("appData"));
        friends.generateFromLocalStorage(friendData);
        renderFriends();
    }
}


function changeToCategoryDisplay(){
    // change button highlight
    let friendButton = document.getElementById("friend-selected").classList;
    let categoryButton = document.getElementById("category-selected").classList;

    friendButton.remove("selected-head-button");
    friendButton.add("head-button");
    categoryButton.remove("head-button");
    categoryButton.add("selected-head-button");


    document.getElementById("friend-view").style.display = "none";
    document.getElementById("category-view").style.display = "block";


    if(checkIfStorageEmpty("categoryData")){
        showMessageInBox("No categories created. Add a new category to assign to recommendations.", "message-c");
    }
    else{
        // fetch data from local storage and parse it
        document.getElementById("message-c-box").style.display = "none";
        let categoryData = JSON.parse(localStorage.getItem("categoryData"));
        categories.generateFromLocalStorage(categoryData);
        console.log(categories);
        renderCategories();
    }
}


// main program starts here:

// primary FriendList object that'll be updated and stored in
// local storage
let friends = new FriendList();
let categories = new categoryList();

changeToFriendDisplay();










// checks if local storage is empty or not
function checkIfStorageEmpty(){
    let empty = false;
    let localStorageData = localStorage.getItem("appData");
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
function updateLocalStorage(){
    localStorage.setItem("appData", JSON.stringify(friends));
}

function renderRecommendations(friendObj){
    let outputHtml = "";
    let allRecs = friendObj.recList;
    for(let i = 0; i < friendObj.recCount; i++){
        let displayHtml = `
        <div class = "col-12 col-md-6 col-lg-4">
            <div class = "rec-card">${allRecs[i].title}</div>
        </div>
        `;
        outputHtml += displayHtml;
    }

    return outputHtml;
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
                    <button class = "list-button" onclick="addNewRec(${selectedFriend.id})">Add it to the list!</button>
                    </div>
                </div>
            </div>
        `;
        friendDisplayHtml += "</div>";
        outputHtml += friendDisplayHtml;
    }
    //remove message div
    document.getElementById("message-box").style.display = "none";

    // render in html
    document.getElementById("friend-display").innerHTML = outputHtml;
}

function addNewRec(friendID){
    // identify the specific friend and get the associated
    // object
    let selectedFriend = friends.getFriend(friendID - 1);

    // fetch the title text for the recommendation
    // input element id convention: name_id
    let inputElementId = `${selectedFriend.name}_${selectedFriend.id}`;
    let recTitle = document.getElementById(inputElementId).value;
    
    // create a new rec object and add it to the array inside selectedFriend
    selectedFriend.addRecommendation(recTitle);

    // update to local storage
    updateLocalStorage();

    // render again
    renderFriends();
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
    updateLocalStorage();

    // render all friends
    renderFriends();
}

function showMessageInBox(messageString){
    document.getElementById("message").innerHTML = messageString;
}

function addFriendOnClick(){
    showMessageInBox("");
    let friendName = document.getElementById("friend-name").value;
    addNewFriend(friendName);
}


// main program starts here:

// primary FriendList object that'll be updated and stored in
// local storage
let friends = new FriendList();

if(checkIfStorageEmpty()){
    showMessageInBox("No friends created. Add a new friend to start keeping track of all the recommendations they keep imposing on you!");
}
else{
    // fetch data from local storage and parse it
    document.getElementById("message-box").style.display = "none";
    let friendData = JSON.parse(localStorage.getItem("appData"));
    friends.generateFromLocalStorage(friendData);
    renderFriends();
}




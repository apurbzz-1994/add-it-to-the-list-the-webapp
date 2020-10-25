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


function renderFriends(){
    let outputHtml = "";

    // looping through friends
    for(let i = 0; i < friends.friendCount; i++){
        let friendSectionHtml = `
            <ul>
                <li>${friends.getFriend(i).id}</li>
                <li>${friends.getFriend(i).name}</li>
            </ul>
        `;

        // creating the html string one at a time
        outputHtml += friendSectionHtml;
    }

    // render in html
    document.getElementById("friend-display").innerHTML = outputHtml;

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
    document.getElementById("message-box").innerHTML = messageString;
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
    showMessageInBox("No friends created. Would you like to create one?");
}




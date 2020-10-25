// primary FriendList object that'll be updated and stored in
// local storage
let friends = new FriendList();

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
    document.getElementById("friendDisplay").innerHTML = outputHtml;

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
        friends.addFriend(newId, fName);
    }

    // update to local storage
    updateLocalStorage();

    // render all friends
    renderFriends();
}
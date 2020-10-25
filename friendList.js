class FriendList{
    constructor(){
        this._friendList = [];
    }

    // return the friendList array
    get friendList(){
        return this._friendList;
    }

    // returns the length of friendList array
    get friendCount(){
        return this._friendList.length;
    }

    addFriend(id,name){
        let aNewFriend = new Friend(id, name);
        this._friendList.push(aNewFriend);
    }

    // returns a Friend object at the index provided
    getFriend(fIndex){
        return this._friendList[fIndex];
    }
}
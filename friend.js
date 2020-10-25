class Friend{
    constructor(id){
        this._id = id;
        this._recList = [];
    }

    // return the recList array
    get recList(){
        return this._recList;
    }

    // returns the length of recList array
    get recCount(){
        return this._recList.length;
    }

    addRecommendation(title){
        let aNewRec = new Recommendation(title);
        this._recList.push(aNewRec);
    }

    // returns a recommendation object at the index provided
    getRec(recIndex){
        return this._recList[recIndex];
    }
}
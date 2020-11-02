class Friend{
    constructor(id, name){
        this._id = id;
        this._name = name;
        this._recList = [];
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }


    // return the recList array
    get recList(){
        return this._recList;
    }

    // returns the length of recList array
    get recCount(){
        return this._recList.length;
    }

    addRecommendation(title, category){
        let aNewRec = new Recommendation(title, category);
        this._recList.push(aNewRec);
    }

    // returns a recommendation object at the index provided
    getRec(recIndex){
        return this._recList[recIndex];
    }

    // dataObject: JSON Object from local storage
    generateFromLocalStorage(dataObject){
        this._id = dataObject._id;
        this._name = dataObject._name;
        let recs = dataObject._recList;
        this._recList = []; // emptying this out
        for(let i = 0; i < recs.length; i++){
            let aRec = new Recommendation();
            aRec.generateFromLocalStorage(recs[i]);
            this._recList.push(aRec);
        }
    }
}
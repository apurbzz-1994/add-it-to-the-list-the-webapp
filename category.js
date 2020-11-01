class Category{
    constructor(id, name){
        this._id = id;
        this._name = name;
        this._colorValue = "";
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    generateFromLocalStorage(dataObject){
        this._id = dataObject._id;
        this._name = dataObject._name;
        this._colorValue = dataObject._colorValue;
    }
}
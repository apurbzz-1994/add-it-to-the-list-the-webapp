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
}
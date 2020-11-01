class categoryList{
    constructor(){
        this._categories = [];
    }

    get categories(){
        return this._categories;
    }

    get categoryCount(){
        return this._categories.length;
    }

    addNewCategory(id,name){
        let aNewCategory = new Category(id, name);
        this._categories.push(aNewCategory);
    }

    getCategory(cIndex){
        return this._categories[cIndex];
    }

    generateFromLocalStorage(dataObject){
        let cList = dataObject._categories;
        this._categories = [];
        for(let i = 0; i < cList.length; i++){
            let aCategory = new Category();
            aCategory.generateFromLocalStorage(cList[i]);
            this._categories.push(aCategory);
        }
    }


}
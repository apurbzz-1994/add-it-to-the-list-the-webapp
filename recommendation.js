// Recommendation class

class Recommendation {
    constructor(title, category){
        this._title = title;
        this._description = "";
        this._likelihoodRating = 0;
        this._category = category;
        this._done = false;
        this._link = "";
    }

    // Accessor methods
    get title(){
        return this._title;
    }

    get description(){
        return this._description;
    }

    get likelihoodRating(){
        return this._likelihoodRating;
    }

    get category(){
        return this._category;
    }

    get done(){
        return this._done;
    }

    get link(){
        return this._link;
    }

    // Mutator methods
    set title(newTitle){
        this._title = newTitle;
    }

    set description(newDesc){
        this._description = newDesc;
    }

    // add an integers between 1 - 5 check here
    set likelihoodRating(newRating){
        this._likelihoodRating = newRating;
    }

    set category(newCategory){
        this._category = newCategory;
    }

    // add a boolean check here
    set done(newDone){
        this._done = newDone;
    }

    set link(newLink){
        this._link = newLink;
    }

    generateFromLocalStorage(dataObject){
        this._title = dataObject._title;
        this._description = dataObject._description;
        this._likelihoodRating = dataObject._likelihoodRating;
        this._category = dataObject._category;
        this._done = dataObject._done;
        this._link = dataObject._link;
    }
}
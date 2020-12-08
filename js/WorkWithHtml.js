export class WorkWithHtml{

    create(selector){
        return document.createElement(selector);
    }

    get(selector){
        return document.querySelector(selector);
    }

    getAll(selector){
        return document.querySelectorAll(selector);
    }

    id(id){
        return document.getElementById(id);
    }
}
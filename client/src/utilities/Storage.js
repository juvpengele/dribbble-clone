class Storage {

    constructor() {
        this.storage = window.localStorage;
    }

    set(key, value) {
        if(! typeof value !== "string") {
            value = JSON.stringify(value);
        }

        this.storage.setItem(key, value);
        return true;
    }

    get(key) {
        let element = this.storage.getItem(key);
        if(! element) {
            return null;
        }

        try {
            element = JSON.parse(element);
        } catch(error) {}

        return element;
    }

    remove(key) {
        this.storage.removeItem(key);
        return true;
    }

    clear(){
        this.storage.clear();
        return true;
    }
}

export default new Storage();
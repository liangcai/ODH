class SaveStorage {
    constructor() {
        this.version = 1;
    }

    async saveToStorage(action, params = {}, timeout = 3000) {
        console.debug('*******', action, params, timeout);
        let {Front, Back} = params.note.fields;
        chrome.storage.local.set({[Front]: Back}, function(){
            console.log('word ' + Front + 'is saved.');
            chrome.notifications.create(null, {
                type: 'basic',
                message: 'you current add word: ' + Front
            });
        });
        chrome.storage.local.get(null, function(items) {
            let allKeys = Object.keys(items);
            console.log(allKeys);
        });
        // let version = this.version;
        // let request = { action, version, params };
        // return new Promise((resolve, reject) => {
        //     // chrome.storage.sync.set({});
        //     console.debug(params);
        // });
    }

    async addNote(note) {
        console.log('savestorages');
        if (note)
            return await this.saveToStorage('addNote', { note });
        else
            return Promise.resolve(null);
    }

    async getDeckNames() {
        return await this.saveToStorage('deckNames');
    }

    async getModelNames() {
        return await this.saveToStorage('modelNames');
    }

    async getModelFieldNames(modelName) {
        return await this.saveToStorage('modelFieldNames', { modelName });
    }

    async getVersion() {
        let version = await this.saveToStorage('version', {}, 100);
        return version ? 'ver:' + version : null;
    }
}
const TextProcessFluentAPI = require('./textProcessFluentAPI');

class TextProcessorFacade{
    #textProcessorFluentAPI
    
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessFluentAPI(text)
    }

    getPeopleFromPDF() {
        return this.#textProcessorFluentAPI
                .extractPeopleData()
                .divideTextInColumns()
                .removeEmptyCaracters()
                .mapPerson()
                .build();
    }
}


module.exports = TextProcessorFacade;
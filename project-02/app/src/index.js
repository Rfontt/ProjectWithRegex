'use strict';

const pdf = require('pdf-parse');
const { readFile } = require('fs/promises');
const { join } = require('path');

const TextProcessFacade = require('./textProcessFacade');

;(async () => {
    const dataBuffer = await readFile(join(__dirname, './../../docs/contrato.pdf'));
    const data = await pdf(dataBuffer);

    const instance = new TextProcessFacade(data.text);
    const people = instance.getPeopleFromPDF();

    console.log(people);
})();
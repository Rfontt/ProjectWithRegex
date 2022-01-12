const { evalueteRegex } = require('./util');

class Person {
    //(\w+):\s.*
    //$1++

    constructor(
        [
            name,
            nationality,
            maritalStatus,
            cpf,
            street,
            number,
            district,
            state,
        ]
    ) {
        // ^ -> começo da string
        // + -> um ou mais ocorrências
        // (\w{1}) -> pega só a primeira letra e deixa em um grupo
        // (a-zA-Z) -> encontra letras maiúsculas ou minúsculas, adicionando o + para ele pegar
        // g -> Todas as ocorrências.
        const firstLetterExp = evalueteRegex(/^(\w{1})([a-zA-Z]+$)/g);
        const formatFirstLetterExp = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                const group1UpperCase = group1.toUpperCase();
                const group2LawerCase = group2.toLowerCase();

                return `${group1UpperCase}${group2LawerCase}`
            });
        }
        const streetArray = street.match(evalueteRegex(/(?<=\sa\s).*/gm));
        const streetFormated = streetArray[0];

        const districtArray = district.match(evalueteRegex(/(?<=\s).*/gm));
        const districtFormated = districtArray[0];

        this.name = name,
        this.nationality = formatFirstLetterExp(nationality),
        this.maritalStatus = formatFirstLetterExp(maritalStatus),
        //Tudo que não é digíto é removido e g significa que será para todas as ocorrências
        this.cpf = cpf.replace(evalueteRegex(/\D/g), ''),
        this.street = streetFormated,
        this.number = number,
        this.district = districtFormated,
        this.state = state.replace(evalueteRegex(/\./), "");
    }
}

module.exports = Person;
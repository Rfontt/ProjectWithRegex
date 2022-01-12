const { evalueteRegex } = require('./util');
const Person = require('./person');

// O objetivo do Fluent API é executar 
// tarefa como uma pipeline, step by step
// e no fim, chama o build. 
// Muito similar ao padrão BUILDER
// A diferença é que aqui é sobre processos
// e o builder sobre construção de objeto.

class TextProcessFluentApi {
    // propriedade privada 
   #content

   constructor(content) {
       this.#content = content;
   } 

   extractPeopleData() {
       // ?<= fala que vai extrair os dados que virão depois desse grupo
       // [contratante|contratada] => Usamos a pipe | para dizer que queremos um ou outro, além disso tem a flag [i] para pegar maiusculas e minusculas 
       // :\s{1} => vai procurar o caracter literal do dois pontos seguind de um espaço
       // Tudo acima fica dentro de um parêntese para falar que 'vamos pegar daí para frente'
       // ?!\s => negatice look around, vai ignorar os contratantes do fim do documento(quem só tem espaço a frente deles)
       // .*\n => pegar tudo(dígitos ou palavras) até a quebra de linha
       //.*? => non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop
       // $ informar que a pesquisa acaba no fim da linha
       // g -> global
       // m -> multiline
       //i -> insensitive

       const matchPerson = evalueteRegex(/(?<=[contratante|contratado]:\s{1})(?!\s)(.*\n.*?)$/gmi);
       const onlyPerson = this.#content.match(matchPerson);

       this.#content = onlyPerson;

       return this;
   }

   divideTextInColumns() {
       const splitRegex = evalueteRegex(/,/);

       this.#content = this.#content.map(line => line.split(splitRegex));

       return this;
   }

   removeEmptyCaracters() {
      const trimSpace = evalueteRegex(/^\s+|\s+$|\n/g);

      this.#content = this.#content.map(line => line.map(item => item.replace(trimSpace, "")))

      return this;
   }

   mapPerson() {
      // Passa o array de items no construtor
      this.#content = this.#content.map(line => new Person(line));

      return this;
   }

   build() {
      return this.#content;
   }
}

module.exports = TextProcessFluentApi;
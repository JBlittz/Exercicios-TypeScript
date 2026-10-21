/*
1. Tipos primitivos
Declare variáveis para nome, idade, preço e disponibilidade de um produto. Use string, number
e boolean adequadamente.
*/
let nome: string;
let idade: number;
let preco: number;
let disponibilidade: boolean;

/*
2. Inferência
Explique quais tipos o TypeScript infere para as declarações abaixo. Depois, diga qual
reatribuição seria inválida.

let quantidade = 3;
const categoria = "livro";
let habilitado = false;
*/
let quantidade = 3; // number => let quantidade : number = 3;
const categoria = "livro"; // string => let categoria : string = "livro";
let habilitado = false; // boolean => let habilitado : boolean = false;

/*
3. Arrays
Crie uma função media(notas: number[]): number que devolva a média. Defina o
comportamento para uma lista vazia
*/
function media(notas: number[]): number {
  if (notas.length === 0) {
    return 0;
  }
  const soma = notas.reduce(
    (acumulador, notaAtual) => acumulador + notaAtual,
    0,
  );
  return soma / notas.length;
}

/*
4. Tupla
Defina o tipo Coordenada como uma tupla de dois números e crie um valor que represente
x=12, y=7.
*/
type Coordenada = [number, number];
const coordenada: Coordenada = [12, 7];

/*
5. Tipos literais
Crie um tipo Tamanho que aceite somente "P", "M" ou "G". Escreva uma função que receba esse
tipo.
*/
type Tamanho = "P" | "M" | "G";
function processarTamaho(tamanho: Tamanho): void {
  console.log(`O tamanho é ${tamanho}`);
}


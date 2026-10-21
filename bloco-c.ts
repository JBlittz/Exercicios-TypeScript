/*
11. Union
Crie um tipo Identificador que aceite string ou number. Escreva uma função que retorne sempre uma string no formato ID: valor.
*/
type Identicador = string | number;
function sempreString(idNaoFormatado: Identicador): string {
  return `ID: ${idNaoFormatado}`;
}

/*
12. Narrowing
Implemente formatar(valor: string | number): string. Para strings, devolva o texto em maiúsculas; para números, devolva duas casas decimais.
*/
function formatar(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  }
  return valor.toFixed(2);
}

/*
13. Union discriminada
Modele o estado de uma requisição com status carregando, sucesso ou erro. O sucesso deve carregar dados string[] e o erro uma mensagem. Escreva uma função que trate os três casos.
*/
type Status =
  | { status: "carregando" }
  | { status: "sucesso"; dados: string[] }
  | { status: "erro"; mensagem: string };
function checarStatus(status: Status): string {
  switch (status.status) {
    case "carregando":
      return "Carregando...";
    case "sucesso":
      return "Sucesso! Dados: " + status.dados.toString();
    case "erro":
      return "Erro! Log: " + status.mensagem;
  }
}

/*
14. Parâmetros e retorno
Crie uma função calcularDesconto(preco: number, percentual: number): number. Rejeite valores negativos e percentuais acima de 100, usando uma estratégia clara.
*/
function calcularDesconto(preco: number, percentual: number): number {
  if (!Number.isFinite(preco) || preco < 0) {
    throw new Error("Preço inválido");
  }
  if (!Number.isFinite(percentual) || percentual < 0 || percentual > 100) {
    throw new Error("Percentual inválido");
  }
  return preco * (1 - percentual / 100);
}

/*
15. Callback
Defina o tipo Transformar como uma função que recebe string e devolve string. Use-o numa função que transforme uma lista de nomes.
*/
type Transformar = (texto: string) => string;
function transforme(nomes: string[], callback: Transformar): string[] {
  return nomes.map(callback);
}
const emMaiusculas = transforme(["ana", "carlos"], nome => nome.toUpperCase());

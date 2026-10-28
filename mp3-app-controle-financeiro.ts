type Categoria =
  | "alimentacao"
  | "transporte"
  | "moradia"
  | "salario"
  | "outros";
type Lancamento = {
  id: string;
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa";
  categoria: Categoria;
  data: string; // ISO: YYYY-MM-DD
};
type ResultadoValidacao<T> =
  | { ok: true; valor: T }
  | { ok: false; erros: string[] };

function validar(valor: unknown): ResultadoValidacao<unknown> {}

//function novoLancamento(): Lancamento {}
//function retirarLancamento(): Lancamento {}
//function alterarLancamento(): Lancamento {}

//function filtrarPor(): Lancamento[] {}
//function calcular(): number[] {}

//function resumo(): string {}

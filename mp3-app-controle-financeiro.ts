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

function validar<T>(
  valor: T,
  isLancamento: boolean = false,
): ResultadoValidacao<T> {
  let ok: boolean = true;
  let erros: string[] = [];
  if (typeof valor == "undefined") {
    ok = false;
    erros.push("O valor não pode ser do tipo 'undefined'.");
  }
  if (typeof valor == "number") {
    if (!Number.isFinite(valor) || valor <= 0) {
      ok = false;
      erros.push("O valor precisa ser maior que 0 e finito.");
    }
  }
  if (isLancamento) {
    let validadeLancamento: ResultadoValidacao<Lancamento> = lancamentoValido(
      valor as Lancamento,
    );
    if (validadeLancamento.ok == false) {
      ok = false;
      validadeLancamento.erros.forEach((element) => {
        erros.push(element);
      });
    }
  }
  if (ok === false) {
    return { ok: false, erros: erros };
  }
  return { ok: true, valor: valor };
}
/* function lancamentoValido<Lancamento>(
  lancamento: Lancamento,
): ResultadoValidacao<Lancamento> {
  let ok: boolean = true;
  let erros: string[] = [];
  if (lancamento.descricao.trim() == "") {
    ok = false;
    erros.push("Descrição não pode estar vazia.");
  }
} */

//function novoLancamento(): Lancamento {}
//function retirarLancamento(): Lancamento {}
//function alterarLancamento(): Lancamento {}

//function filtrarPor(): Lancamento[] {}
//function calcular(): number[] {}

//function resumo(): string {}

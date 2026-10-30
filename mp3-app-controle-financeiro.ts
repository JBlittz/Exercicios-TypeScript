type Categoria =
  | "alimentacao"
  | "transporte"
  | "moradia"
  | "salario"
  | "outros";
const CATEGORIAS: Categoria[] = [
  "alimentacao",
  "transporte",
  "moradia",
  "salario",
  "outros",
];
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

let lancamentos: Lancamento[] = [];

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

function dataValida(data: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    return false;
  }
  // Rejeita datas inexistentes como 2024-02-31, que o Date normalizaria.
  const d = new Date(data + "T00:00:00Z");
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === data;
}

function lancamentoValido(
  lancamento: Lancamento,
): ResultadoValidacao<Lancamento> {
  let ok: boolean = true;
  let erros: string[] = [];
  if (lancamento.descricao.trim() == "") {
    ok = false;
    erros.push("Descrição não pode estar vazia.");
  }
  if (!CATEGORIAS.includes(lancamento.categoria)) {
    ok = false;
    erros.push(`Categoria inválida. Use uma de: ${CATEGORIAS.join(", ")}.`);
  }
  if (!dataValida(lancamento.data)) {
    ok = false;
    erros.push("Data inválida. Use o formato YYYY-MM-DD.");
  }
  if (ok === false) {
    return { ok: false, erros: erros };
  }
  return { ok: true, valor: lancamento };
}

function novoLancamento(lancamento: Lancamento): void {
  if (validar<Lancamento>(lancamento).ok) {
    lancamentos.push(lancamento);
  }
}
function retirarLancamento(lancamento: Lancamento): void {
  const indice = lancamentos.findIndex((value) => value.id === lancamento.id);
  if (indice !== -1) {
    lancamentos.splice(indice, 1);
  }
}
function alterarLancamento(lancamento: Lancamento): void {
  if (!validar<Lancamento>(lancamento).ok) {
    return;
  }
  const indice = lancamentos.findIndex((value) => value.id === lancamento.id);
  if (indice !== -1) {
    lancamentos[indice] = lancamento;
  }
}

type Filtros = {
  mes?: string; // YYYY-MM
  tipo?: Lancamento["tipo"];
  categoria?: Categoria;
};
function filtrarPor(
  filtros: Filtros,
  lista: Lancamento[] = lancamentos,
): Lancamento[] {
  return lista.filter(
    (l) =>
      (filtros.mes === undefined || l.data.startsWith(filtros.mes + "-")) &&
      (filtros.tipo === undefined || l.tipo === filtros.tipo) &&
      (filtros.categoria === undefined || l.categoria === filtros.categoria),
  );
}
function calcular(lista: Lancamento[]): [number, number, number] {
  let receitas = 0;
  let despesas = 0;
  lista.forEach((l) => {
    if (l.tipo === "receita") {
      receitas += l.valor;
    } else {
      despesas += l.valor;
    }
  });
  return [receitas, despesas, receitas - despesas];
}

function resumo(mes: string): ResultadoValidacao<string> {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(mes)) {
    return { ok: false, erros: ["Mês inválido. Use o formato YYYY-MM."] };
  }
  const doMes = filtrarPor({ mes });
  const [receitas, despesas, saldo] = calcular(doMes);
  return {
    ok: true,
    valor:
      `Resumo de ${mes} (${doMes.length} lançamentos)\n` +
      `Receitas: ${receitas.toFixed(2)}\n` +
      `Despesas: ${despesas.toFixed(2)}\n` +
      `Saldo: ${saldo.toFixed(2)}`,
  };
}

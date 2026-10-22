type ProdutoBase = {
  nome: string;
  custo: number;
  margem: number;
  precoUnitario: number;
};
type Resultado =
  | {
      ok: true;
      produto: ProdutoBase;
      quantidade: number;
      faturamento: number;
      lucro: number;
    }
  | { ok: false; messages: string[] };

function validar(
  nome: string,
  custo: number,
  quantidade: number,
  margem: number,
): Resultado {
  let errorMessages: string[] = [];
  let status: boolean = true;
  if (nome.trim() === "") {
    errorMessages.push("Nome não pode estar vazio.");
    status = false;
  }
  if (!Number.isFinite(custo) || custo < 0) {
    errorMessages.push("Custo não pode ser negativo.");
    status = false;
  }
  if (!Number.isFinite(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
    errorMessages.push("A quantidade precisa ser um inteiro positivo.");
    status = false;
  }
  if (!Number.isFinite(margem) || margem <= 0 || margem > 99) {
    errorMessages.push("A margem precisa ser maior do que 0% e no máximo 99%.");
    status = false;
  }

  if (status === false) {
    return { ok: false, messages: errorMessages };
  } else {
    let preco: number = custo / (1 - margem / 100);
    let faturamento: number = preco * quantidade;
    let lucro: number = (preco - custo) * quantidade;
    return {
      ok: true,
      produto: {
        nome: nome,
        custo: Number.parseFloat(custo.toFixed(2)),
        margem: Number.parseFloat(margem.toFixed(2)),
        precoUnitario: Number.parseFloat(preco.toFixed(2)),
      },
      quantidade: quantidade,
      faturamento: Number.parseFloat(faturamento.toFixed(2)),
      lucro: Number.parseFloat(lucro.toFixed(2)),
    };
  }
}

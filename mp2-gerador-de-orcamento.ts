type ItemOrcamento = {
  descricao: string;
  quantidade: number;
  precoUnitario: number;
};
type Documento = {
  id: string;
  cliente: string;
  itens: ItemOrcamento[];
  status: "rascunho" | "enviado" | "aprovado" | "cancelado";
};
type Recibo = {
  itens: ItemOrcamento[];
  subTotal: number[];
  total: number;
};

const orcamento: Documento = {
  id: "0",
  cliente: "Rio",
  itens: [],
  status: "rascunho",
};

function adicionarItem(orc: Documento, item: ItemOrcamento): Documento {
  if (item.descricao.trim() === "") throw new Error("Descrição está vazia.");
  if (!Number.isFinite(item.quantidade) || item.quantidade <= 0)
    throw new Error("Precisa haver uma quantidade positiva.");
  if (!Number.isFinite(item.precoUnitario) || item.precoUnitario <= 0)
    throw new Error("Precisa haver um preço positivo.");
  orc.itens.push({
    descricao: item.descricao.trim(),
    quantidade: Math.trunc(item.quantidade),
    precoUnitario: Number.parseFloat(item.precoUnitario.toFixed(2)),
  });
  return orc;
}
function removerItem(orc: Documento, item: ItemOrcamento): Documento {
  orc.itens.splice(orc.itens.indexOf(item));
  return orc;
}

function calcularSubTotal(orc: Documento): number[] {
  orc.status = "enviado";
  let subArr: number[] = [];
  orc.itens.forEach((element) => {
    subArr.push(element.quantidade * element.precoUnitario);
  });
  return subArr;
}
function calcularTotal(
  subTotal: number[],
  descount: number = 0,
  orc: Documento,
): number {
  if (!Number.isFinite(descount) || descount < 0) {
    orc.status = "cancelado";
    throw new Error("Desconto precisa ser positivo ou zero.");
  }
  orc.status = "aprovado";
  let total: number = 0;
  subTotal.forEach((element) => {
    total += element;
  });
  return total * (1 - descount / 100);
}

function recibo(orc: Documento, subTot: number[], tot: number): Recibo {
  return {
    itens: orc.itens,
    subTotal: subTot,
    total: tot,
  };
}

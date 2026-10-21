/*
6. Objeto tipado
Defina Produto com id numérico, nome textual e preço numérico. Crie dois produtos válidos.
*/
type ProdutoA = {
  id: number;
  nome: string;
  preco: number;
};
const produto1: ProdutoA = {
  id: 1,
  nome: "Produto 1",
  preco: 10,
};
const produto2: ProdutoA = {
  id: 2,
  nome: "Produto 2",
  preco: 15,
};

/*
7. Opcional
Adicione a propriedade opcional descricao a Produto. Escreva uma função que devolva a descrição ou o texto "Sem descrição".
*/
type ProdutoB = {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
};
const produto3: ProdutoB = {
  id: 3,
  nome: "Produto 3",
  preco: 20,
};
const produto4: ProdutoB = {
  id: 4,
  nome: "Produto 4",
  preco: 30,
  descricao: "Caro",
};
function obterDescricao(produto: ProdutoB): string {
  return produto.descricao ?? "Sem descrição";
}

/*
8. type ou interface
Defina Usuario usando interface, com id, nome e email opcional. Depois crie um tipo Administrador que acrescente a propriedade nivel: number.
*/
type Usuario = {
  id: number;
  nome: string;
  email?: string;
};
interface Administrador extends Usuario {
  nivel: number;
}

/*
9. readonly
Crie um tipo Pedido com id somente para leitura, total e status. Mostre uma atualização válida e explique qual atribuição deve falhar.
*/
type Pedido = {
  readonly id: number; // Deve dar erro ao editar
  total: number;
  status: "aberto" | "pago";
};

/*
10. Utility types
A partir de Produto, crie NovoProduto sem id e AtualizacaoProduto com todas as propriedades opcionais.
*/
type NovoProduto = Omit<ProdutoB, "id">;
type AtualizacaoProduto = Partial<ProdutoB>;

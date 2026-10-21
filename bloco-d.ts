/*
16. Generic básico
Implemente identidade<T>(valor: T): T. Demonstre que strings e números mantêm seus tipos
*/
function identidade<T>(valor: T): T {
  return valor;
}

/*
17. Generic com restrição
Crie tamanhoDe<T extends { length: number }> que devolva o tamanho de uma string ou array. Por que um número não deve ser aceito?
*/
function tamanhoDe<T extends { length: number }>(valor: T): number {
  return valor.length;
} // Porque um número não tem a propriedade length

/*
18. keyof
Crie uma função genérica que receba um objeto e uma chave válida desse objeto, retornando o valor correspondente sem perder seu tipo.
*/
function valorCorrespondente<T, K extends keyof T>(objeto: T, chave: K): T[K] {
  return objeto[chave];
}

/*
19. unknown
Crie uma função que receba unknown e devolva true apenas se o valor for um objeto não nulo com uma propriedade nome do tipo string.
*/
function checar(objeto: unknown): boolean {
  if (typeof objeto !== "object" || objeto === null) {
    return false;
  }
  if (!("nome" in objeto)) {
    return false;
  }
  return typeof objeto.nome === "string";
}

/*
20. Async
Defina um tipo Usuario e escreva uma função assíncrona que simule buscar um usuário e retorne Promise<Usuario>. Trate o caso de ID inválido.
*/
type Usuario = { id: number };
const user: Usuario = { id: 1 };
async function buscar(usuario: Usuario): Promise<Usuario> {
  if (usuario.id === null) {
    throw new Error("ID nulo");
  }
  return usuario;
}

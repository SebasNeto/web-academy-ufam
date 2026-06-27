import { prisma } from "../lib/prisma";
import { limparBanco, criarCategoriaESubcategoriaBase } from "../services/baseService";
import {
  criarProduto,
  listarProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  adicionarNumeroSerie,
  removerNumeroSerie,
  deletarProduto,
} from "../services/produtoService";

async function main() {
  console.log("\n=== LAB 03 - CRUD DE PRODUTOS COM PRISMA ===\n");

  console.log("Limpando banco...");
  await limparBanco();

  console.log("Criando categoria e subcategoria base...");
  const { subcategoria } = await criarCategoriaESubcategoriaBase();

  console.log("\nCREATE - Criando produto...");
  const produtoCriado = await criarProduto({
    fabricante: "Samsung",
    produto: "Galaxy A55",
    quantidadeDisponivel: 20,
    precoBase: "1899.90",
    idSub: subcategoria.idSub,
    numerosDeSerie: ["SN-A55-001", "SN-A55-002"],
  });

  console.log(produtoCriado);

  console.log("\nREAD - Listando produtos...");
  const produtos = await listarProdutos();
  console.log(produtos);

  console.log("\nREAD - Buscando produto por ID...");
  const produtoEncontrado = await buscarProdutoPorId(produtoCriado.idProduto);
  console.log(produtoEncontrado);

  console.log("\nUPDATE - Atualizando produto...");
  const produtoAtualizado = await atualizarProduto(produtoCriado.idProduto, {
    produto: "Galaxy A55 5G",
    quantidadeDisponivel: 18,
    precoBase: "1799.90",
  });

  console.log(produtoAtualizado);

  console.log("\nCREATE relacionado - Adicionando número de série...");
  const serieAdicionada = await adicionarNumeroSerie(produtoCriado.idProduto, "SN-A55-003");
  console.log(serieAdicionada);

  console.log("\nDELETE relacionado - Removendo número de série...");
  const serieRemovida = await removerNumeroSerie(produtoCriado.idProduto, "SN-A55-003");
  console.log(serieRemovida);

  console.log("\nREAD - Produto após alterações...");
  const produtoFinal = await buscarProdutoPorId(produtoCriado.idProduto);
  console.log(produtoFinal);

  console.log("\nDELETE - Deletando produto...");
  const produtoDeletado = await deletarProduto(produtoCriado.idProduto);
  console.log(produtoDeletado);

  console.log("\nREAD - Lista final de produtos...");
  const listaFinal = await listarProdutos();
  console.log(listaFinal);

  console.log("\nCRUD executado com sucesso!");
}

main()
  .catch((erro) => {
    console.error("\nErro durante execução:");
    console.error(erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

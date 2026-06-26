import { prisma } from "./lib/prisma";

async function main() {
  const livros = await prisma.livro.findMany({
    include: {
      autorias: {
        include: {
          autor: true,
        },
      },
      edicoes: {
        include: {
          editora: true,
        },
      },
    },
  });

  console.log("\nLISTA DE LIVROS\n");

  for (const livro of livros) {
    console.log(`Livro: ${livro.titulo}`);
    console.log(`Idioma original: ${livro.idiomaOriginal}`);
    console.log(`Ano da primeira publicação: ${livro.anoPrimeiraPublicacao}`);

    console.log("Autores:");
    for (const autoria of livro.autorias) {
      console.log(`- ${autoria.autor.nome}`);
    }

    console.log("Edições:");
    for (const edicao of livro.edicoes) {
      console.log(`- ISBN: ${edicao.isbn}`);
      console.log(`  Preço: R$ ${edicao.preco}`);
      console.log(`  Editora: ${edicao.editora.nomeFantasia}`);
    }

    console.log("----------------------");
  }
}

main()
  .catch((erro) => {
    console.error("Erro:", erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
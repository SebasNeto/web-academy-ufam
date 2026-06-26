import { Prisma } from "../generated/prisma/client";
import { prisma } from "./lib/prisma";

async function main() {
  await prisma.autoria.deleteMany();
  await prisma.edicao.deleteMany();
  await prisma.livro.deleteMany();
  await prisma.autor.deleteMany();
  await prisma.editora.deleteMany();

  const autor1 = await prisma.autor.create({
    data: {
      nome: "Machado de Assis",
      paisNascimento: "Brasil",
      dataNascimento: new Date("1839-06-21"),
      notaBiografica: "Autor brasileiro do século XIX.",
    },
  });

  const autor2 = await prisma.autor.create({
    data: {
      nome: "José de Alencar",
      paisNascimento: "Brasil",
      dataNascimento: new Date("1829-05-01"),
      notaBiografica: "Romancista brasileiro.",
    },
  });

  const editora = await prisma.editora.create({
    data: {
      nomeFantasia: "Editora Clássicos BR",
      endereco: "Manaus - AM",
      telefone: "(92) 99999-9999",
    },
  });

  const livro = await prisma.livro.create({
    data: {
      titulo: "Dom Casmurro",
      idiomaOriginal: "Português",
      anoPrimeiraPublicacao: 1899,
    },
  });

  await prisma.autoria.create({
    data: {
      idAutor: autor1.idAutor,
      codLivro: livro.codLivro,
      ordemAutoria: 1,
      observacaoCredito: "Autor principal",
    },
  });

  await prisma.edicao.create({
    data: {
      isbn: "9788535910663",
      anoEdicao: 2020,
      preco: new Prisma.Decimal("49.90"),
      numPaginas: 256,
      qtdEstoque: 15,
      codLivro: livro.codLivro,
      idEditora: editora.idEditora,
    },
  });

  const livro2 = await prisma.livro.create({
    data: {
      titulo: "Iracema",
      idiomaOriginal: "Português",
      anoPrimeiraPublicacao: 1865,
    },
  });

  await prisma.autoria.create({
    data: {
      idAutor: autor2.idAutor,
      codLivro: livro2.codLivro,
      ordemAutoria: 1,
      observacaoCredito: "Autor principal",
    },
  });

  await prisma.edicao.create({
    data: {
      isbn: "9788503012304",
      anoEdicao: 2019,
      preco: new Prisma.Decimal("39.90"),
      numPaginas: 192,
      qtdEstoque: 10,
      codLivro: livro2.codLivro,
      idEditora: editora.idEditora,
    },
  });

  console.log("Dados inseridos com sucesso!");
}

main()
  .catch((erro) => {
    console.error("Erro:", erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
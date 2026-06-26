import { Prisma } from "../generated/prisma/client";
import { prisma } from "./lib/prisma";

async function main() {
  await prisma.itemCompra.deleteMany();
  await prisma.numeroDeSerie.deleteMany();
  await prisma.compra.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.subcategoria.deleteMany();
  await prisma.endereco.deleteMany();
  await prisma.cliente.deleteMany();
  await prisma.categoria.deleteMany();

  const categoria = await prisma.categoria.create({
    data: {
      nome: "Eletrônicos",
    },
  });

  const subcategoria = await prisma.subcategoria.create({
    data: {
      nome: "Smartphones",
      idCat: categoria.idCat,
    },
  });

  const cliente = await prisma.cliente.create({
    data: {
      cpf: "123.456.789-00",
      nomeCompleto: "João da Silva",
      dataNascimento: new Date("1998-05-10"),
      email: "joao@email.com",
      celular: "(92) 99999-9999",
    },
  });

  const endereco = await prisma.endereco.create({
    data: {
      cep: "69000-000",
      rua: "Rua das Flores",
      cidade: "Manaus",
      cpfClientes: cliente.cpf,
    },
  });

  const produto = await prisma.produto.create({
    data: {
      fabricante: "Samsung",
      produto: "Galaxy A55",
      quantidadeDisponivel: 20,
      precoBase: new Prisma.Decimal("1899.90"),
      idSub: subcategoria.idSub,
    },
  });

  await prisma.numeroDeSerie.create({
    data: {
      idProduto: produto.idProduto,
      numeroSerie: "SN-GALAXY-A55-001",
    },
  });

  const compra = await prisma.compra.create({
    data: {
      formaPagamento: "Cartão de crédito",
      totalCalculado: new Prisma.Decimal("1799.90"),
      desconto: new Prisma.Decimal("100.00"),
      dataHoraCompra: new Date(),
      cpfClientes: cliente.cpf,
      idEndereco: endereco.idEndereco,
    },
  });

  await prisma.itemCompra.create({
    data: {
      idCompra: compra.idCompra,
      idProduto: produto.idProduto,
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
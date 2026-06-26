import { prisma } from "./lib/prisma";

async function main() {
  const compras = await prisma.compra.findMany({
    include: {
      cliente: true,
      endereco: true,
      itens: {
        include: {
          produto: {
            include: {
              subcategoria: {
                include: {
                  categoria: true,
                },
              },
              numerosDeSerie: true,
            },
          },
        },
      },
    },
  });

  console.log("\nLISTA DE COMPRAS\n");

  for (const compra of compras) {
    console.log(`Compra: ${compra.idCompra}`);
    console.log(`Cliente: ${compra.cliente?.nomeCompleto}`);
    console.log(`CPF: ${compra.cliente?.cpf}`);
    console.log(`Forma de pagamento: ${compra.formaPagamento}`);
    console.log(`Total: R$ ${compra.totalCalculado}`);
    console.log(`Desconto: R$ ${compra.desconto}`);
    console.log(`Endereço: ${compra.endereco?.rua}, ${compra.endereco?.cidade}`);

    console.log("Produtos comprados:");

    for (const item of compra.itens) {
      console.log(`- Produto: ${item.produto.produto}`);
      console.log(`  Fabricante: ${item.produto.fabricante}`);
      console.log(`  Preço base: R$ ${item.produto.precoBase}`);
      console.log(`  Categoria: ${item.produto.subcategoria?.categoria?.nome}`);
      console.log(`  Subcategoria: ${item.produto.subcategoria?.nome}`);

      if (item.produto.numerosDeSerie.length > 0) {
        console.log("  Números de série:");
        for (const serie of item.produto.numerosDeSerie) {
          console.log(`  - ${serie.numeroSerie}`);
        }
      }
    }

    console.log("-----------------------------");
  }
}

main()
  .catch((erro) => {
    console.error("Erro:", erro);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
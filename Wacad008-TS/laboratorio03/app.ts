interface IProduto {
    getTipo(): string;
    getValor(): number;
    getDetalhe(): string;
}

abstract class Produto implements IProduto {

    constructor(
        protected modelo: string,
        protected fabricante: string,
        protected valor: number
    ) {}

    getValor(): number {
        return this.valor;
    }

    getModelo(): string {
        return this.modelo;
    }

    getFabricante(): string {
        return this.fabricante;
    }

    abstract getTipo(): string;
    abstract getDetalhe(): string;
}

class TV extends Produto {

    constructor(
        modelo: string,
        fabricante: string,
        valor: number,
        private resolucao: string
    ) {
        super(modelo, fabricante, valor);
    }

    getTipo(): string {
        return "TV";
    }

    getDetalhe(): string {
        return this.resolucao;
    }
}

class Celular extends Produto {

    constructor(
        modelo: string,
        fabricante: string,
        valor: number,
        private memoria: string
    ) {
        super(modelo, fabricante, valor);
    }

    getTipo(): string {
        return "Celular";
    }

    getDetalhe(): string {
        return this.memoria;
    }
}

class Bicicleta extends Produto {

    constructor(
        modelo: string,
        fabricante: string,
        valor: number,
        private aro: string
    ) {
        super(modelo, fabricante, valor);
    }

    getTipo(): string {
        return "Bicicleta";
    }

    getDetalhe(): string {
        return this.aro;
    }
}

class Carrinho<T extends IProduto> {

    private produtos: T[] = [];

    adicionar(produto: T): void {
        this.produtos.push(produto);
    }

    remover(indice: number): void {
        this.produtos.splice(indice, 1);
    }

    listar(): T[] {
        return this.produtos;
    }

    getQuantidade(): number {
        return this.produtos.length;
    }

    getValorTotal(): number {
        let total = 0;

        for (const produto of this.produtos) {
            total += produto.getValor();
        }

        return total;
    }
}

const carrinho = new Carrinho<IProduto>();

const tipoProduto = document.getElementById("tipoProduto") as HTMLSelectElement;
const modelo = document.getElementById("modelo") as HTMLInputElement;
const fabricante = document.getElementById("fabricante") as HTMLInputElement;
const valor = document.getElementById("valor") as HTMLInputElement;
const atributo = document.getElementById("atributo") as HTMLInputElement;

const listaProdutos = document.getElementById("listaProdutos") as HTMLElement;

const quantidade = document.getElementById("quantidade") as HTMLElement;
const valorTotal = document.getElementById("valorTotal") as HTMLElement;

function atualizarDisplay(): void {

    quantidade.textContent =
        carrinho.getQuantidade().toString();

    valorTotal.textContent =
        carrinho.getValorTotal().toFixed(2);

    listaProdutos.innerHTML = "";

    carrinho.listar().forEach((produto, indice) => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${produto.getTipo()}</td>
            <td>${(produto as any).getModelo()}</td>
            <td>${(produto as any).getFabricante()}</td>
            <td>R$ ${produto.getValor().toFixed(2)}</td>
            <td>${produto.getDetalhe()}</td>
            <td>
                <button
                    class="excluir"
                    onclick="removerProduto(${indice})">
                    Remover
                </button>
            </td>
        `;

        listaProdutos.appendChild(linha);
    });
}

(document.getElementById("btnAdicionar") as HTMLButtonElement)
.addEventListener("click", () => {

    const tipo = tipoProduto.value;
    const valorProduto = Number(valor.value);

    if (
        modelo.value === "" ||
        fabricante.value === "" ||
        atributo.value === "" ||
        valorProduto <= 0
    ) {
        alert("Preencha todos os campos.");
        return;
    }

    let produto: IProduto;

    if (tipo === "tv") {
        produto = new TV(
            modelo.value,
            fabricante.value,
            valorProduto,
            atributo.value
        );
    } else if (tipo === "celular") {
        produto = new Celular(
            modelo.value,
            fabricante.value,
            valorProduto,
            atributo.value
        );
    } else {
        produto = new Bicicleta(
            modelo.value,
            fabricante.value,
            valorProduto,
            atributo.value
        );
    }

    carrinho.adicionar(produto);

    modelo.value = "";
    fabricante.value = "";
    valor.value = "";
    atributo.value = "";

    atualizarDisplay();
});

(window as any).removerProduto = (indice: number): void => {
    carrinho.remover(indice);
    atualizarDisplay();
};

atualizarDisplay();
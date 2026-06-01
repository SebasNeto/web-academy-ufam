"use strict";
class Produto {
    modelo;
    fabricante;
    valor;
    constructor(modelo, fabricante, valor) {
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.valor = valor;
    }
    getValor() {
        return this.valor;
    }
    getModelo() {
        return this.modelo;
    }
    getFabricante() {
        return this.fabricante;
    }
}
class TV extends Produto {
    resolucao;
    constructor(modelo, fabricante, valor, resolucao) {
        super(modelo, fabricante, valor);
        this.resolucao = resolucao;
    }
    getTipo() {
        return "TV";
    }
    getDetalhe() {
        return this.resolucao;
    }
}
class Celular extends Produto {
    memoria;
    constructor(modelo, fabricante, valor, memoria) {
        super(modelo, fabricante, valor);
        this.memoria = memoria;
    }
    getTipo() {
        return "Celular";
    }
    getDetalhe() {
        return this.memoria;
    }
}
class Bicicleta extends Produto {
    aro;
    constructor(modelo, fabricante, valor, aro) {
        super(modelo, fabricante, valor);
        this.aro = aro;
    }
    getTipo() {
        return "Bicicleta";
    }
    getDetalhe() {
        return this.aro;
    }
}
class Carrinho {
    produtos = [];
    adicionar(produto) {
        this.produtos.push(produto);
    }
    remover(indice) {
        this.produtos.splice(indice, 1);
    }
    listar() {
        return this.produtos;
    }
    getQuantidade() {
        return this.produtos.length;
    }
    getValorTotal() {
        let total = 0;
        for (const produto of this.produtos) {
            total += produto.getValor();
        }
        return total;
    }
}
const carrinho = new Carrinho();
const tipoProduto = document.getElementById("tipoProduto");
const modelo = document.getElementById("modelo");
const fabricante = document.getElementById("fabricante");
const valor = document.getElementById("valor");
const atributo = document.getElementById("atributo");
const listaProdutos = document.getElementById("listaProdutos");
const quantidade = document.getElementById("quantidade");
const valorTotal = document.getElementById("valorTotal");
function atualizarDisplay() {
    quantidade.textContent =
        carrinho.getQuantidade().toString();
    valorTotal.textContent =
        carrinho.getValorTotal().toFixed(2);
    listaProdutos.innerHTML = "";
    carrinho.listar().forEach((produto, indice) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.getTipo()}</td>
            <td>${produto.getModelo()}</td>
            <td>${produto.getFabricante()}</td>
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
document.getElementById("btnAdicionar")
    .addEventListener("click", () => {
    const tipo = tipoProduto.value;
    const valorProduto = Number(valor.value);
    if (modelo.value === "" ||
        fabricante.value === "" ||
        atributo.value === "" ||
        valorProduto <= 0) {
        alert("Preencha todos os campos.");
        return;
    }
    let produto;
    if (tipo === "tv") {
        produto = new TV(modelo.value, fabricante.value, valorProduto, atributo.value);
    }
    else if (tipo === "celular") {
        produto = new Celular(modelo.value, fabricante.value, valorProduto, atributo.value);
    }
    else {
        produto = new Bicicleta(modelo.value, fabricante.value, valorProduto, atributo.value);
    }
    carrinho.adicionar(produto);
    modelo.value = "";
    fabricante.value = "";
    valor.value = "";
    atributo.value = "";
    atualizarDisplay();
});
window.removerProduto = (indice) => {
    carrinho.remover(indice);
    atualizarDisplay();
};
atualizarDisplay();

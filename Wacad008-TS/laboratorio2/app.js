"use strict";
class Aluno {
    id;
    nomeCompleto;
    idade;
    altura;
    peso;
    constructor(id, nomeCompleto, idade, altura, peso) {
        this.id = id;
        this.nomeCompleto = nomeCompleto;
        this.idade = idade;
        this.altura = altura;
        this.peso = peso;
    }
}
class Turma {
    id;
    nome;
    alunos;
    constructor(id, nome, alunos = []) {
        this.id = id;
        this.nome = nome;
        this.alunos = alunos;
    }
    getNumAlunos() {
        return this.alunos.length;
    }
    getMediaIdades() {
        if (this.alunos.length === 0)
            return 0;
        let soma = 0;
        for (const aluno of this.alunos) {
            soma += aluno.idade;
        }
        return soma / this.alunos.length;
    }
    getMediaAlturas() {
        if (this.alunos.length === 0)
            return 0;
        let soma = 0;
        for (const aluno of this.alunos) {
            soma += aluno.altura;
        }
        return soma / this.alunos.length;
    }
    getMediaPesos() {
        if (this.alunos.length === 0)
            return 0;
        let soma = 0;
        for (const aluno of this.alunos) {
            soma += aluno.peso;
        }
        return soma / this.alunos.length;
    }
}
const turma = new Turma(1, "Educação Física");
const nomeInput = document.getElementById("nome");
const idadeInput = document.getElementById("idade");
const alturaInput = document.getElementById("altura");
const pesoInput = document.getElementById("peso");
const tabelaAlunos = document.getElementById("tabelaAlunos");
const btnSalvar = document.getElementById("btnSalvar");
let idEdicao = null;
function atualizarEstatisticas() {
    document.getElementById("numAlunos").textContent =
        turma.getNumAlunos().toString();
    document.getElementById("mediaIdades").textContent =
        turma.getMediaIdades().toFixed(2);
    document.getElementById("mediaAlturas").textContent =
        turma.getMediaAlturas().toFixed(2);
    document.getElementById("mediaPesos").textContent =
        turma.getMediaPesos().toFixed(2);
}
function atualizarTabela() {
    tabelaAlunos.innerHTML = "";
    turma.alunos.forEach(aluno => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${aluno.id}</td>
            <td>${aluno.nomeCompleto}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.altura}</td>
            <td>${aluno.peso}</td>
            <td>
                <button class="editar" onclick="editarAluno(${aluno.id})">
                    Editar
                </button>

                <button class="excluir" onclick="excluirAluno(${aluno.id})">
                    Excluir
                </button>
            </td>
        `;
        tabelaAlunos.appendChild(linha);
    });
    atualizarEstatisticas();
}
function limparFormulario() {
    nomeInput.value = "";
    idadeInput.value = "";
    alturaInput.value = "";
    pesoInput.value = "";
    idEdicao = null;
    btnSalvar.textContent = "Adicionar Aluno";
}
btnSalvar.addEventListener("click", () => {
    const nome = nomeInput.value;
    const idade = Number(idadeInput.value);
    const altura = Number(alturaInput.value);
    const peso = Number(pesoInput.value);
    if (nome === "" ||
        idade <= 0 ||
        altura <= 0 ||
        peso <= 0) {
        alert("Preencha todos os campos.");
        return;
    }
    if (idEdicao === null) {
        const aluno = new Aluno(Date.now(), nome, idade, altura, peso);
        turma.alunos.push(aluno);
    }
    else {
        const aluno = turma.alunos.find(a => a.id === idEdicao);
        if (aluno) {
            aluno.nomeCompleto = nome;
            aluno.idade = idade;
            aluno.altura = altura;
            aluno.peso = peso;
        }
    }
    atualizarTabela();
    limparFormulario();
});
window.editarAluno = (id) => {
    const aluno = turma.alunos.find(a => a.id === id);
    if (!aluno)
        return;
    nomeInput.value = aluno.nomeCompleto;
    idadeInput.value = aluno.idade.toString();
    alturaInput.value = aluno.altura.toString();
    pesoInput.value = aluno.peso.toString();
    idEdicao = id;
    btnSalvar.textContent = "Salvar Alterações";
};
window.excluirAluno = (id) => {
    const indice = turma.alunos.findIndex(aluno => aluno.id === id);
    if (indice !== -1) {
        turma.alunos.splice(indice, 1);
    }
    atualizarTabela();
};
atualizarTabela();

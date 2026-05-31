class Aluno {
    constructor(
        public id: number,
        public nomeCompleto: string,
        public idade: number,
        public altura: number,
        public peso: number
    ) {}
}

class Turma {
    constructor(
        public id: number,
        public nome: string,
        public listaDeAlunos: Aluno[] = []
    ) {}

    adicionarAluno(aluno: Aluno): void {
        this.listaDeAlunos.push(aluno);
    }

    editarAluno(id: number, dadosAtualizados: Partial<Aluno>): void {
        const index = this.listaDeAlunos.findIndex(a => a.id === id);
        if (index !== -1) {
            this.listaDeAlunos[index] = { ...this.listaDeAlunos[index], ...dadosAtualizados };
        }
    }

    removerAluno(id: number): void {
        this.listaDeAlunos = this.listaDeAlunos.filter(a => a.id !== id);
    }

    getNumAlunos(): number {
        return this.listaDeAlunos.length;
    }

    getMediaIdades(): number {
        if (this.getNumAlunos() === 0) return 0;
        const soma = this.listaDeAlunos.reduce((acc, aluno) => acc + aluno.idade, 0);
        return soma / this.getNumAlunos();
    }

    getMediaAlturas(): number {
        if (this.getNumAlunos() === 0) return 0;
        const soma = this.listaDeAlunos.reduce((acc, aluno) => acc + aluno.altura, 0);
        return soma / this.getNumAlunos();
    }

    getMediaPesos(): number {
        if (this.getNumAlunos() === 0) return 0;
        const soma = this.listaDeAlunos.reduce((acc, aluno) => acc + aluno.peso, 0);
        return soma / this.getNumAlunos();
    }
}

const turma = new Turma(1, "Educação Física");
let proximoId = 1;

const form = document.getElementById('aluno-form') as HTMLFormElement;
const inputId = document.getElementById('aluno-id') as HTMLInputElement;
const inputNome = document.getElementById('nome') as HTMLInputElement;
const inputIdade = document.getElementById('idade') as HTMLInputElement;
const inputAltura = document.getElementById('altura') as HTMLInputElement;
const inputPeso = document.getElementById('peso') as HTMLInputElement;
const btnCancel = document.getElementById('cancel-btn') as HTMLButtonElement;
const formTitle = document.getElementById('form-title') as HTMLHeadingElement;

const statTotal = document.getElementById('stat-total') as HTMLSpanElement;
const statIdade = document.getElementById('stat-idade') as HTMLSpanElement;
const statAltura = document.getElementById('stat-altura') as HTMLSpanElement;
const statPeso = document.getElementById('stat-peso') as HTMLSpanElement;
const tbody = document.getElementById('alunos-tbody') as HTMLTableSectionElement;

function atualizarDisplay(): void {
    statTotal.textContent = turma.getNumAlunos().toString();
    statIdade.textContent = turma.getMediaIdades().toFixed(1);
    statAltura.textContent = turma.getMediaAlturas().toFixed(2);
    statPeso.textContent = turma.getMediaPesos().toFixed(1);
    renderizarTabela();
}

function renderizarTabela(): void {
    tbody.innerHTML = '';
    turma.listaDeAlunos.forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nomeCompleto}</td>
            <td>${aluno.idade}</td>
            <td>${aluno.altura.toFixed(2)}</td>
            <td>${aluno.peso.toFixed(1)}</td>
            <td>
                <button class="btn-edit" onclick="prepararEdicao(${aluno.id})">Editar</button>
                <button class="btn-delete" onclick="apagarAluno(${aluno.id})">Apagar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const idAtual = inputId.value ? parseInt(inputId.value) : null;
    const nome = inputNome.value;
    const idade = parseInt(inputIdade.value);
    const altura = parseFloat(inputAltura.value);
    const peso = parseFloat(inputPeso.value);

    if (idAtual) {
        turma.editarAluno(idAtual, { nomeCompleto: nome, idade, altura, peso });
    } else {
        const novoAluno = new Aluno(proximoId++, nome, idade, altura, peso);
        turma.adicionarAluno(novoAluno);
    }

    limparFormulario();
    atualizarDisplay();
});

btnCancel.addEventListener('click', limparFormulario);

(window as any).prepararEdicao = (id: number) => {
    const aluno = turma.listaDeAlunos.find(a => a.id === id);
    if (aluno) {
        inputId.value = aluno.id.toString();
        inputNome.value = aluno.nomeCompleto;
        inputIdade.value = aluno.idade.toString();
        inputAltura.value = aluno.altura.toString();
        inputPeso.value = aluno.peso.toString();
        formTitle.textContent = "Editar Aluno";
        btnCancel.style.display = "inline-block";
    }
};

(window as any).apagarAluno = (id: number) => {
    if (confirm("Tem certeza que deseja apagar este aluno?")) {
        turma.removerAluno(id);
        atualizarDisplay();
    }
};

function limparFormulario(): void {
    form.reset();
    inputId.value = '';
    formTitle.textContent = "Adicionar Aluno";
    btnCancel.style.display = "none";
}

atualizarDisplay();
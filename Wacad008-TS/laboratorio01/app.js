"use strict";
class GerenciadorLembretes {
    lembretes = [];
    adicionar(lembrete) {
        this.lembretes.push(lembrete);
    }
    remover(id) {
        this.lembretes = this.lembretes.filter(lembrete => lembrete[0] !== id);
    }
    buscar(id) {
        return this.lembretes.find(lembrete => lembrete[0] === id);
    }
    atualizar(id, titulo, prazo, descricao) {
        const indice = this.lembretes.findIndex(lembrete => lembrete[0] === id);
        if (indice !== -1) {
            this.lembretes[indice] = [
                id,
                titulo,
                this.lembretes[indice][2],
                prazo,
                descricao
            ];
        }
    }
    listar() {
        return this.lembretes;
    }
}
const gerenciador = new GerenciadorLembretes();
let contadorId = 1;
const tituloTxt = document.querySelector('#tituloTxt');
const dataFim = document.querySelector('#dataFim');
const descTxt = document.querySelector('#descTxt');
const lembreteId = document.querySelector('#lembreteId');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');
const divLista = document.querySelector('#lista');
function atualizarTela() {
    divLista.innerHTML = '';
    const lembretes = gerenciador.listar();
    if (lembretes.length === 0) {
        divLista.innerHTML =
            '<p>Sem lembretes!</p>';
        return;
    }
    lembretes.forEach(lembrete => {
        const [id, titulo, dataCriacao, prazo, descricao] = lembrete;
        const div = document.createElement('div');
        div.className = 'card';
        let html = `
            <h3>${titulo}</h3>
            <small>
                Criado em:
                ${dataCriacao.toLocaleString()}
            </small><br>
        `;
        if (prazo) {
            html += `
                <small>
                    <b>Prazo:</b>
                    ${prazo.toLocaleString()}
                </small><br>
            `;
        }
        if (descricao) {
            html += `<p>${descricao}</p>`;
        }
        div.innerHTML = html;
        const btnEditar = document.createElement('button');
        btnEditar.className =
            'btn btn-edit';
        btnEditar.innerText =
            'Editar';
        btnEditar.onclick =
            () => carregarEdicao(id);
        const btnExcluir = document.createElement('button');
        btnExcluir.className =
            'btn btn-danger';
        btnExcluir.innerText =
            'Excluir';
        btnExcluir.onclick = () => {
            if (confirm('Deseja apagar?')) {
                gerenciador.remover(id);
                atualizarTela();
            }
        };
        div.appendChild(btnEditar);
        div.appendChild(btnExcluir);
        divLista.appendChild(div);
    });
}
function limparFormulario() {
    lembreteId.value = '';
    tituloTxt.value = '';
    dataFim.value = '';
    descTxt.value = '';
    btnSave.innerText = 'Salvar';
    btnCancel.style.display =
        'none';
}
function carregarEdicao(id) {
    const lembrete = gerenciador.buscar(id);
    if (!lembrete)
        return;
    lembreteId.value =
        lembrete[0].toString();
    tituloTxt.value =
        lembrete[1];
    if (lembrete[3]) {
        const data = lembrete[3];
        const offset = data.getTimezoneOffset() * 60000;
        dataFim.value =
            new Date(data.getTime() - offset)
                .toISOString()
                .slice(0, 16);
    }
    else {
        dataFim.value = '';
    }
    descTxt.value =
        lembrete[4] || '';
    btnSave.innerText =
        'Atualizar';
    btnCancel.style.display =
        'inline-block';
}
btnSave.addEventListener('click', () => {
    const titulo = tituloTxt.value.trim();
    if (!titulo) {
        alert('Faltou o título!');
        return;
    }
    const prazo = dataFim.value
        ? new Date(dataFim.value)
        : undefined;
    const descricao = descTxt.value.trim() || undefined;
    if (lembreteId.value) {
        gerenciador.atualizar(Number(lembreteId.value), titulo, prazo, descricao);
    }
    else {
        gerenciador.adicionar([
            contadorId++,
            titulo,
            new Date(),
            prazo,
            descricao
        ]);
    }
    limparFormulario();
    atualizarTela();
});
btnCancel.addEventListener('click', limparFormulario);
atualizarTela();

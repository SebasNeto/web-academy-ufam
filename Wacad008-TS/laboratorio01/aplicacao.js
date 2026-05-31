"use strict";
let db = [];
let countId = 1;
const tituloTxt = document.querySelector('#tituloTxt');
const dataFim = document.querySelector('#dataFim');
const descTxt = document.querySelector('#descTxt');
const lembreteId = document.querySelector('#lembreteId');
const btnSave = document.querySelector('#btnSave');
const btnCancel = document.querySelector('#btnCancel');
const divLista = document.querySelector('#lista');
const atualizarTela = () => {
    divLista.innerHTML = '';
    if (db.length === 0) {
        divLista.innerHTML = '<p>Sem lembretes!</p>';
        return;
    }
    db.forEach(item => {
        const [id, titulo, dataCriacao, prazo, texto] = item;
        const div = document.createElement('div');
        div.className = 'card';
        let html = `<h3>${titulo}</h3>`;
        html += `<small>Criado em: ${dataCriacao.toLocaleString()}</small><br>`;
        if (prazo)
            html += `<small><b>Prazo:</b> ${prazo.toLocaleString()}</small><br>`;
        if (texto)
            html += `<p>${texto}</p>`;
        div.innerHTML = html;
        const btnE = document.createElement('button');
        btnE.className = 'btn btn-edit';
        btnE.innerText = 'Editar';
        btnE.style.marginRight = '5px';
        btnE.onclick = () => carregarParaEdicao(id);
        const btnD = document.createElement('button');
        btnD.className = 'btn btn-danger';
        btnD.innerText = 'Excluir';
        btnD.onclick = () => {
            if (confirm('Deseja apagar?')) {
                db = db.filter(x => x[0] !== id);
                atualizarTela();
            }
        };
        div.appendChild(btnE);
        div.appendChild(btnD);
        divLista.appendChild(div);
    });
};
const resetarForm = () => {
    lembreteId.value = '';
    tituloTxt.value = '';
    dataFim.value = '';
    descTxt.value = '';
    btnSave.innerText = 'Salvar';
    btnCancel.style.display = 'none';
};
const carregarParaEdicao = (id) => {
    const item = db.find(x => x[0] === id);
    if (!item)
        return;
    lembreteId.value = item[0].toString();
    tituloTxt.value = item[1];
    if (item[3]) {
        const d = item[3];
        const offset = d.getTimezoneOffset() * 60000;
        dataFim.value = (new Date(d.getTime() - offset)).toISOString().slice(0, 16);
    }
    else {
        dataFim.value = '';
    }
    descTxt.value = item[4] || '';
    btnSave.innerText = 'Atualizar';
    btnCancel.style.display = 'inline-block';
};
btnSave.addEventListener('click', () => {
    const tit = tituloTxt.value.trim();
    if (!tit) {
        alert('Faltou o título!');
        return;
    }
    const dFim = dataFim.value ? new Date(dataFim.value) : undefined;
    const desc = descTxt.value.trim() || undefined;
    const editandoId = lembreteId.value;
    if (editandoId) {
        const currentId = Number(editandoId);
        const idx = db.findIndex(x => x[0] === currentId);
        if (idx > -1) {
            db[idx] = [currentId, tit, db[idx][2], dFim, desc];
        }
    }
    else {
        db.push([countId++, tit, new Date(), dFim, desc]);
    }
    resetarForm();
    atualizarTela();
});
btnCancel.addEventListener('click', resetarForm);
atualizarTela();

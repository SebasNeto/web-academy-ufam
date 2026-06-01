
type TuplaLembrete = [
    number,
    string,
    Date,
    Date | undefined,
    string | undefined
];

class GerenciadorLembretes {

    private lembretes: TuplaLembrete[] = [];

    adicionar(lembrete: TuplaLembrete): void {
        this.lembretes.push(lembrete);
    }

    remover(id: number): void {
        this.lembretes = this.lembretes.filter(
            lembrete => lembrete[0] !== id
        );
    }

    buscar(id: number): TuplaLembrete | undefined {
        return this.lembretes.find(
            lembrete => lembrete[0] === id
        );
    }

    atualizar(
        id: number,
        titulo: string,
        prazo?: Date,
        descricao?: string
    ): void {

        const indice = this.lembretes.findIndex(
            lembrete => lembrete[0] === id
        );

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

    listar(): TuplaLembrete[] {
        return this.lembretes;
    }
}

const gerenciador = new GerenciadorLembretes();

let contadorId = 1;

const tituloTxt =
    document.querySelector('#tituloTxt') as HTMLInputElement;

const dataFim =
    document.querySelector('#dataFim') as HTMLInputElement;

const descTxt =
    document.querySelector('#descTxt') as HTMLTextAreaElement;

const lembreteId =
    document.querySelector('#lembreteId') as HTMLInputElement;

const btnSave =
    document.querySelector('#btnSave') as HTMLButtonElement;

const btnCancel =
    document.querySelector('#btnCancel') as HTMLButtonElement;

const divLista =
    document.querySelector('#lista') as HTMLDivElement;

function atualizarTela(): void {

    divLista.innerHTML = '';

    const lembretes = gerenciador.listar();

    if (lembretes.length === 0) {

        divLista.innerHTML =
            '<p>Sem lembretes!</p>';

        return;
    }

    lembretes.forEach(lembrete => {

        const [
            id,
            titulo,
            dataCriacao,
            prazo,
            descricao
        ] = lembrete;

        const div =
            document.createElement('div');

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

        const btnEditar =
            document.createElement('button');

        btnEditar.className =
            'btn btn-edit';

        btnEditar.innerText =
            'Editar';

        btnEditar.onclick =
            () => carregarEdicao(id);

        const btnExcluir =
            document.createElement('button');

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

function limparFormulario(): void {

    lembreteId.value = '';
    tituloTxt.value = '';
    dataFim.value = '';
    descTxt.value = '';

    btnSave.innerText = 'Salvar';

    btnCancel.style.display =
        'none';
}

function carregarEdicao(id: number): void {

    const lembrete =
        gerenciador.buscar(id);

    if (!lembrete) return;

    lembreteId.value =
        lembrete[0].toString();

    tituloTxt.value =
        lembrete[1];

    if (lembrete[3]) {

        const data =
            lembrete[3];

        const offset =
            data.getTimezoneOffset() * 60000;

        dataFim.value =
            new Date(data.getTime() - offset)
                .toISOString()
                .slice(0, 16);

    } else {

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

    const titulo =
        tituloTxt.value.trim();

    if (!titulo) {

        alert('Faltou o título!');
        return;
    }

    const prazo =
        dataFim.value
            ? new Date(dataFim.value)
            : undefined;

    const descricao =
        descTxt.value.trim() || undefined;

    if (lembreteId.value) {

        gerenciador.atualizar(
            Number(lembreteId.value),
            titulo,
            prazo,
            descricao
        );

    } else {

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

btnCancel.addEventListener(
    'click',
    limparFormulario
);

atualizarTela();
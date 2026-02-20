// 1. ESTADO DA APLICAÇÃO
let meusRanks = [
    { titulo: "APEX CHARACTERS", ranks: [{ l: "T0", c: "s-rank" }, { l: "T0,5", c: "a-rank" }] },
    { titulo: "META CHARACTERS", ranks: [{ l: "T1", c: "b-rank" }, { l: "T1,5", c: "c-rank" }] },
    { titulo: "OFF-META CHARACTERS", ranks: [{ l: "T2", c: "d-rank" }, { l: "T3" }] } // Ajustado para f-rank
];
let colunasAtuais = 1;
const totalPersonagens = 115;

// Seletores
const inputImagens = document.getElementById('image-input');
const containerFotos = document.getElementById('image-storage') || document.getElementById('image-storage');
const board = document.getElementById('board');

// 2. FUNÇÃO AUXILIAR PARA DRAG START (CORRIGINDO O ERRO)
function configurarDrag(elemento) {
    elemento.addEventListener('dragstart', (e) => {
        if (!elemento.id) elemento.id = 'img-' + Date.now() + Math.random();
        e.dataTransfer.setData("text/plain", e.target.id);
        elemento.classList.add('dragging');
    });

    elemento.addEventListener('dragend', () => {
        elemento.classList.remove('dragging');
    });
}

// 3. FUNÇÃO PARA CRIAR A IMAGEM
function criarElementoImagem(src) {
    const novaImg = document.createElement('img');
    novaImg.src = src;
    novaImg.className = 'personagem-item';
    novaImg.draggable = true;

    configurarDrag(novaImg);

    // LÓGICA DE DUPLICAR (ALT + CLIQUE)
    novaImg.addEventListener('click', (e) => {
        if (e.altKey) {
            const copia = criarElementoImagem(novaImg.src);
            novaImg.parentElement.appendChild(copia);
            novaImg.style.transform = 'scale(1.2)';
            setTimeout(() => novaImg.style.transform = 'scale(1)', 100);
        }
    });

    return novaImg;
}

// 4. ESTRUTURA DO BOARD
function mudarColunas(numero) {
    colunasAtuais = numero;
    const imagensPosicionadas = document.querySelectorAll('.tier-items img');
    board.innerHTML = '';

    meusRanks.forEach((grupo) => {
        const sectionWrapper = document.createElement('div');
        sectionWrapper.className = 'tier-section-group';

        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-header';
        groupHeader.innerText = grupo.titulo;
        groupHeader.contentEditable = true;
        sectionWrapper.appendChild(groupHeader);

        const columnHeaderRow = document.createElement('div');
        columnHeaderRow.className = `column-header-row grid-${numero}`;

        for (let i = 1; i <= numero; i++) {
            const colTitle = document.createElement('div');
            colTitle.className = 'col-title-box';
            colTitle.innerText = i === 1 ? 'DPS' : i === 2 ? 'SUPPORT' : 'SUSTAIN';
            colTitle.contentEditable = true;
            columnHeaderRow.appendChild(colTitle);
        }
        sectionWrapper.appendChild(columnHeaderRow);

        const rowsContainer = document.createElement('div');
        rowsContainer.className = 'section-grid';

        grupo.ranks.forEach((rank) => {
            const row = criarLinha(rank, numero);
            rowsContainer.appendChild(row);
        });

        sectionWrapper.appendChild(rowsContainer);
        board.appendChild(sectionWrapper);
    });

    imagensPosicionadas.forEach(img => containerFotos.appendChild(img));
    atualizarDestinos();
}

function criarLinha(rank, numero) {
    const row = document.createElement('div');
    row.className = 'tier-row';

    const label = document.createElement('div');
    label.className = `tier-label ${rank.c || 'f-rank'}`; // Garante cor se o rank for vazio
    label.innerText = rank.l || 'F';
    label.contentEditable = true;

    // Seletor de Cor (Botão Direito)
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.display = 'none';
    label.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        colorPicker.click();
    });
    colorPicker.addEventListener('input', (e) => {
        label.style.background = e.target.value;
    });

    const dropContainer = document.createElement('div');
    dropContainer.className = `tier-drop-area grid-${numero}`;

    for (let i = 0; i < numero; i++) {
        const dropZone = document.createElement('div');
        dropZone.className = 'tier-items';
        dropContainer.appendChild(dropZone);
    }

    const btnExcluir = document.createElement('button');
    btnExcluir.className = 'remove-row-btn';
    btnExcluir.innerHTML = '🗑️';
    btnExcluir.onclick = function () {
        if (confirm('Deseja excluir esta linha?')) {
            const imagensNaLinha = row.querySelectorAll('.tier-items img');
            imagensNaLinha.forEach(img => containerFotos.appendChild(img));
            row.remove();
        }
    };

    row.appendChild(label);
    row.appendChild(colorPicker);
    row.appendChild(dropContainer);
    row.appendChild(btnExcluir);
    return row;
}

// 5. ATUALIZAR DESTINOS DE DROP
function atualizarDestinos() {
    const containersAlvo = document.querySelectorAll('.tier-items, #image-storage');
    containersAlvo.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            container.classList.add('drag-over');
        });
        
        container.addEventListener('dragleave', () => {
            container.classList.remove('drag-over');
        });
        
        container.addEventListener('drop', e => {
            e.preventDefault();
            container.classList.remove('drag-over');

            const idDaImagem = e.dataTransfer.getData("text/plain");
            const imagemArrastada = document.getElementById(idDaImagem);

            if (imagemArrastada) {
                container.appendChild(imagemArrastada);
            }
        });
    });
}

// 6. CARREGAMENTO AUTOMÁTICO DAS IMAGENS
function carregarTudoAutomatico() {
    if (!containerFotos) return;
    for (let i = 1; i <= totalPersonagens; i++) {
        const img = criarElementoImagem(`img/p (${i}).webp`);
        containerFotos.appendChild(img);
    }
}

// 7. FUNÇÕES DOS BOTÕES DO HTML
function adicionarLinha() {
    meusRanks[meusRanks.length - 1].ranks.push({ l: "?", c: "f-rank" });
    mudarColunas(colunasAtuais);
    salvarProgresso();
}
function resetarTierList() {
    if (confirm('Resetar tudo?')) {
        location.reload();
    }
}

// 8. INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    carregarTudoAutomatico();
    mudarColunas(1);
});
// 9. FUNÇÃO PARA GERAR A IMAGEM DA TIER LIST
function salvarComoImagem() {
    const areaTierList = document.getElementById('board');

    // 1. Esconde as lixeiras temporariamente para o print ficar limpo
    const lixeiras = document.querySelectorAll('.remove-row-btn');
    lixeiras.forEach(btn => btn.style.display = 'none');

    // 2. Executa a captura
    html2canvas(areaTierList, {
        backgroundColor: "#0b0b0c", 
        scale: 2,                  
        useCORS: true,   
        allowTaint: true
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = 'minha-tierlist.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).finally(() => {
        // 3. Mostra as lixeiras de volta
        lixeiras.forEach(btn => btn.style.display = 'flex');
    });
}
// 5. ATUALIZAR DESTINOS COM ORDENAÇÃO DINÂMICA
function atualizarDestinos() {
    const containersAlvo = document.querySelectorAll('.tier-items, #image-storage');

    containersAlvo.forEach(container => {
        container.addEventListener('dragover', e => {
            e.preventDefault();
            const imagemSendoArrastada = document.querySelector('.dragging');
            if (!imagemSendoArrastada) return;

            const elementoApos = getElementoApos(container, e.clientX, e.clientY);

            if (elementoApos == null) {
                container.appendChild(imagemSendoArrastada);
            } else {
                container.insertBefore(imagemSendoArrastada, elementoApos);
            }
        });

        // Adicione isso para limpar o estado visual quando soltar
        container.addEventListener('drop', () => {
            salvarProgresso();
        });
    });
}

//Calcula quem deve abrir espaço
function getElementoApos(container, x, y) {
    const elementos = [
        ...container.querySelectorAll('.personagem-item:not(.dragging)')
    ];

    let elementoMaisProximo = null;
    let menorDistancia = Number.POSITIVE_INFINITY;
    
    elementos.forEach(el => {
        const box = el.getBoundingClientRect();
        const centroX = box.left + box.width / 2;
        const centroY = box.top + box.height / 2;
        const distancia = Math.hypot(
            x - centroX,
            y - centroY
        );

        if (distancia < menorDistancia) {
            menorDistancia = distancia;
            elementoMaisProximo = el;
        }
    });

    if (!elementoMaisProximo) return null;

    const box = elementoMaisProximo.getBoundingClientRect();
    if (x > box.left + box.width / 2) {
        return elementoMaisProximo.nextSibling;
    }

    return elementoMaisProximo;
}
function configurarDrag(elemento) {
    elemento.addEventListener('dragstart', (e) => {
        if (!elemento.id) elemento.id = 'img-' + Date.now() + Math.random();
        e.dataTransfer.setData("text/plain", e.target.id);
        elemento.classList.add('dragging');
    });

    elemento.addEventListener('dragend', () => {
        elemento.classList.remove('dragging');
    });
}

function salvarProgresso() {
    const dadosParaSalvar = [];
    const linhas = document.querySelectorAll('.tier-row');

    linhas.forEach(linha => {
        const rankLabel = linha.querySelector('.tier-label').innerText;
        const boxes = linha.querySelectorAll('.tier-items');
        const imagensPorBox = [];

        boxes.forEach(box => {
            const imagens = [...box.querySelectorAll('img')].map(img => img.src);
            imagensPorBox.push(imagens);
        });
        dadosParaSalvar.push({
            rank: rankLabel,
            fotos: imagensPorBox
        });
    });
    localStorage.setItem('minhaTierListGenshin', JSON.stringify(dadosParaSalvar));
}

function carregarProgresso() {
    const save = localStorage.getItem('minhaTierListGenshin');
    if (!save) return;

    const dados = JSON.parse(save);
    const linhas = document.querySelectorAll('.tier-row');

    dados.forEach((dadosLinha, index) => {
        if (linhas[index]) {
            const boxes = linhas[index].querySelectorAll('.tier-items');
            dadosLinha.fotos.forEach((listaFotos, boxIndex) => {
                listaFotos.forEach(src => {
                    const img = criarElementoImagem(src);
                    boxes[boxIndex].appendChild(img);

                    const originalNoBanco = [...containerFotos.querySelectorAll('img')].find(i => i.src === src);
                    if (originalNoBanco) originalNoBanco.remove();
                });
            });
        }
    });

}

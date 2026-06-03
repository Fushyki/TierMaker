<div align="center">

# ⚔️ TIER LIST — by Fushyki

**Ranqueie. Organize. Domine.**

[![Abrir Tier List](https://img.shields.io/badge/▶%20ABRIR%20TIER%20LIST-ffd700?style=for-the-badge&logoColor=black)](https://fushyki.github.io/TierMaker/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222?style=for-the-badge&logo=github&logoColor=white)

</div>

---

## ✨ O que é isso?

Uma **tier list interativa** feita do zero, rodando direto no navegador — sem login, sem servidor, sem frescura. Arrasta, solta, organiza e exporta. Simples assim.

Construída especialmente para ranquear personagens divididos em categorias como **Apex**, **Meta** e **Off-Meta**, com visual dark e sistema de colunas para diferentes builds (DPS / Support / Sustain).

---

## 🚀 Funcionalidades

| Recurso                   | Descrição                                                                 |
| ------------------------- | ------------------------------------------------------------------------- |
| 🖱️ **Drag & Drop**        | Arraste qualquer personagem para qualquer tier                            |
| 📂 **Carregar Imagens**   | Adicione qualquer arquivo de imagem pelo botão ou coloque na pasta `img/` |
| 🔢 **Colunas dinâmicas**  | Alterne entre 1, 2 ou 3 colunas (ex: DPS / Support / Sustain)             |
| 🏷️ **Labels editáveis**   | Clique em qualquer texto da tier para renomear                            |
| 🎨 **Cor customizável**   | Clique com o botão direito no label do tier para trocar a cor             |
| ➕ **Adicionar linhas**   | Crie novas linhas de rank na hora                                         |
| 🗑️ **Remover linhas**     | Exclui a linha e devolve os personagens ao inventário                     |
| 📋 **Duplicar card**      | `ALT + Clique` em qualquer imagem para criar uma cópia                    |
| 🔤 **Ordenar inventário** | Ordene por Nome A→Z, Nome Z→A ou ordem de upload                          |
| 💾 **Salvar como imagem** | Exporta a tier list como `.png` para compartilhar                         |

---

## 📂 Como adicionar personagens

### Opção 1 — Pasta `img/` (carregamento automático)

Coloque seus arquivos na pasta `img/` seguindo o padrão de nome:

```
img/
├── p (1).webp
├── p (2).webp
├── p (3).webp
└── ...
```

O site detecta automaticamente quantos arquivos existem — não precisa editar nenhum código.

### Opção 2 — Botão de upload

Clique em **＋ Adicionar Imagens** no inventário e selecione qualquer arquivo de imagem (`.webp`, `.png`, `.jpg`, `.gif`...). Pode selecionar vários de uma vez.

---

## 🗂️ Estrutura do Projeto

```
TierMaker/
├── index.html       # Estrutura da página
├── style.css        # Tema dark + layout
├── script.js        # Toda a lógica (drag-drop, upload, ordenação)
└── img/
    ├── p (1).webp
    ├── p (2).webp
    └── ...
```

---

## 🛠️ Tecnologias

- **HTML5 & CSS3** — estrutura e tema dark com gradientes
- **JavaScript puro** — drag-and-drop nativo, FileReader API, ordenação dinâmica
- **[html2canvas](https://html2canvas.hertzen.com/)** — exportação da tier list como imagem
- **GitHub Pages** — hospedagem estática gratuita

---

<div align="center">

feito por **Fushyki** · [github.io/TierMaker](https://fushyki.github.io/TierMaker/)

</div>

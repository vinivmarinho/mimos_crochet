# Frontend — Sistema de Crochê

Este diretório contém o frontend do Sistema de Crochê, desenvolvido com **React + TypeScript + Vite**.

A aplicação é responsável pela interface do sistema e pela comunicação com a API do backend.

## 📁 Estrutura do projeto

```text
frontend/
│
├── src/
│   │
│   ├── components/
│   │   └── Componentes reutilizáveis da interface.
│   │
│   ├── pages/
│   │   └── Páginas principais do sistema.
│   │
│   ├── App.tsx
│   │   └── Componente principal da aplicação.
│   │
│   └── main.tsx
│       └── Ponto de entrada da aplicação React.
│
├── package.json
│   └── Dependências e scripts do projeto.
│
├── tsconfig.json
│   └── Configurações do TypeScript.
│
└── vite.config.ts
    └── Configurações do Vite.
``` 

## 📂 Organização

### `src/assets`

Contém arquivos estáticos utilizados pela aplicação, como imagens, ícones e outros recursos visuais.

### `src/components`

Contém componentes reutilizáveis da interface.

Exemplos:

* Header
* Sidebar
* Modal
* Button
* Card

### `src/pages`

Contém as principais páginas do sistema.

Cada página representa uma tela ou uma parte principal da aplicação.


### `src/App.tsx`

Componente principal da aplicação React. É responsável por organizar a estrutura principal da aplicação e suas rotas, quando utilizadas.

### `src/main.tsx`

Ponto de entrada do React. É responsável por inicializar a aplicação e renderizar o componente `App`.



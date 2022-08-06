<h1 align="center">
     Módulo 6: gestão de saúde avançada
</h1>

<h4 align="center">
	🚧 Em progresso 🚧
</h4>

# Tabela de conteúdos

- [Tabela de conteúdos](#tabela-de-conteúdos)
  - [💻 Sobre o projeto](#-sobre-o-projeto)
  - [🚀 Como executar o projeto](#-como-executar-o-projeto)
    - [1º Método: DevContainer](#1º-método-devcontainer)
      - [⚙️ Pré Requisitos](#️-pré-requisitos)
      - [🎲 Rodando o projeto](#-rodando-o-projeto)
    - [2º Método: Docker](#2º-método-docker)
      - [⚙️ Pré Requisitos](#️-pré-requisitos-1)
      - [🎲 Rodando o projeto](#-rodando-o-projeto-1)
    - [3º Método: Npm](#3º-método-npm)
      - [⚙️ Pré Requisitos](#️-pré-requisitos-2)
      - [🎲 Rodando o projeto](#-rodando-o-projeto-2)
  - [🛠 Tecnologias](#-tecnologias)
  - [🦸🤌 Autores](#-autores)
  - [📝 Licença](#-licença)

## 💻 Sobre o projeto

Sistema para gestão de saúde avançada pensada para utilização de clientes de
médicos especializados em endocrinologia.

---

## 🚀 Como executar o projeto

Utilizando qualquer um dos métodos abaixo, a aplicação irá rodar na porta 3000.

### 1º Método: DevContainer

#### ⚙️ Pré Requisitos

- Visual Studio Code
- Extensão Remote Containers para o Visual Studio Code
- Docker / Docker Compose

#### 🎲 Rodando o projeto

Como o vscode estará gerenciando o container da aplicação. Basta rodar o comando    
```npm run dev``` e a aplicação irá rodar.

### 2º Método: Docker

#### ⚙️ Pré Requisitos

- Docker / Docker Compose

#### 🎲 Rodando o projeto

Para subir o container basta rodar o comando ```docker-compose up```, talvez seja necessário rodar ```chmod +x ./entrypoint.sh``` para que o docker seja capaz de executar o script. Uma vez com o container de pé, assim como no anterior rode o comando ```npm run dev``` dentro do container

### 3º Método: Npm

#### ⚙️ Pré Requisitos

- Node
- Npm

#### 🎲 Rodando o projeto

Para baixar as dependências do projeto, rode o comando ```npm i``` e inicie a aplicação com o comando ```npm run dev```

---

## 🛠 Tecnologias

- Vue 3
- Typescript
- Tailwind CSS
- Docker
- Visual Studio Code

---

## 🦸🤌 Autores

<div style="display: flex; justify-content: space-around;">
<div style="display: inline">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/56683006?s=400&u=b3558a3c0d46f8694bbea4f4f36223c70348a985&v=4" width="100px;" alt=""/>
 <br />
 <a><sub><b>Cinthia M. N. Ungefehr</b></sub></a>
 <br />
 
[![Linkedin Badge](https://img.shields.io/badge/-Cinthia-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/cinthia-ungefehr-053898146/)](https://www.linkedin.com/in/cinthia-ungefehr-053898146/)
[![Gmail Badge](https://img.shields.io/badge/-ciin.nagahama@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ciin.nagahama@gmail.com)](mailto:ciin.nagahama@gmail.com)

<div style="display: flex; justify-content: space-around;">
<div style="display: inline">
 <img style="border-radius: 50%;" src="https://avatars1.githubusercontent.com/u/52057913?s=400&u=222dffcab5586f0eb4efcbff06caa868450f6b8a&v=4" width="100px;" alt=""/>
 <br />
 <a><sub><b>Ellian Aragão Dias</b></sub></a>
 <br />
 
[![Linkedin Badge](https://img.shields.io/badge/-Ellian-blue?style=flat-square&logo=Linkedin&logoColor=white&link=linkedin.com/in/ellian-aragao-dias)](linkedin.com/in/ellian-aragao-dias)
[![Gmail Badge](https://img.shields.io/badge/-ellian.aragao@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ellian.aragao@gmail.com)](mailto:ellian.aragao@gmail.com)

<div style="display: flex; justify-content: space-around;">
<div style="display: inline">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/51230543?v=4" width="100px;" alt=""/>
 <br />
 <a><sub><b>Henrique Tavares Aguiar</b></sub></a>
 <br />
 
[![Linkedin Badge](https://img.shields.io/badge/-Henrique-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/henrique-tavares-6b1907193/)](https://www.linkedin.com/in/henrique-tavares-6b1907193/)
[![Gmail Badge](https://img.shields.io/badge/-ricktavares76@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ricktavares76@gmail.com)](mailto:ricktavares76@gmail.com)

---

## 📝 Licença

Este projeto esta sobre a licença [MIT](./LICENSE).

Feito por Cinthia M. N. Ungefehr, Ellian Aragão Dias e Henrique Tavares 👋🏽

---

<h1 align="center"> Teste Full-Stack JS</h1>

# Uso

## Pre-requisitos

Para iniciar esse projeto é necessário primeiramente instalar todas as dependências e tecnologias para executar o ambiente de desenvolvimento.

- [Node](https://nodejs.org/en/) & NPM/[Yarn](https://yarnpkg.com/)
- [Docker](https://docs.docker.com/engine/install/) & [Docker-compose](https://docs.docker.com/compose/install/)

### Instalar dependências

```sh
# Instalar com NPM
$ npm install
```
ou
```sh
# Instalar com Yarn
$ yarn
```

## Execução

Após o download de todas as tecnologias e dependências, basta seguir esses passos:

1. Execute o docker-compose:
```sh
$ docker-compose up
```
2. Copie o arquivo env.example e coloque os valores corretos para as variáveis de ambiente:
```sh
$ cp .env.example .env
```
3. Execute o projeto em modo de desenvolvimento:
```sh
npm run dev
# ou
yarn dev
```

## TDD

Esse projeto foi todo desenvolvido utilizando a metodologia de desenvolvimento Test Drive Development, por isso também foram adicionados alguns testes de integração. Para executar os testes, basta utilizar o seguinte comando: ``` npm run test ``` ou ``` yarn test ```.

## Tecnologias utilizadas

- [X] NodeJS com Typescript;
- [X] ExpressJS;
- [X] Mongodb;
- [X] Docker e Docker-compose;
- [X] Jest com Supertest (Testes);
- [X] ESLint e Editorconfig;
- [X] Husky e Lint-Staged;

## UI

O Frontend desse projeto foi desenvolvido com ReactJS e ele se encontra nesse repositório: https://github.com/hdev14/teste-hygia-frontend.






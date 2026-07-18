# Blueprint UI

Front-end da plataforma de cadastro e mapeamento de acoes relacionadas aos Objetivos de Desenvolvimento Sustentavel para a Embratur.

## Stack

- Vue 3 com Composition API
- TypeScript
- Vue Router
- Pinia
- Tailwind CSS 4
- Vite

## Desenvolvimento

```sh
npm install
npm run dev
```

Para validar tipos e gerar o bundle de producao:

```sh
npm run build
```

## Rotas

- `/`: pagina inicial e indicadores
- `/acoes`: catalogo de acoes
- `/agentes`: catalogo de entidades participantes
- `/ods`: grade de Objetivos de Desenvolvimento Sustentavel

## Arquitetura

O codigo e organizado por feature. Cada dominio possui seus proprios componentes, composables, dados mockados, services e tipos:

```text
src/
  app/               # bootstrap, layouts e providers
  features/          # dashboard, actions, agents e sdgs
  shared/
    api/             # cliente HTTP e contratos comuns de resposta
    components/      # componentes de composicao compartilhados
    composables/     # logica reutilizavel sem dependencia visual
    domain/          # tipos de dominio compartilhados
    navigation/      # configuracao da navegacao
    ui/              # primitives do design system
```

O fluxo esperado e `Page -> Composable -> Service -> API`. As paginas cuidam da composicao visual, os composables concentram estado e filtros, e os services implementam acesso a dados com retornos tipados por `ApiResponse<T>`.

## Fonte de dados

Enquanto a API nao estiver conectada, a aplicacao usa services mockados tipados. A fonte pode ser alterada por variaveis de ambiente:

```sh
VITE_DATA_SOURCE=mock
VITE_API_BASE_URL=/api
```

Use `VITE_DATA_SOURCE=api` para ativar os endpoints HTTP definidos nos services de cada feature.

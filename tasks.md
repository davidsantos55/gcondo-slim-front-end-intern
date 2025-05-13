# Ticket #456

<!-- Contexto -->
# Problemas encontrados ao configurar ambiente local

Durante a configuração inicial do ambiente com Docker, ocorreram os seguintes problemas:

### Erro: `ERR_PNPM_EACCES` ao instalar dependências no container do frontend

**Causa:** Conflito de permissões causado pela montagem do diretório `node_modules` da máquina no container.

**Solução:** Criado um arquivo `.dockerignore` dentro da pasta `client` com o seguinte conteúdo:

```
node_modules
dist
.vscode
```

### Outras alterações necessárias

- Excluído volume vazio na seção `nginx.volumes` do `docker-compose.yml`, que causava erro de validação.
- Frontend foi configurado para rodar corretamente com Vite dentro do container.
- O projeto foi validado localmente via VSCode antes da execução com Docker.

<!-- Tarefas -->

<!-- Tarefa 1 -->
- Melhorar tratamento de erros de validação de CEP e duplicidade de URL:
  - Em `client/src/services/Request.ts`, criado tipo `ExceptionResponse`, implementado `throw json as ExceptionResponse` em caso de `!response.ok`, e ajuste no `catch` para retornar erro estruturado.
  - Em `client/src/helpers/Service.helper.ts`, no `handleServiceError`, mapeados `Invalid ZIP code format` para mensagem "CEP inválido. Use apenas números (8 dígitos).", e `Duplicate entry` para "Já existe um condomínio com essa URL.".

<!-- Tarefa 2 -->

- Implementar gerenciamento de Unidades no front-end:

### Contexto:
Foi necessário criar toda a estrutura de CRUD no front-end para o recurso de "Unidades", incluindo contexto, componentes de formulário e página de listagem com ações de editar e excluir.

---

### Estrutura criada:

####  Pastas/Arquivos adicionados:
- `client/src/contexts/Units.context.tsx` → Contexto global de Unidades
- `client/src/components/Units/UnitFields.tsx` → Campos de formulário compartilhados
- `client/src/components/Units/CreateUnitModal.tsx` → Modal de criação
- `client/src/components/Units/EditUnitModal.tsx` → Modal de edição
- `client/src/components/Units/UnitsActionsCell.tsx` → Célula da tabela com ações (editar/excluir)
- `client/src/pages/Units.page.tsx` → Página principal de listagem de unidades

---

### Lógica implementada:

#### `Units.context.tsx`
- Implementado o `UnitsContextProvider`, que:
  - Realiza o fetch inicial das unidades (`listUnits`)
  - Armazena `unitId`, `isLoading`, `isCreateModalVisible`, `isEditModalVisible`
  - Fornece funções como `setUnitId`, `setIsCreateModalVisible`, `setIsEditModalVisible` e `fetchUnits`

#### `UnitFields.tsx`
- Componente com os campos necessários para cadastro/edição:
  - Select para `condominium_id`
  - Inputs para `name`, `square_meters`, `bedroom_count`
- Faz fetch de condomínios para popular o Select

#### `CreateUnitModal.tsx`
- Modal exibido ao clicar em “Cadastrar unidade”
- Utiliza o formulário `UnitFields`
- Ainda sem integração com API (estrutura e UI estão prontas)

#### `EditUnitModal.tsx`
- Recebe `unitId` do contexto
- Carrega os dados da unidade via `findUnit`
- Reutiliza `UnitFields` para edição

#### `UnitsActionsCell.tsx`
- Exibe ícones de “Editar” e “Excluir” na última coluna da tabela
- Usa o contexto para setar a unidade atual e abrir os modais
- Faz chamada à API com `deleteUnit`, com feedback visual

#### `Units.page.tsx`
- Renderiza:
  - Tabela de unidades (`Table` com colunas ID, nome, m², quartos, condomínio e ações)
  - Botão “Cadastrar unidade”
  - Modais de criação e edição
- Envolta em `UnitsContextProvider`

---

### Integração com roteador:

#### `client/src/router.tsx`
- Registrada nova rota:  
  ```tsx
  { path: '/units', element: <UnitsPage /> }

### Adicionado novo item ao menu lateral:

#### client/src/layouts/MainLayout.tsx:

const unitsItem: Item = {
  key: '/units',
  icon: <AppstoreAddOutlined />,
  label: 'Unidades',
  onClick: () => navigate('/units'),
};

<!-- Tarefa 3 -->
- Implementado painel de indicadores na Dashboard:

### Estruturas  criados:
- `Dashboard/Indicators.tsx`: mostra cards com total de condomínios, unidades, top 5 por m² e por quartos.

### Funcionalidade:
- Usa `listCondominiums()` e `listUnits()` para obter todos os dados.
- Ordena localmente e exibe as estatísticas em tabelas simples do Ant Design.

### Página afetada:
- `Dashboard.page.tsx`: renderiza `<Indicators />` abaixo da saudação.
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
<!-- Tarefa 2 -->
<!-- Tarefa 3 -->

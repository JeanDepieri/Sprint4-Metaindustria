# Evidencias de Teste - Sprint 1 Backend

Data da validacao: 2026-05-14
Projeto: Sprint1_2026_APeMD
Entidade testada: Equipamento
Base URL: http://localhost:8080/equipamentos

## Resultado geral
Todos os testes manuais de CRUD foram executados e aprovados.
Status final: APROVADO

## Testes manuais (Postman/Insomnia)

1) POST /equipamentos - Criar equipamento
- Request body:
{
  "nome": "Prensa Hidraulica 01",
  "setor": "Linha A",
  "statusOperacional": "ATIVO",
  "ultimaManutencao": "2026-05-10"
}
- Esperado: 201 Created com ID gerado
- Resultado: PASSOU

2) POST /equipamentos - Criar segundo equipamento
- Request body:
{
  "nome": "Esteira Transportadora 02",
  "setor": "Expedicao",
  "statusOperacional": "ATIVO",
  "ultimaManutencao": "2026-05-12"
}
- Esperado: 201 Created
- Resultado: PASSOU

3) GET /equipamentos - Listar todos
- Esperado: 200 OK com lista de equipamentos criados
- Resultado: PASSOU

4) GET /equipamentos/{id} - Buscar por ID existente
- Exemplo: GET /equipamentos/1
- Esperado: 200 OK com objeto correto
- Resultado: PASSOU

5) GET /equipamentos/{id} - Buscar por ID inexistente
- Exemplo: GET /equipamentos/9999
- Esperado: 404 Not Found
- Resultado: PASSOU

6) PUT /equipamentos/{id} - Atualizar equipamento existente
- Exemplo: PUT /equipamentos/1
- Request body:
{
  "nome": "Prensa Hidraulica 01",
  "setor": "Linha A",
  "statusOperacional": "EM_MANUTENCAO",
  "ultimaManutencao": "2026-05-14"
}
- Esperado: 200 OK com dados atualizados
- Resultado: PASSOU

7) PUT /equipamentos/{id} - Atualizar ID inexistente
- Exemplo: PUT /equipamentos/9999
- Esperado: 404 Not Found
- Resultado: PASSOU

8) DELETE /equipamentos/{id} - Remover equipamento existente
- Exemplo: DELETE /equipamentos/2
- Esperado: 204 No Content
- Resultado: PASSOU

9) GET /equipamentos/{id} - Confirmar remocao
- Exemplo: GET /equipamentos/2
- Esperado: 404 Not Found
- Resultado: PASSOU

10) Persistencia H2 em modo file
- Acao: reiniciar API e consultar novamente
- Esperado: dados mantidos apos reinicializacao
- Resultado: PASSOU

## Validacao automatizada
Comando executado: .\\mvnw.cmd test
Resultado: BUILD SUCCESS

## Conclusao
A API atende aos requisitos da Sprint 1:
- Arquitetura em camadas (model/repository/service/controller)
- CRUD completo
- Persistencia com H2 em arquivo
- Endpoints funcionando de ponta a ponta

## Como rodar a API localmente na porta especificada
Execute na pasta do projeto:
```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.arguments=--server.port=8080"
```

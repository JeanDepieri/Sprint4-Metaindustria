"""Teste real de CRUD/CORS. Requer API iniciada; remove somente seu registro temporário."""
import json
import sys
import urllib.request
import urllib.error

BASE = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080').rstrip('/')
# Não usar proxy externo para a API local.
client = urllib.request.build_opener(urllib.request.ProxyHandler({}))


def request(method, path, data=None, headers=None):
    payload = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(BASE + path, data=payload, method=method,
                                 headers={'Content-Type': 'application/json', **(headers or {})})
    try:
        response = client.open(req, timeout=10)
    except urllib.error.HTTPError as error:
        response = error
    with response:
        raw = response.read().decode()
        return response.status, json.loads(raw) if raw else None, dict(response.headers)


def main():
    equipamento_id = None
    try:
        body = {'nome': 'Teste automatizado Sprint 3', 'setor': 'Teste',
                'statusOperacional': 'ATIVO', 'ultimaManutencao': '2026-05-10'}
        status, criado, _ = request('POST', '/equipamentos', body)
        assert status == 201 and isinstance(criado['id'], int), (status, criado)
        equipamento_id = criado['id']
        assert {k: criado[k] for k in body} == body
        print('PASS POST /equipamentos - 201, JSON e ID gerado')
        status, lista, headers = request('GET', '/equipamentos', headers={'Origin': 'http://localhost:8081'})
        assert status == 200 and any(e['id'] == equipamento_id for e in lista)
        assert headers.get('Access-Control-Allow-Origin') == '*', headers
        print('PASS GET /equipamentos - 200, registro presente e CORS')
        path = f'/equipamentos/{equipamento_id}'
        status, detalhe, _ = request('GET', path)
        assert status == 200 and detalhe == criado
        print('PASS GET /equipamentos/{id} - 200, objeto correspondente')
        body['statusOperacional'] = 'EM_MANUTENCAO'
        status, atualizado, _ = request('PUT', path, body)
        assert status == 200 and atualizado['statusOperacional'] == 'EM_MANUTENCAO'
        print('PASS PUT /equipamentos/{id} - 200, alteração persistida')
        status, _, headers = request('OPTIONS', '/equipamentos', headers={
            'Origin': 'http://localhost:8081', 'Access-Control-Request-Method': 'POST',
            'Access-Control-Request-Headers': 'content-type'})
        assert status == 200 and headers.get('Access-Control-Allow-Origin') == '*'
        assert 'POST' in headers.get('Access-Control-Allow-Methods', '')
        assert 'content-type' in headers.get('Access-Control-Allow-Headers', '').lower()
        print('PASS OPTIONS - preflight CORS para POST JSON')
        status, _, _ = request('DELETE', path)
        assert status == 204
        equipamento_id = None
        assert request('GET', path)[0] == 404
        assert request('PUT', path, body)[0] == 404
        assert request('DELETE', path)[0] == 404
        print('PASS DELETE - 204; GET/PUT/DELETE de ID ausente - 404')
        print('Todos os testes de API passaram.')
    finally:
        if equipamento_id is not None:
            request('DELETE', f'/equipamentos/{equipamento_id}')


if __name__ == '__main__':
    main()

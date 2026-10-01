import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getStatus, STATUSES } from '../src/status.js';

test('CA1: instancia conectada devuelve CONECTADA', () => {
  assert.deepEqual(getStatus(7, true), { code: 200, body: { id: 7, status: 'CONECTADA' } });
});
test('CA2: id inexistente devuelve 404', () => {
  assert.deepEqual(getStatus(999, true), { code: 404, body: { message: 'Instancia no encontrada' } });
});
test('Contrato: sin sesión devuelve 401', () => {
  assert.equal(getStatus(7, false).code, 401);
});
test('Caso borde: instancia desactivada devuelve DESCONECTADA, no error', () => {
  const r = getStatus(8, true);
  assert.equal(r.code, 200);
  assert.equal(r.body.status, 'DESCONECTADA');
});
test('Contrato: status pertenece al conjunto permitido', () => {
  assert.ok(STATUSES.includes(getStatus(7, true).body.status));
});

// Implementación de specs/001-estado-instancia y specs/002-estado-en-pausa (datos ficticios en memoria).
const STATUSES = ['CONECTADA', 'DESCONECTADA', 'ESPERANDO_QR', 'RECONECTANDO', 'EN_PAUSA'];
const instances = new Map([
  [7, { activa: true, pausada: false, status: 'CONECTADA' }],
  [8, { activa: false, pausada: false, status: 'CONECTADA' }],
  [9, { activa: true, pausada: true, status: 'CONECTADA' }],
  [10, { activa: false, pausada: true, status: 'CONECTADA' }],
]);

/** GET /instances/:id/status → { code, body }. Sin sesión → 401; id inexistente → 404. */
export function getStatus(id, hasSession) {
  if (!hasSession) return { code: 401, body: { message: 'No autenticado' } };
  const inst = instances.get(id);
  if (!inst) return { code: 404, body: { message: 'Instancia no encontrada' } };
  // spec 002: la desactivación tiene prioridad sobre la pausa.
  if (!inst.activa) return { code: 200, body: { id, status: 'DESCONECTADA' } };
  const status = inst.pausada ? 'EN_PAUSA' : inst.status;
  return { code: 200, body: { id, status } };
}
export { STATUSES };

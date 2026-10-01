// Implementación de specs/001-estado-instancia/spec.md (datos ficticios en memoria).
const STATUSES = ['CONECTADA', 'DESCONECTADA', 'ESPERANDO_QR', 'RECONECTANDO'];
const instances = new Map([[7, { activa: true, status: 'CONECTADA' }], [8, { activa: false, status: 'CONECTADA' }]]);

/** GET /instances/:id/status → { code, body }. Sin sesión → 401; id inexistente → 404. */
export function getStatus(id, hasSession) {
  if (!hasSession) return { code: 401, body: { message: 'No autenticado' } };
  const inst = instances.get(id);
  if (!inst) return { code: 404, body: { message: 'Instancia no encontrada' } };
  const status = inst.activa ? inst.status : 'DESCONECTADA'; // spec: desactivada → DESCONECTADA
  return { code: 200, body: { id, status } };
}
export { STATUSES };

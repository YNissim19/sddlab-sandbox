# Spec 001 — Consultar estado de una instancia

**Ticket Jira:** SDDLAB-2 · **Estado:** borrador para Spec Review · **Datos:** ficticios

## Meta de negocio
El operador consulta si una instancia de WhatsApp está conectada.

## Contrato
- `GET /instances/{id}/status` → `200 {"id": 7, "status": "CONECTADA"}`
- `status` ∈ `CONECTADA | DESCONECTADA | ESPERANDO_QR | RECONECTANDO`
- `id` inexistente → `404 {"message": "Instancia no encontrada"}`
- Sin sesión válida → `401`

## Casos borde
- Instancia desactivada: devuelve `DESCONECTADA`, nunca error.
- Cambio de estado mientras se consulta: gana el último valor persistido.

## Criterios de aceptación
1. Dado una instancia conectada, cuando consulto su estado, entonces recibo `CONECTADA`.
2. Dado un id inexistente, cuando consulto, entonces recibo `404`.

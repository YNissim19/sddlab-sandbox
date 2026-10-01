# Spec 002 — Estado EN_PAUSA de una instancia

**Ticket Jira:** SDDLAB-3 · **Extiende:** spec 001 · **Estado:** borrador para Spec Review · **Datos:** ficticios

## Meta de negocio
El operador distingue una instancia pausada a propósito de una desconectada por falla.

## Contrato
- El conjunto de `status` de `GET /instances/{id}/status` añade `EN_PAUSA`.
- Nuevo conjunto: `CONECTADA | DESCONECTADA | ESPERANDO_QR | RECONECTANDO | EN_PAUSA`.
- Una instancia pausada (`pausada = true`) y activa devuelve `200 {"id": 9, "status": "EN_PAUSA"}`.

## Casos borde
- Pausada **y** desactivada: gana `DESCONECTADA` (la desactivación tiene prioridad).
- Reanudar una pausada vuelve al último estado de conexión conocido.

## Criterios de aceptación
1. Dada una instancia activa y pausada, cuando consulto su estado, entonces recibo `EN_PAUSA`.
2. Dada una instancia pausada y desactivada, cuando consulto su estado, entonces recibo `DESCONECTADA`.

"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withIds", {
    enumerable: true,
    get: function() {
        return withIds;
    }
});
function withIds(knex, table) {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.text('external_id').nullable().unique();
}

//# sourceMappingURL=uuid-external.js.map
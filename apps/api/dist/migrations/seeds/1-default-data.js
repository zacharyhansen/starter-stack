"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "seed", {
    enumerable: true,
    get: function() {
        return seed;
    }
});
const _seedconstants = require("../helpers/seed-constants");
const _migrate = require("../migrate");
async function seed(knex) {
    /* Insert Org Records */ await Promise.all(_migrate.ORG_SCHEMAS.map((schema)=>{
        return knex(`${schema}.deal_status`).insert(_seedconstants.DEAL_STATUS);
    }));
    await Promise.all(_migrate.ORG_SCHEMAS.map((schema)=>{
        return knex(`${schema}.task_status`).insert(_seedconstants.TASK_STATUS);
    }));
    await Promise.all(_migrate.ORG_SCHEMAS.map((schema)=>{
        return knex(`${schema}.task_priority`).insert(_seedconstants.TASK_PRIORITY);
    }));
}

//# sourceMappingURL=1-default-data.js.map
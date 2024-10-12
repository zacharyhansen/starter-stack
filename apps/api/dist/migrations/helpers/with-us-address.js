"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "withUSAddress", {
    enumerable: true,
    get: function() {
        return withUSAddress;
    }
});
function withUSAddress(knex, table) {
    table.text('address').nullable();
    table.text('address_line_2').nullable();
    table.string('city').nullable();
    table.string('zip_code').nullable();
    table.specificType('state', 'state_usa').nullable();
    table.text('county').nullable();
}

//# sourceMappingURL=with-us-address.js.map
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DEAL_STATUS: function() {
        return DEAL_STATUS;
    },
    TASK_PRIORITY: function() {
        return TASK_PRIORITY;
    },
    TASK_STATUS: function() {
        return TASK_STATUS;
    }
});
const TASK_STATUS = [
    {
        id: 0,
        label: 'Backlog'
    },
    {
        id: 1,
        label: 'Todo'
    },
    {
        id: 2,
        label: 'In Progress'
    },
    {
        id: 3,
        label: 'In Review'
    },
    {
        id: 4,
        label: 'Done'
    },
    {
        id: 5,
        label: 'Cancelled'
    }
];
const TASK_PRIORITY = [
    {
        id: 0,
        label: 'Urgent'
    },
    {
        id: 1,
        label: 'High'
    },
    {
        id: 2,
        label: 'Medium'
    },
    {
        id: 3,
        label: 'Low'
    },
    {
        id: 4,
        label: 'No Priority'
    }
];
const DEAL_STATUS = [
    {
        id: 'Pre Qualification',
        label: 'Pre Qualification',
        order: 0
    },
    {
        id: 'Pricing',
        label: 'Pricing',
        order: 1
    },
    {
        id: 'Approved',
        label: 'Approved',
        order: 2
    },
    {
        id: 'Underwriting',
        label: 'Underwriting',
        order: 3
    },
    {
        id: 'Contract',
        label: 'Contract',
        order: 4
    },
    {
        id: 'Contract Out',
        label: 'Contract Out',
        order: 5
    },
    {
        id: 'Contact In',
        label: 'Contact In',
        order: 6
    },
    {
        id: 'Final Underwriting Approval',
        label: 'Final Underwriting Approval',
        order: 7
    },
    {
        id: 'Pre-Funding',
        label: 'Pre-Funding',
        order: 8
    },
    {
        id: 'Funded',
        label: 'Funded',
        order: 9
    }
];

//# sourceMappingURL=seed-constants.js.map
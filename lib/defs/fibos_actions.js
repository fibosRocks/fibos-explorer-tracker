"use strict";

module.exports = db => {
    let FibosActions = db.define('fibos_actions', {
        id: {
            type: "serial",
            size: 8,
            key: true,
            big: true
        },
        global_sequence: {
            index: "trx_global_index",
            required: true,
            type: "text",
            size: 64
        },
        trx_id: {
            index: "trx_global_index",
            required: true,
            type: "text",
            size: 64
        },
        contract_action: {
            required: true,
            type: "text",
            size: 64
        },
        contract: {
            index: "contract_action_index",
            required: true,
            type: "text",
            size: 12
        },
        action: {
            index: "contract_action_index",
            required: true,
            type: "text",
            size: 12
        },
        rawData: {
            required: true,
            type: "object",
            big: true
        }
    });

    FibosActions.hasOne('parent', FibosActions, {
        key: true,
        reverse: "inline_action"
    });

    FibosActions.hasOne('transaction', db.models.fibos_transactions, {
        key: true,
        reverse: "actions"
    });

    return FibosActions;
}
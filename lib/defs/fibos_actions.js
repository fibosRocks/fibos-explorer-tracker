"use strict";

module.exports = db => {
    let FibosActions = db.define('fibos_actions', {
        id: {
            type: "serial",
            size: 8,
            key: true,
            big: true,
            comment: "self increment id"
        },
        global_sequence: {
            index: "trx_global_index",
            required: true,
            type: "text",
            size: 64,
            comment: "global sequence"
        },
        trx_id: {
            index: "trx_global_index",
            required: true,
            type: "text",
            size: 64,
            comment: "transaction hash"
        },
        contract_action: {
            required: true,
            type: "text",
            size: 64,
            comment: "contract action"
        },
        rawData: {
            required: true,
            type: "object",
            big: true,
            comment: "raw data"
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
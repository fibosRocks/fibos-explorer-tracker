"use strict";

module.exports = db => {
    let FibosAccountActions = db.define('fibos_account_actions', {
        account: {
            key: true,
            required: true,
            type: "text",
            size: 12
        },
        global_sequence: {
            key: true,
            required: true,
            type: "text",
            size: 64
        }
    });

    return FibosAccountActions;
}
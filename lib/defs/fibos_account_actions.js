"use strict";

module.exports = db => {
    let FibosAccountActions = db.define('fibos_account_actions', {
        account: {
            key: true,
            required: true,
            type: "text",
            size: 12
        },
        action_id: {
            key: true,
            required: true,
            type: "integer",
        }
    });

    return FibosAccountActions;
}
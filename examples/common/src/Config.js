"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nars_common_1 = require("nars-common");
/*
 * Define Routes and the props
 */
exports.config = {
    Form: {
        props: {
            backgroundColor: nars_common_1.InputProp.string,
            textColor: nars_common_1.InputProp.string,
        },
        localProps: {}
    },
    Feed: {
        props: {
            name: nars_common_1.InputProp.string,
        },
        localProps: {}
    },
};

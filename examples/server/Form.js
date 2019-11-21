"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const Colors_1 = require("./Colors");
const nars_1 = require("nars");
const styles = nars_1.StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    textInput: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 3,
        fontSize: 16,
        fontFamily: "Fira Code",
        color: Colors_1.offWhite,
        backgroundColor: "#369DA5",
    },
    isCompany: {
        fontSize: 16,
        fontFamily: "Fira Code",
        color: Colors_1.offWhite,
    },
    submitText: {
        borderRadius: 3,
        fontSize: 16,
        fontFamily: "Fira Code",
        color: Colors_1.offWhite,
        textAlign: "center",
        paddingVertical: 15,
        paddingHorizontal: 28,
        backgroundColor: Colors_1.yellow,
    },
    elementContainer: {
        paddingTop: 20,
    },
    companySwitchContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    centeredContents: { alignItems: "center" },
});
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Bool"] = 0] = "Bool";
    FieldType[FieldType["String"] = 1] = "String";
    FieldType[FieldType["Submit"] = 2] = "Submit";
})(FieldType || (FieldType = {}));
const toField = (field) => ({
    key: field,
    fieldType: FieldType.String,
    name: field,
});
const computeFields = (isCompany) => ({
    general: ["name", "surname", "email", "role"].map(toField),
    userSpecific: isCompany
        ? ["Tax#", "Number of employees"].map(toField)
        : ["ID number", "birthdate"].map(toField),
});
const renderItem = ({ item }) => {
    switch (item.fieldType) {
        case FieldType.String:
            return (React.createElement(nars_1.View, { style: styles.elementContainer },
                React.createElement(nars_1.TextInput, { placeholderTextColor: "#7AC7CC", style: styles.textInput, placeholder: item.name, value: "" })));
        case FieldType.Bool:
            return (React.createElement(nars_1.View, { style: styles.elementContainer },
                React.createElement(nars_1.View, { style: styles.companySwitchContainer },
                    React.createElement(nars_1.Text, { style: styles.isCompany }, "Are you a company"),
                    React.createElement(nars_1.Switch, { onValueChange: item.onSet, value: item.value }))));
        case FieldType.Submit:
            return (React.createElement(nars_1.TouchableOpacity, null,
                React.createElement(nars_1.View, { style: [styles.elementContainer, styles.centeredContents] },
                    React.createElement(nars_1.Text, { style: styles.submitText }, "Submit"))));
        default:
            throw "Unreachable";
    }
};
function Form(props) {
    const [isCompany, setIsCompany] = React.useState(false);
    const fields = computeFields(isCompany);
    return (React.createElement(nars_1.FlatList, { style: { backgroundColor: props.props.backgroundColor }, data: [
            ...fields.general,
            {
                fieldType: FieldType.Bool,
                onSet: setIsCompany,
                value: isCompany,
                key: "Is Company",
            },
            ...fields.userSpecific,
            { fieldType: FieldType.Submit, key: "Submit" },
        ], keyExtractor: ({ item: { key } }) => key, renderItem: renderItem }));
}
exports.default = Form;

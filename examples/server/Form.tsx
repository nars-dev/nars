import * as React from "react";
import { offWhite, yellow } from "./Colors";
import {
  StyleSheet,
  FlatList,
  TextInput,
  View,
  Switch,
  Text,
  TouchableOpacity,
} from "nars";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 3,
    fontSize: 16,
    fontFamily: "Fira Code",
    color: offWhite,
    backgroundColor: "#369DA5",
  },
  isCompany: {
    fontSize: 16,
    fontFamily: "Fira Code",
    color: offWhite,
  },
  submitText: {
    borderRadius: 3,
    fontSize: 16,
    fontFamily: "Fira Code",
    color: offWhite,
    textAlign: "center",
    paddingVertical: 15,
    paddingHorizontal: 28,
    backgroundColor: yellow,
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

enum FieldType {
  Bool,
  String,
  Submit,
}

type Field = { key: string } & (
  | { fieldType: FieldType.String; name: string }
  | { fieldType: FieldType.Bool; onSet: (_: boolean) => void; value: boolean }
  | { fieldType: FieldType.Submit; onSubmit: () => void });

const toField = (field: string): Field => ({
  key: field,
  fieldType: FieldType.String,
  name: field,
});

const computeFields = (isCompany: boolean) => ({
  general: ["name", "surname", "email", "role"].map(toField),
  userSpecific: isCompany
    ? ["Tax#", "Number of employees"].map(toField)
    : ["ID number", "birthdate"].map(toField),
});

const renderItem = ({ item }: { item: Field }) => {
  switch (item.fieldType) {
    case FieldType.String:
      return (
        <View style={styles.elementContainer}>
          <TextInput
            placeholderTextColor={"#7AC7CC"}
            style={styles.textInput}
            placeholder={item.name}
            value={""}
          />
        </View>
      );
    case FieldType.Bool:
      return (
        <View style={styles.elementContainer}>
          <View style={styles.companySwitchContainer}>
            <Text style={styles.isCompany}>{"Are you a company"}</Text>
            <Switch onValueChange={item.onSet} value={item.value} />
          </View>
        </View>
      );
    case FieldType.Submit:
      return (
        <TouchableOpacity>
          <View style={[styles.elementContainer, styles.centeredContents]}>
            <Text style={styles.submitText}>{"Submit"}</Text>
          </View>
        </TouchableOpacity>
      );
    default:
      throw "Unreachable";
  }
};

function Form(props: { isCompany?: boolean }) {
  const [isCompany, setIsCompany] = React.useState(Boolean(props.isCompany));
  const fields = computeFields(isCompany);
  return (
    <FlatList
      data={
        [
          ...fields.general,
          {
            fieldType: FieldType.Bool,
            onSet: setIsCompany,
            value: isCompany,
            key: "Is Company",
          },
          ...fields.userSpecific,
          { fieldType: FieldType.Submit, key: "Submit" },
        ] as Field[]
      }
      keyExtractor={({ item: { key } }) => key}
      renderItem={renderItem}
    />
  );
}

export default Form;

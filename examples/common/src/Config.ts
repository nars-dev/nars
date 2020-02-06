import { InputProp } from "nars-common";

/*
 * Define Routes and the props
 */
export const config = {
  Form: {
    isCompany: InputProp.optional(InputProp.boolean),
  },
  Feed: {
    backgroundColor: InputProp.string,
  },
  ProgressBar: {
    height: InputProp.number,
  },
};

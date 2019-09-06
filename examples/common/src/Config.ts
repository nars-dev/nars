import { InputProp } from "nars-common";

/*
 * Define Routes and the props
 */
export const config = {
  Form: {
    props: {
      backgroundColor: InputProp.string,
      textColor: InputProp.string,
    },
  },
  Feed: {
    props: {
      name: InputProp.string,
    },
  },
};

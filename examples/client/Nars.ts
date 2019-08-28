import * as React from "react";

export interface LocalProp<T> {
  key: string;
}
export type LocalProps<T> = { [P in keyof T]: LocalProp<T[P]> };

export const componentWithLocalProps = <P, K extends keyof P>(
  component: React.ComponentType<P>,
  localProps: Pick<LocalProps<P>, K>,
  compoonentWithLocalProps: (
    component: React.ComponentType<Omit<P, K>>
  ) => React.ReactElement
) => {
  const ccomponent = (normalProps: Omit<P, K>) => {
    const element = React.createElement(
      component,
      normalProps,
    );
};

import * as React from "react";
import { LocalProps } from "nars-common";
export interface Props {
    onPress?: () => void;
    localProps?: LocalProps<"onPress">;
    children?: React.ReactNode;
}
declare const _default: (props: Props) => React.ReactElement<Props, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)>;
export default _default;
//# sourceMappingURL=TouchableOpacity.d.ts.map
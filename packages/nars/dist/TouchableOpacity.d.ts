import * as React from "react";
import { t as LocalProp } from "./LocalProp.gen";
import { props } from "./TouchableOpacity.gen";
export interface Props extends props {
    onPress?: () => void;
    localProps?: {
        onPress?: LocalProp;
    };
    children?: React.ReactNode;
}
declare const _default: React.ComponentType<Props>;
export default _default;
//# sourceMappingURL=TouchableOpacity.d.ts.map
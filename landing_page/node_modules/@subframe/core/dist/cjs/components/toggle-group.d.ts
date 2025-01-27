import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import React from "react";
import { Optional } from "../lib/typescript-helpers";
interface RootProps extends Optional<RadixToggleGroup.ToggleGroupSingleProps, "type"> {
}
export declare const Root: React.ForwardRefExoticComponent<RootProps & React.RefAttributes<HTMLDivElement>>;
export declare const Item: React.ForwardRefExoticComponent<RadixToggleGroup.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
export declare const ToggleGroup: {
    Root: React.ForwardRefExoticComponent<RootProps & React.RefAttributes<HTMLDivElement>>;
    Item: React.ForwardRefExoticComponent<RadixToggleGroup.ToggleGroupItemProps & React.RefAttributes<HTMLButtonElement>>;
};
export {};
//# sourceMappingURL=toggle-group.d.ts.map
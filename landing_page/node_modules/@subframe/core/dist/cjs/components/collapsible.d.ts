import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { SlotProps } from "@radix-ui/react-slot";
import React from "react";
interface ChevronProps extends SlotProps {
}
export declare const Chevron: React.ForwardRefExoticComponent<ChevronProps & React.RefAttributes<HTMLElement>>;
export declare const Trigger: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
export declare const Content: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const Root: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
export declare const Collapsible: {
    Root: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleProps & React.RefAttributes<HTMLDivElement>>;
    Trigger: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<RadixCollapsible.CollapsibleContentProps & React.RefAttributes<HTMLDivElement>>;
    Chevron: React.ForwardRefExoticComponent<ChevronProps & React.RefAttributes<HTMLElement>>;
};
export {};
//# sourceMappingURL=collapsible.d.ts.map
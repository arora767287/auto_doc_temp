import * as RadixDialog from "@radix-ui/react-dialog";
import React from "react";
interface RootProps extends RadixDialog.DialogProps, RadixDialog.DialogOverlayProps {
}
export declare const Root: React.ForwardRefExoticComponent<RootProps & React.RefAttributes<HTMLDivElement>>;
interface ContentProps extends RadixDialog.DialogContentProps {
    initialFocusRef?: React.MutableRefObject<HTMLElement | null>;
}
export declare const Content: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<HTMLDivElement>>;
export declare const Dialog: {
    Root: React.ForwardRefExoticComponent<RootProps & React.RefAttributes<HTMLDivElement>>;
    Content: React.ForwardRefExoticComponent<ContentProps & React.RefAttributes<HTMLDivElement>>;
};
export {};
//# sourceMappingURL=dialog.d.ts.map
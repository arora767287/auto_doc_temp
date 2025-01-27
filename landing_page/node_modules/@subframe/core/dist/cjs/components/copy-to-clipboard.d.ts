import React from "react";
interface Props {
    clipboardText?: string;
    children?: React.ReactElement;
    onCopy?: () => void;
    options?: {
        format: string;
    };
}
export declare const Root: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
export declare const CopyToClipboard: {
    Root: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLElement>>;
};
export {};
//# sourceMappingURL=copy-to-clipboard.d.ts.map
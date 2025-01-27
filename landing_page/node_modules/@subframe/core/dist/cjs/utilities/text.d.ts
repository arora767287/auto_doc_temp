import React from "react";
export type TextVariant = "label" | "label-bold" | "body" | "body-bold" | "subheader" | "section-header" | "header" | "monospace-body";
interface Props extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: "label" | "label-bold" | "body" | "body-bold" | "subheader" | "section-header" | "header" | "monospace-body";
    ellipsis?: boolean;
    color?: "default" | "subtext";
}
export declare function Text(props: Props): React.JSX.Element;
export {};
//# sourceMappingURL=text.d.ts.map
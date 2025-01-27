import React from "react";
export interface AreaChartProps extends React.HTMLAttributes<HTMLDivElement> {
    categories: string[];
    colors?: string[];
    dark?: boolean;
    data: Array<object>;
    index: string;
    stacked?: boolean;
    gridLines?: React.ReactNode;
    xAxis?: React.ReactNode;
    yAxis?: React.ReactNode;
    tooltip?: React.ReactNode;
    legend?: React.ReactNode;
    layout?: "horizontal" | "vertical";
    syncId?: number | string;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    stackOffset?: "expand" | "none" | "wiggle" | "silhouette";
}
export declare const AreaChart: React.ForwardRefExoticComponent<AreaChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=area-chart.d.ts.map
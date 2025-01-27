import React from "react";
export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
    categories: string[];
    colors?: string[];
    dark?: boolean;
    data: Array<object>;
    index: string;
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
}
export declare const LineChart: React.ForwardRefExoticComponent<LineChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=line-chart.d.ts.map
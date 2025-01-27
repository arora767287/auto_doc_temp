import React from "react";
export interface PieChartProps extends React.HTMLAttributes<HTMLDivElement> {
    category: string;
    colors?: string[];
    dark?: boolean;
    data: Array<Record<string, string | number>>;
    index: string;
    tooltip?: React.ReactNode;
    legend?: React.ReactNode;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}
export declare const PieChart: React.ForwardRefExoticComponent<PieChartProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=pie-chart.d.ts.map
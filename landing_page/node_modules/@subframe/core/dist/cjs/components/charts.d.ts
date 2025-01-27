import * as React from "react";
import { CartesianGridProps, Label as RechartsLabel, LegendProps, TooltipProps, XAxisProps, YAxisProps } from "recharts";
/**
 * Colors
 */
export declare const DEFAULT_COLORS: string[];
export declare function createColorMap({ categories, colors }: {
    categories: string[];
    colors: string[];
}): Map<string, string>;
/**
 * Wrapper
 */
interface ChartContextValue {
    colorMap: Map<string, string>;
    dark?: boolean;
}
export declare function ChartContextProvider({ categories, colors, dark, children, }: {
    categories: string[];
    colors: string[];
    dark?: boolean;
    children: React.ReactNode;
}): React.JSX.Element;
export declare function useChartContext(): ChartContextValue;
interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
    children: (args: {
        width: number;
        height: number;
    }) => React.ReactElement;
}
export declare const AutoSizedChartWrapper: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>>;
/**
 * Recharts Wrappers
 */
export declare const ChartLabel: typeof RechartsLabel;
export declare const CartesianGrid: {
    ({ ref, className, horizontal, vertical, strokeWidth, ...otherProps }: CartesianGridProps): React.JSX.Element;
    displayName: string;
};
export declare const XAxis: {
    ({ ref, ...otherProps }: XAxisProps): React.JSX.Element;
    displayName: string;
    defaultProps: {
        axisLine: boolean;
        tickLine: boolean;
        padding: {
            left: number;
            right: number;
        };
        interval: string;
        allowDecimals: boolean;
        hide: boolean;
        orientation: string;
        width: number;
        height: number;
        mirror: boolean;
        xAxisId: number;
        tickCount: number;
        type: string;
        allowDataOverflow: boolean;
        scale: string;
        reversed: boolean;
        allowDuplicatedCategory: boolean;
    };
};
export declare const YAxis: {
    ({ ref, ...otherProps }: YAxisProps): React.JSX.Element;
    displayName: string;
    defaultProps: {
        axisLine: boolean;
        tickLine: boolean;
        width: number;
        allowDuplicatedCategory: boolean;
        allowDecimals: boolean;
        hide: boolean;
        orientation: string;
        height: number;
        mirror: boolean;
        yAxisId: number;
        tickCount: number;
        type: string;
        padding: {
            top: number;
            bottom: number;
        };
        allowDataOverflow: boolean;
        scale: string;
        reversed: boolean;
    };
};
export declare const ChartTooltip: {
    (props: TooltipProps<any, any>): React.JSX.Element;
    displayName: string;
    defaultProps: {
        cursor: {
            stroke: string;
            strokeWidth: number;
        };
        isAnimationActive: boolean;
        accessibilityLayer: boolean;
        allowEscapeViewBox: {
            x: boolean;
            y: boolean;
        };
        animationDuration: number;
        animationEasing: string;
        contentStyle: {};
        coordinate: {
            x: number;
            y: number;
        };
        cursorStyle: {};
        filterNull: boolean;
        itemStyle: {};
        labelStyle: {};
        offset: number;
        reverseDirection: {
            x: boolean;
            y: boolean;
        };
        separator: string;
        trigger: string;
        useTranslate3d: boolean;
        viewBox: {
            x: number;
            y: number;
            height: number;
            width: number;
        };
        wrapperStyle: {};
    };
};
export declare const ChartLegend: {
    ({ ref, ...otherProps }: LegendProps): React.JSX.Element;
    displayName: string;
    defaultProps: {
        align: string;
        verticalAlign: string;
        iconSize: number;
        layout: string;
    };
};
export {};
//# sourceMappingURL=charts.d.ts.map
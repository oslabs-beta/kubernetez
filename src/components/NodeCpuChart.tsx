import React, { useMemo, useCallback, useEffect } from "react";
import { AreaClosed, Line, Bar } from "@visx/shape";
import { curveMonotoneX } from "@visx/curve";
import { GridRows, GridColumns } from "@visx/grid";
import { scaleTime, scaleLinear } from "@visx/scale";
import {
  withTooltip,
  Tooltip,
  TooltipWithBounds,
  defaultStyles,
} from "@visx/tooltip";
import { WithTooltipProvidedProps } from "@visx/tooltip/lib/enhancers/withTooltip";
import { localPoint } from "@visx/event";
import { LinearGradient } from "@visx/gradient";
import { max, extent, bisector } from "@visx/vendor/d3-array";
import { timeFormat } from "@visx/vendor/d3-time-format";
import { useTheme } from "@mui/material";

interface nodeStats {
  date: string;
  cpu: number;
  memory: number;
  memoryDisplay: string;
}

type TooltipData = nodeStats;

// util
const formatDate = timeFormat("%m/%d/%y @ %H:%M:%S");

// accessors
const getDate = (d: nodeStats) => new Date(d.date);
const getCpuValue = (d: nodeStats) => d.cpu;
const bisectDate = bisector<nodeStats, Date>((d) => new Date(d.date)).left;

export type AreaProps = {
  nodesStatsObj: any;
  selectedNode: any;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

export default withTooltip<AreaProps, TooltipData>(
  ({
    nodesStatsObj,
    selectedNode,
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
  }: AreaProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null;

    let selectedNodeStats = nodesStatsObj[`${selectedNode[0]["name"]}`];

    const theme = useTheme();

    const background = theme.palette.mode === "dark" ? "#0e0727" : "#eeebfb"; 
    const background2 = theme.palette.mode === "dark" ? "#120838" : "#eeebfb";
    const accentColor = theme.palette.mode === "dark" ? "white" : "#7b76c2"
    const textColor = theme.palette.mode === "dark" ? "white" : "grey";

    const tooltipStyles = {
      ...defaultStyles,
      background,
      border: "1px solid white",
      color: textColor,
    };

    // bounds
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(selectedNodeStats, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    );
    const CpuValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [
            -5,
            //@ts-ignore
            (max(selectedNodeStats, getCpuValue) + 200 || 0) + innerHeight / 3,
          ],
          nice: true,
        }),
      [margin.top, innerHeight]
    );

    // tooltip handler
    const handleTooltip = useCallback(
      (
        event:
          | React.TouchEvent<SVGRectElement>
          | React.MouseEvent<SVGRectElement>
      ) => {
        const { x } = localPoint(event) || { x: 0 };
        const x0 = dateScale.invert(x);
        const index = bisectDate(selectedNodeStats, x0, 1);
        const d0 = selectedNodeStats[index - 1];
        const d1 = selectedNodeStats[index];
        let d = d0;
        if (d1 && getDate(d1)) {
          d =
            x0.valueOf() - getDate(d0).valueOf() >
            getDate(d1).valueOf() - x0.valueOf()
              ? d1
              : d0;
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: CpuValueScale(getCpuValue(d)),
        });
      },
      [showTooltip, CpuValueScale, dateScale]
    );

    return (
      <div>
        <svg width={width} height={height}>
          <rect
            x={0}
            y={0}
            width={width}
            height={height}
            fill="url(#area-background-gradient)"
            rx={14}
          />
          <LinearGradient
            id="area-background-gradient"
            from={background}
            to={background2}
          />
          <LinearGradient
            id="area-gradient"
            from={accentColor}
            fromOpacity={0.4}
            to={accentColor}
            toOpacity={0.0}
          />
          <GridRows
            left={margin.left}
            scale={CpuValueScale}
            width={innerWidth}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.0}
            pointerEvents="none"
          />
          <GridColumns
            top={margin.top}
            scale={dateScale}
            height={innerHeight}
            strokeDasharray="1,3"
            stroke={accentColor}
            strokeOpacity={0.2}
            pointerEvents="none"
          />
          <AreaClosed<nodeStats>
            data={selectedNodeStats}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => CpuValueScale(getCpuValue(d)) ?? 0}
            yScale={CpuValueScale}
            strokeWidth={1.7}
            stroke="url(#area-gradient)"
            fill="url(#area-gradient)"
            curve={curveMonotoneX}
          />
          <Bar
            x={margin.left}
            y={margin.top}
            width={innerWidth}
            height={innerHeight}
            fill="transparent"
            rx={14}
            onTouchStart={handleTooltip}
            onTouchMove={handleTooltip}
            onMouseMove={handleTooltip}
            onMouseLeave={() => hideTooltip()}
          />
          {tooltipData && (
            <g>
              <Line
                from={{ x: tooltipLeft, y: margin.top }}
                to={{ x: tooltipLeft, y: innerHeight + margin.top }}
                stroke={selectedNode[0].nodeCpuLimit === "NONE" ? "#2fc665" : (getCpuValue(tooltipData) / Number(selectedNode[0].nodeCpuLimit)) <= 1 ? "#2fc665" : "#cf4848"}
                strokeWidth={2}
                pointerEvents="none"
                strokeDasharray="5,2"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill="black"
                fillOpacity={0.1}
                stroke="black"
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={selectedNode[0].nodeCpuLimit === "NONE" ? "#2fc665" : (getCpuValue(tooltipData) / Number(selectedNode[0].nodeCpuLimit)) <= 1 ? "#2fc665" : "#cf4848"}
                stroke="white"
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds
              key={Math.random()}
              top={tooltipTop - 32}
              left={tooltipLeft + 12}
              style={{
                ...tooltipStyles,
                background: theme.palette.mode === "dark" ? "#0e0727" : "white",
                fontSize: "13px",
                fontWeight:"900",
                color: selectedNode[0].nodeCpuLimit === "NONE" ? "#2fc665" : (getCpuValue(tooltipData) / Number(selectedNode[0].nodeCpuLimit)) <= 1 ? "#2fc665" : "#cf4848"
              }}
            >
              {`${getCpuValue(tooltipData)}m`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: "center",
                transform: "translateX(-50%)",
                background: theme.palette.mode === "dark" ? "#0e0727" : "white",
                color: textColor,
                border:
                  theme.palette.mode === "dark"
                    ? "1px solid white"
                    : "1px solid #00000030",
                fontSize: "10px",
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    );
  }
);

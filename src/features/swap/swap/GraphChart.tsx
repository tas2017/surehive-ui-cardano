import React, { useMemo, useCallback } from 'react'
import { AreaClosed, Line, Bar, LinePath } from '@visx/shape'
import appleStock, { AppleStock } from '@visx/mock-data/lib/mocks/appleStock'
import { curveMonotoneX } from '@visx/curve'
import { scaleTime, scaleLinear } from '@visx/scale'
import { withTooltip, Tooltip, TooltipWithBounds, defaultStyles } from '@visx/tooltip'
import { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip'
import { localPoint } from '@visx/event'
import { LinearGradient } from '@visx/gradient'
import { max, extent, bisector } from 'd3-array'
import { timeFormat } from 'd3-time-format'

type TooltipData = AppleStock

const stock = appleStock.slice(800)
const background = '#3b6978'
const background2 = '#204051'
let accentColor = '#004BFF'
let accentColorDark = '#0004F7'
const tooltipStyles = {
  ...defaultStyles,
  background: '#353945',
  border: '1px solid #353945',
  color: 'white',
  padding: '12px',
  fontSize: '12px',
}

// util
const formatDate = timeFormat("%b %d, '%y")

// accessors
const getDate = (d: AppleStock) => new Date(d.date)
const getStockValue = (d: AppleStock) => d.close
const bisectDate = bisector<AppleStock, Date>((d) => new Date(d.date)).left

export type OtherProps = {
  width: number
  height: number
  margin?: { top: number; right: number; bottom: number; left: number }
  currentTheme: string
}

export default withTooltip<OtherProps, TooltipData>(
  ({
    width,
    height,
    margin = { top: 0, right: 0, bottom: 0, left: 0 },
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop = 0,
    tooltipLeft = 0,
    currentTheme,
  }: OtherProps & WithTooltipProvidedProps<TooltipData>) => {
    if (width < 10) return null

    const isMobile = width < 768

    // bounds
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // scales
    const dateScale = useMemo(
      () =>
        scaleTime({
          range: [margin.left, innerWidth + margin.left],
          domain: extent(stock, getDate) as [Date, Date],
        }),
      [innerWidth, margin.left]
    )
    const stockValueScale = useMemo(
      () =>
        scaleLinear({
          range: [innerHeight + margin.top, margin.top],
          domain: [0, (max(stock, getStockValue) || 0) + innerHeight / 3],
          nice: true,
        }),
      [margin.top, innerHeight]
    )

    // tooltip handler
    const handleTooltip = useCallback(
      (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
        const { x } = localPoint(event) || { x: 0 }
        const x0 = dateScale.invert(x)
        const index = bisectDate(stock, x0, 1)
        const d0 = stock[index - 1]
        const d1 = stock[index]
        let d = d0
        if (d1 && getDate(d1)) {
          d = x0.valueOf() - getDate(d0).valueOf() > getDate(d1).valueOf() - x0.valueOf() ? d1 : d0
        }
        showTooltip({
          tooltipData: d,
          tooltipLeft: x,
          tooltipTop: stockValueScale(getStockValue(d)),
        })
      },
      [showTooltip, stockValueScale, dateScale]
    )

    let fromOpacity = 0.15
    let toOpacity = 0
    if (isMobile) {
      accentColor = 'rgba(255,126,55,0.00)'
      accentColorDark = '#FF6D00'
      fromOpacity = 0.2
      toOpacity = 0
    }

    return (
      <div>
        <svg width={width} height={height}>
          <rect x={0} y={0} width={width} height={height} fill="none" rx={14} />
          <LinearGradient
            id="area-gradient"
            from={accentColorDark}
            fromOpacity={fromOpacity}
            to={accentColor}
            toOpacity={toOpacity}
            toOffset={'70%'}
          />
          <LinePath<AppleStock>
            id="line-path"
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            strokeWidth={1}
            stroke={accentColorDark}
          />
          <AreaClosed<AppleStock>
            data={stock}
            x={(d) => dateScale(getDate(d)) ?? 0}
            y={(d) => stockValueScale(getStockValue(d)) ?? 0}
            yScale={stockValueScale}
            strokeWidth={1}
            stroke="url(#line-path)"
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
                stroke={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
                strokeWidth={1}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop + 1}
                r={4}
                fill={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
                fillOpacity={0.1}
                stroke={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
                strokeOpacity={0.1}
                strokeWidth={2}
                pointerEvents="none"
              />
              <circle
                cx={tooltipLeft}
                cy={tooltipTop}
                r={4}
                fill={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
                stroke={currentTheme === 'dark' ? '#FFFFFF' : '#000000'}
                strokeWidth={2}
                pointerEvents="none"
              />
            </g>
          )}
        </svg>
        {tooltipData && (
          <div>
            <TooltipWithBounds key={Math.random()} top={tooltipTop - 60} left={tooltipLeft - 45} style={tooltipStyles}>
              {`$${getStockValue(tooltipData)}`}
            </TooltipWithBounds>
            <Tooltip
              top={innerHeight + margin.top - 14}
              left={tooltipLeft}
              style={{
                ...defaultStyles,
                minWidth: 72,
                textAlign: 'center',
                transform: 'translateX(-50%)',
              }}
            >
              {formatDate(getDate(tooltipData))}
            </Tooltip>
          </div>
        )}
      </div>
    )
  }
)

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

export const GaugeChart = ({ value, min = 0, max = 100 }) => {
  const gaugeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gaugeRef.current) return;

    // Gauge size settings
    const width = 150;
    const height = 70;
    const margin = { top: 20, right: 0, bottom: 20, left: 0 };

    // Clear previous SVG
    d3.select(gaugeRef.current).selectAll("*").remove();

    // Create SVG container
    const svg = d3
      .select(gaugeRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Arc generator
    const arc = d3
      .arc()
      .innerRadius(60)
      .outerRadius(70)
      .startAngle(-Math.PI / 2)
      .endAngle((d) => d.endAngle);

    // Scale to map value to angles
    const scale = d3
      .scaleLinear()
      .range([-Math.PI / 2, Math.PI / 2])
      .domain([min, max]);

    // Append background arc
    svg
      .append("path")
      .datum({ endAngle: Math.PI / 2 })
      .style("fill", "#ddd")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height - margin.bottom})`);

    // console.log("scale", scale(value))
    // Append foreground arc
    svg
      .append("path")
      .datum({ endAngle: scale(value) })
      .style("fill", "#007bff")
      .attr("d", arc)
      .attr("transform", `translate(${width / 2}, ${height - margin.bottom})`);

    // Append text (value)
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", height - 40)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .text(value);
  }, [value, min, max]);

  return <div ref={gaugeRef}></div>;
};

export default GaugeChart;

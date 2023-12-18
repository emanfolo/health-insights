import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { PieChartProps } from "../interfaces";

export const PieChart = ({ data }: PieChartProps) => {
  const pieChartRef = useRef(null);

  useEffect(() => {
    drawPieChart();
  }, [data]);

  const drawPieChart = () => {
    const svgElement = pieChartRef.current;

    if (svgElement) {
      // Clear the existing chart before redrawing
      d3.select(pieChartRef.current).select("svg").remove();

      const width = 200,
        height = 200,
        margin = 10;
      const radius = Math.min(width, height) / 2 - margin;

      const svg = d3
        .select(pieChartRef.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

      const color = d3
        .scaleOrdinal()
        .domain(data.map((d) => d.name))
        .range(d3.schemeCategory10);

      const pie = d3.pie().value((d) => d.value);

      const data_ready = pie(data);

      const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

      // Tooltip setup
      const tooltip = d3
        .select(svgElement)
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("position", "absolute")
        .style("text-align", "center")
        .style("padding", "6px")
        .style("background", "lightgrey")
        .style("border", "0px")
        .style("border-radius", "4px")
        .style("pointer-events", "none");

      svg
        .selectAll("slices")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", (d) => color(d.data.name))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("cursor", "pointer")
        .style("opacity", 0.7)
        .on("mouseover", (event, d) => {
          tooltip.transition().duration(200).style("opacity", 1);
          tooltip
            .html(`${d.data.name}: ${d.data.value}g`)
            .style("left", event.pageX + 10 + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", () => {
          tooltip.transition().duration(500).style("opacity", 0);
        });

      // Labels
      svg
        .selectAll("text")
        .data(data_ready)
        .enter()
        .append("text")
        .text(
          (d) =>
            `${Math.round((d.value / d3.sum(data, (d) => d.value)) * 100)}%`,
        )
        .attr("transform", (d) => `translate(${arcGenerator.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 16)
        .style("color", "white");
    }
  };

  return (
    <div className="flex gap-3">
      <div ref={pieChartRef} />
      <div className=" flex gap-2 flex-col justify-center">
        {data.map((d, i) => (
          <div key={i} style={{ color: d3.schemeCategory10[i] }}>
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
};

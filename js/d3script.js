const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewbox", "0 0 1200 1600")
  .style("border", "1px solid black");

svg.append("rect")
  .attr("x", 10)
  .attr("y", 10)
  .attr("width", 414)
  .attr("height", 16)
  .attr("fill", "blue");

d3.csv("./data/tvBrandCount.csv", d=> {
  return {
    brand: d.brand,
    count: +d.count
  };
}).then(data => {
  console.log(data);
  console.log(data.length); // How many rows
  console.log(d3.max(data, d => d.count)); // Maximum count
  console.log(d3.min(data, d => d.count)); // Minimum count
  console.log(d3.extent(data, d => d.count)); // [min, max]
});

createBarChart(data);
const createBarChart = (data) => {
  console.log("Ready to build bar chart", data);
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => 'bar bar-${d.count}');
    .attr("x", 0)           // All bars start from x = 0
    .attr("y", (d, i) => i * 30) // Space bars vertically by 30 pixels
    .attr("width", d => d.count) // Width based on count value
    .attr("height", 20)     // Fixed height for each bar
    .attr("fill", "blue");  // Fill color for bars
// Create SVG once
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 500 1600") // Initial viewBox
  .style("border", "1px solid black");

// Function to draw bar chart
const createBarChart = (data) => {
  // Update viewBox dynamically based on number of entries
  svg.attr("viewBox", `0 0 500 ${data.length * 30}`);

  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.count)])
    .range([0, 500]);

  const yScale = d3.scaleBand()
    .domain(data.map(d => d.brand))
    .range([0, data.length * 30])
    .padding(0.1);

  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", d => yScale(d.brand))
    .attr("width", d => xScale(d.count))
    .attr("height", yScale.bandwidth())
    .attr("fill", "blue");
};

// Load data
d3.csv("./data/tvBrandCount.csv", d => ({
  brand: d.brand,
  count: +d.count
})).then(data => {
  console.log(data);
  console.log("Number of entries:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));
  console.log("Extent (min, max):", d3.extent(data, d => d.count));

  // Draw chart
  createBarChart(data);
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});

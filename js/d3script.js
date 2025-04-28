// Create SVG inside the responsive container
const svg = d3.select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", "0 0 1200 1600")   // Make it scalable
  .style("border", "1px solid black"); // For testing boundary

// Define the createBarChart function FIRST
const createBarChart = (data) => {
  svg
    .selectAll("rect")
    .data(data)
    .join("rect")
    .attr("class", d => `bar bar-${d.count}`)
    .attr("x", 0)
    .attr("y", (d, i) => i * 30)        // Space each bar 30px apart vertically
    .attr("width", d => d.count)        // Width depends on count
    .attr("height", 20)                 // Fixed bar height
    .attr("fill", "blue");              // Color
};

// Now load the CSV data
d3.csv("./data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,     // must match CSV exactly
    count: +d.count     // convert count from string to number
  };
}).then(data => {
  console.log(data); // Check if data loaded
  console.log("Number of entries:", data.length);
  console.log("Max count:", d3.max(data, d => d.count));
  console.log("Min count:", d3.min(data, d => d.count));
  console.log("Extent (min, max):", d3.extent(data, d => d.count));

  // Now create the bar chart
  createBarChart(data);
}).catch(error => {
  console.error("Error loading the CSV file:", error);
});

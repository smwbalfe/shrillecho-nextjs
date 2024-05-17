import { useEffect, useRef } from 'react';
import { select, forceSimulation, forceLink, forceManyBody, forceCenter, zoom, event as d3Event } from 'd3';

const Graph = ({ data }) => {
    const d3Container = useRef(null);

    useEffect(() => {
        if (data && d3Container.current) {
            const { nodes, links } = data;
            const svg = select(d3Container.current);
            svg.selectAll("*").remove(); // Clear SVG to redraw

            // Set up zoom functionality
            const zoomHandler = zoom().on("zoom", () => {
                svg.attr("transform", d3Event.transform);
            });
            svg.call(zoomHandler);

            // Set up the simulation with forces
            const simulation = forceSimulation(nodes)
                .force("link", forceLink(links).id(d => d.id))
                .force("charge", forceManyBody())
                .force("center", forceCenter(300 / 2, 300 / 2));

            // Add labels to each node
            svg.append("g")
                .selectAll("text")
                .data(nodes)
                .enter().append("text")
                .text(d => d.id) // Display node id as label
                .attr("x", d => d.x) // Set x position of label
                .attr("y", d => d.y) // Set y position of label
                .attr("dy", 4) // Adjust vertical position
                .attr("text-anchor", "middle") // Center-align text horizontally
                .attr("font-size", "10px"); // Set font size

            // Update positions each tick
            simulation.on("tick", () => {
                svg.selectAll("text")
                    .attr("x", d => d.x)
                    .attr("y", d => d.y);
            });
        }
    }, [data]); // Redraw graph when data changes

    // Increase the size of the SVG
    const width = 1500; // Updated width
    const height = 1600; // Updated height

    return (
        <svg
            className="d3-component"
            width={width}
            height={height}
            ref={d3Container}
        />
    );
};

export default Graph;
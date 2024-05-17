import React, { useEffect, useRef } from 'react';
import { select, geoOrthographic, geoPath, geoGraticule, drag } from 'd3';

const Sphere: React.FC = () => {
    const svgRef = useRef<SVGSVGElement>(null);

    // Function to generate random points
    const generateRandomPoints = (numPoints) => {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            // Generate random longitude and latitude
            const longitude = Math.random() * 360 - 180;
            const latitude = Math.random() * 180 - 90;
            points.push([longitude, latitude]);
        }
        return points;
    };

    useEffect(() => {
        if (svgRef.current) {
            const svg = select(svgRef.current);

            const projection = geoOrthographic()
                .scale(200)
                .translate([300, 300])
                .rotate([0, 0]);

            const pathGenerator = geoPath().projection(projection);
            const graticule = geoGraticule();

            svg.append('path')
                .datum({ type: 'Sphere' })
                .attr('d', pathGenerator)
                .attr('fill', '#b3daff')
                .attr('stroke', '#000')
                .attr('stroke-width', 0.5);

            svg.append('path')
                .datum(graticule())
                .attr('class', 'graticule')
                .attr('d', pathGenerator)
                .attr('fill', 'none')
                .attr('stroke', '#777')
                .attr('stroke-opacity', 0.5)
                .attr('stroke-width', 0.5);

            svg.call(drag().on('drag', (event, d) => {
                const rotate = projection.rotate();
                const k = sensitivity / projection.scale();
                projection.rotate([rotate[0] + event.dx * k, rotate[1] - event.dy * k]);
                svg.selectAll('path').attr('d', pathGenerator);
            }));

            // Generate and plot random points
            const randomPoints = generateRandomPoints(50); // Generate 50 random points
            svg.selectAll('.point')
                .data(randomPoints)
                .enter().append('circle')
                .attr('class', 'point')
                .attr('cx', (d) => projection(d)[0])
                .attr('cy', (d) => projection(d)[1])
                .attr('r', 2) // Radius of points
                .attr('fill', 'red'); // Color of points

            const sensitivity = 75;
        }
    }, []);

    return <svg ref={svgRef} width={600} height={600} />;
};

export default Sphere;
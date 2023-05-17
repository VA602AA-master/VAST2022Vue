const d3 = require("d3");

function BuildingMap(){
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    function me(selection){

        const buildingTypes = d3.groups(selection.datum()
            .map(d => d.properties.buildingType), d=>d).map(d => d[0]);

        console.log("buildingTypes", buildingTypes);
        color.domain(buildingTypes);

        const extent = {
            type: "GeometryCollection",
            geometries: selection.datum().map(d => d.geometry)
        };

        const projection = d3.geoIdentity().reflectY(true).fitSize([700, 700], extent);
        const path = d3.geoPath().projection(projection);

        selection.selectAll("path")
            .data(selection.datum())
            .join("path")
            .attr("d", path)
            .attr("fill", d => color(d.properties.buildingType))
    }

    me.color = function(){
        return color;
    }

    return me;
}

function BuildingTypeLegend(){
    let color = d3.scaleOrdinal(d3.schemeCategory10);

    function me(selection){
        const legend = selection.append("g")
            .attr("transform", "translate(500, 20)");

        const legendItem = legend.selectAll("g")
            .data(color.domain())
            .join("g")
            .attr("transform", (d, i) => `translate(0, ${i*20})`);

        legendItem.append("rect")
            .attr("width", 10)
            .attr("height", 10)
            .attr("fill-opacity", 0.2)
            .attr("fill", d => color(d));

        legendItem.append("text")
            .attr("x", 15)
            .attr("y", 10)
            .text(d => d);
    }

    me.color = function(_){
        if (!arguments.length) return color;
        color = _;
        return me;
    }

    return me;
}

export {
    BuildingMap,
    BuildingTypeLegend
}
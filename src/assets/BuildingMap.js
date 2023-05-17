const d3 = require("d3");

function BuildingMap(){
    function me(selection){
        console.log("BuildingMap", selection.datum());
        const extent = {
            type: "GeometryCollection",
            geometries: selection.datum().map(d => d.geometry)
        };

        const projection = d3.geoIdentity().reflectY(true).fitSize([700, 700], extent);
        const path = d3.geoPath().projection(projection);

        selection.selectAll("path")
            .data(selection.datum())
            .join("path")
            .attr("d", path);
    }

    return me;
}

export {
    BuildingMap
}
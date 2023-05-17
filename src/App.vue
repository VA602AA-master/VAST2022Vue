<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <div id="map">
            <svg width="100%" height="700px" ref="map">
                <g class="buildings"></g>
                <g class="legend"></g>
            </svg>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getSingleEndpoint} from "@/assets/api_connector";
let Buffer = require('buffer/').Buffer;
const wkx = require('wkx');
const d3 = require('d3');

import {BuildingMap, BuildingTypeLegend} from "@/assets/BuildingMap";

const bm = new BuildingMap();
const bl = new BuildingTypeLegend();

export default {
  name: 'App',
  components: {
  },
  data(){
      return {
          buildings: [],
      }
  },
  mounted(){
      getSingleEndpoint({}, 'Buildings').then((response) => {
          this.buildings = response.data.map(d => ({
              type: "Feature",
              geometry: wkx.Geometry.parse(Buffer.from(d.location, 'hex')).toGeoJSON(),
              properties:{
                  buildingId: d.buildingId,
                  buildingType: d.buildingType,
                  maxOccupancy: d.maxOccupancy,
                  units: d.units,
              },
          }));
          this.drawBuildings();
      });
  },
  methods:{
      drawBuildings(){
        d3.select(this.$refs.map).select('g.buildings')
            .datum(this.buildings)
            .call(bm);

        bl.color(bm.color());

        d3.select(this.$refs.map).select('g.legend')
            .call(bl);
      }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

svg g.buildings path{
    fill-opacity: 0.2;
    stroke: grey;
}
</style>

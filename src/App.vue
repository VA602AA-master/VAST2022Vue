<template>
  <b-container id="app">
    <b-row>
      <b-col>
        <div id="map">
            <svg width="100%" height="600px">
                <g class="buildings"></g>
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
              ...d,
              location: wkx.Geometry.parse(Buffer.from(d.location, 'hex')).toGeoJSON(),
          }));
          //this.drawBuildings();

      });
  },
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
</style>

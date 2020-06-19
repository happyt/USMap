<template>
  <div class="hello">
    <h1>USA Map</h1>
    <p>{{lastState}}</p>
    <div class="box">
      <div class="leftstates">
        <div>DEMOCRAT</div>
        <ul>
          <li v-for="item in democrats" :key="item.name">{{item.id}}</li>
        </ul>
      </div>
      <div class="mapbox">
        <us-map v-on:map-clicked="onMapClick"></us-map>
      </div>
      <div class="rightstates">
        <div>REPUBLICAN</div>
        <ul>
          <li v-for="item in republicans" :key="item.name">{{item.id}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import UsMap from "./USMap.vue";
export default {
  name: "Home",
  components: {
    UsMap
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      myMap: [],
      lastState: "Please click a state to view state properties"
    };
  },
  computed: {
    republicans() {
      let repStates = this.myMap.filter(state => {
        return state.colour == 2;
      });
      return repStates;
    },
    democrats() {
      let demStates = this.myMap.filter(state => {
        return state.colour == 3;
      });
      return demStates;
    }
  },
  methods: {
    onMapClick: function(attr) {
      this.$notify({
        group: "map",
        title: "State clicked",
        type: "success",
        duration: 2000,
        text: `You clicked on ${attr.title}, index:${attr.colourIndex}`
      });
      this.lastState = attr.title;

      //console.log("B", this.myMap);
      // add to array

      if (this.myMap.length > 0) {
        this.myMap = this.myMap
          .filter(s => s.id != attr.mapId)
          .concat([{ id: attr.mapId, colour: attr.colourIndex }]);
      } else {
        this.myMap.push({ id: attr.mapId, colour: attr.colourIndex });
      }

      //    console.log("C", this.myMap);
    }
  }
};
</script>
<style scoped>
.box {
  display: flex;
}

.leftstates li,
.leftstates div {
  background-color: rgb(170, 185, 250);
  margin: 2px;
  width: 12pc;
}

.mapbox {
  flex-grow: 10;
}

.rightstates li,
.rightstates div {
  background-color: rgb(250, 181, 181);
  margin: 2px;
  width: 12pc;
}
</style>
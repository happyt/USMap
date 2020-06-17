<template>
  <div class="hello">
    <h1>USA Map</h1>
    <p>{{lastState}}</p>
    <div>
      <us-map v-on:map-clicked="onMapClick"></us-map>
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
  methods: {
    onMapClick: function(attr) {
      this.$notify({
        group: "map",
        title: "State clicked",
        text: `You clicked on ${attr.title}, index:${attr.colourIndex}`
      });
      this.lastState = attr.title;

      console.log(
        `You clicked on state id: ${attr.mapId}, title: ${attr.title}, colour: ${attr.colourIndex}`
      );
      //console.log("B", this.myMap);
      // add to array

      if (this.myMap.length > 0) {
        this.myMap = this.myMap
          .filter(s => s.id != attr.mapId)
          .concat([{ id: attr.mapId, colour: attr.colourIndex }]);
      } else {
        this.myMap.push({ id: attr.mapId, colour: attr.colourIndex });
      }

      //    this.myMap.push({ id: attr.mapId, colour: attr.colourIndex });

      var a = { id: attr.mapId, colour: attr.colourIndex };
      console.log("A", a);
      //   this.myMap.push(a);

      console.log("C", this.myMap);
    }
  }
};
</script>
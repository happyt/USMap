<template>
  <div :id="svgId" class="svg-container"></div>
</template>
<script>
import austriaMap from "../assets/austriaMap";
export default {
  name: "AustriaMap",
  data: function() {
    return {
      svgId: "austriaMap",
      mapAttr: {
        viewBoxWidth: 1600,
        viewBoxHeight: 800,
        imageWidth: 1106,
        imageHeight: 500
      },
      svgContainer: null,
      myMap: {
        type: Array,
        default: () => []
      }
    };
  },
  mounted: function() {
    this.generateMap();
  },
  methods: {
    generateMap: function() {
      const vue = this;
      const mapData = austriaMap.g.path;
      const svgContainer = vue
        .$svg("austriaMap")
        .size("100%", "100%")
        .viewbox(-400, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
      vue.svgContainer = svgContainer;
      const currentMap = this.myMap;
      console.log("A", currentMap);
      mapData.forEach(pathObj => {
        vue.generatePath(svgContainer, pathObj);
      });
    },
    generatePath: function(svgCont, pathObj) {
      const vue = this;

      const attrs = {
        fill: "#8470ff",
        stroke: "white",
        "stroke-width": 2,
        title: pathObj["-title"],
        "map-id": pathObj["-id"]
      };

      const element = svgCont.path(pathObj["-d"]).attr(attrs);
      element.click(function() {
        const styles = ["map", "highlite", "republican", "democrat"];
        let colourIndex = 0;
        const mapId = this.node.attributes["map-id"].value;
        const title = this.node.attributes["title"].value;
        //       console.log(title + " clicked", this.node.attributes["class"]);
        if (this.node.attributes["class"]) {
          var currentStyle = this.node.attributes["class"].value;
          var current = styles.findIndex(element => element == currentStyle);
          colourIndex = current == styles.length - 1 ? 0 : current + 1;
          //        console.log("index=", colourIndex, "/", styles.length);
        } else {
          colourIndex = 1; // default first time to highlite
        }
        this.node.setAttribute("class", styles[colourIndex]);

        vue.$emit("map-clicked", { mapId, title, colourIndex });
      });
    }
  }
};
</script>
<style>
.map {
  fill: "#8470ff";
  stroke: "red";
}
.highlite {
  fill: rgb(212, 199, 17);
  stroke: "#000";
}
.republican {
  fill: red;
  stroke: "white";
}
.democrat {
  fill: blue;
  stroke: "white";
}
</style>
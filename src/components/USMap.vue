<template>
  <div :id="svgId" class="svg-container"></div>
</template>
<script>
import USMap from "../assets/USMap";
export default {
  name: "USMap",
  data: function() {
    return {
      svgId: "USMap",
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
      const mapData = USMap.g.path;
      const svgContainer = vue
        .$svg("USMap")
        .size("100%", "100%")
        .viewbox(-400, 0, vue.mapAttr.viewBoxWidth, vue.mapAttr.viewBoxHeight);
      vue.svgContainer = svgContainer;
      // const currentMap = this.myMap;
      //     console.log("MAP", currentMap);
      mapData.forEach(pathObj => {
        vue.generatePath(svgContainer, pathObj);
      });
    },
    generatePath: function(svgCont, pathObj) {
      const vue = this;

      const attrs = {
        fill: "#8470ff",
        stroke: "white",
        "stroke-width": 1,
        title: pathObj["title"],
        "map-id": pathObj["-id"]
      };

      const element = svgCont.path(pathObj["-d"]).attr(attrs);

      element.click(function() {
        const styles = ["map", "highlite", "republican", "democrat", "stripe"];

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
.highlitex {
  background: repeating-linear-gradient(
    45deg,
    #606dbc,
    #a73b3b 10px,
    #465298 10px,
    #465298 20px
  );
}

.stripe {
  background-image: repeating-linear-gradient(
    45deg,
    #fff,
    #fff 0.08em,
    var(--r) 0.08em,
    var(--r) 0.16em
  );
}

.svgcss {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+CiAgPHJlY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJyBmaWxsPSd3aGl0ZScgLz4KICA8Y2lyY2xlIGN4PSczLjUnIGN5PSczLjUnIHI9JzMuNScgZmlsbD0nYmxhY2snLz4KPC9zdmc+Cg==");
}

.highlite {
  fill: #e3f113;
}

.republican {
  fill: red;
  stroke: "white";
}
.democrat {
  fill: blue;
  stroke: "white";
}
.split {
  fill: rgb(147, 43, 173);
}
</style>
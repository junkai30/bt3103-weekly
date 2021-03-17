<template>
    <div >
    <!--div id="chart">
        <bar-chart></bar-chart>
    </div-->
    <bar-chart></bar-chart>
    <line-chart></line-chart>
    </div>
</template>

<script>
import Barchart from './charts/BarChart.vue'
import Linechart from './CallAPI.vue'
export default {
    components: {
        "bar-chart": Barchart,
        "line-chart": Linechart
    }
}
</script>

<style scoped>
#main{
    content:"";
    display:table;
    clear:both;
}
#chart{
  height:100%;
  width:240px;
  border-style: solid;
  border-color:rgb(155, 84, 84);
  border-width: 1px;
  
  padding:30px;
  float:left;
}
</style>
import {Line} from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            datacollection: {
                labels: [],
                datasets: []
            },

            options: {
                legend: { display: false},
                title: {
                    display: true,
                    text:'PSI Twenty Four Hourly'
                },
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },

    methods: {
        fetchItems: function() {
            axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
            .then(response => {
                response.data.items.forEach(data => {
                    this.datacollection.labels.push(data.timestamp)
                });
                //west, national,east,central,south,north
                response.data.region_metadata.forEach(region => {
                    this.datacollection.datasets.push({
                        "data":[],
                        "label": region.name,
                        "fill": false,

                    })
                });
                var colors = ["red","blue","yellow", "orange", "black", "green"]
                for (let i = 0; i < 6; i++) {
                    this.datacollection.datasets[i].borderColor = colors[i];
                }

                response.data.items.forEach(item => {
                    this.datacollection.datasets[0].data.push(item.readings.psi_twenty_four_hourly.west);
                    this.datacollection.datasets[1].data.push(item.readings.psi_twenty_four_hourly.national);
                    this.datacollection.datasets[2].data.push(item.readings.psi_twenty_four_hourly.east);
                    this.datacollection.datasets[3].data.push(item.readings.psi_twenty_four_hourly.central);
                    this.datacollection.datasets[4].data.push(item.readings.psi_twenty_four_hourly.south);
                    this.datacollection.datasets[5].data.push(item.readings.psi_twenty_four_hourly.west);
                });
                this.renderChart(this.datacollection, this.options)
                console.log(this.datacollection.datasets[0])
            })
        }
    },

    created() {
        this.fetchItems()
    }
}
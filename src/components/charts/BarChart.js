import { Bar } from 'vue-chartjs';
import database from '../../firebase.js';

export default {
    extends: Bar,
    data: function() {
        return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Number of each dish",
                backgroundColor: ["#10E321", "#E31010", "#5310E3","#D9E317","#E017E3","#29ced6"],
                data: []
            }]
        },

        options: {
            legend: { display: false},
            title: {
                display: true,
                text: 'Total number of each dish'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
    },


    methods: {
        fetchItems: function() {
            database.collection('menu').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    this.datacollection.labels.push(doc.data().name)
                    this.datacollection.datasets[0].data.push(0)
                })
                console.log(this.datacollection.labels)
                this.renderChart(this.datacollection, this.options)
            });

            database.collection('orders').get().then(querySnapShot => {
                querySnapShot.forEach(doc => {
                    var order = doc.data().order;
                    for (let i = 0;i < order.length;i++) {
                        if (order[i].itemName === "Prawn omelette") {
                            this.datacollection.datasets[0].data[0]+=order[i].itemQty
                        } else if (order[i].itemName === "Dry Beef Hor Fun") {
                            this.datacollection.datasets[0].data[1]+=order[i].itemQty
                        } else if (order[i].itemName === "Sambal KangKung") {
                            this.datacollection.datasets[0].data[2] += order[i].itemQty
                        } else if (order[i].itemName === "Pork Fried Rice") {
                            this.datacollection.datasets[0].data[3] += order[i].itemQty
                        } else if (order[i].itemName === "Mapo Tofu") {
                            this.datacollection.datasets[0].data[4] += order[i].itemQty
                        } else //Cereal Prawn {
                            this.datacollection.datasets[0].data[5] += order[i].itemQty
                        }
                    

                })
                this.renderChart(this.datacollection, this.options)
            })


        
    }
    },

    created() {
        this.fetchItems()

    }
}

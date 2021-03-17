<template>
    <div>
        <div v-for="item in datapacket" :key="item.id">
            <div v-for="order in item.order" :key="order.id">
                {{order.itemName}} : {{order.itemQty}}
                <br>
                <input
                v-bind:id="order.itemName"
                type="number"
                placeholder=0
                min=0
                />
            </div>
        </div>
        <br> 
        <button v-on:click="updateOrder()">Update</button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            datapacket: []
        };
    },

    methods: {
        fetchItems: function() {
            database.collection('orders')
            .get()
            .then((snapshot)=> {
                snapshot.docs.forEach((doc) => {
                    if (doc.id === this.$route.params.id) {
                        this.datapacket.push(doc.data());
                    }
                });
            });
        },

        updateOrder: function() {
        var dup = this.datapacket;
        for (var i = 0; i < this.datapacket[0].order.length; i++) {
        var updatedValue = document.getElementById(
          this.datapacket[0].order[i].itemName
        ).value;
        //this is done because itemQty vs .value is diff
        dup[0].order[i].itemQty = updatedValue;
        }
            database.collection("orders")
            .doc(this.$route.params.id)
            .set(dup[0])
            .then(() => this.$router.push({path: "/orders"}));

        },


    },

    created: function() {
        this.fetchItems();
    },
    
}
</script>

<style scoped>
</style>
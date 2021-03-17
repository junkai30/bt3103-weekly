<template>
    <div>
        <ul>
            <li v-for="basket in itemsSelected" :key="basket[0]">
                <h2>{{basket[0]}} x {{basket[1]}}</h2>
            </li>
        </ul>
        <button class="button" v-on:click="findTotal()">Calculate Total</button>
        <h2 v-show="flag">Subtotal : {{subtotal}}</h2>
        <h2 v-show="flag">Grandtotal : {{grandTotal}}</h2>
        <br><br>
        <button class = "button" v-on:click="sendOrder()">Add Order</button>
    </div>
</template>

<script>
import database from '../firebase.js'

export default {
    data() {
        return {
            subtotal: 0,
            flag: false
        }
    },

    props: {
        itemsSelected: {
            type: Array
        },
        items: {
            type: Array
        },
    },

    methods: {
        findTotal : function() {
            this.flag = true;
            this.subtotal = 0;
            for (let i = 0; i < this.itemsSelected.length;i++) {
                this.subtotal += this.itemsSelected[i][2] * this.itemsSelected[i][1];
            }
            if (this.subtotal === 0) {
                this.flag = false;
            }
        },

        sendOrder: function() {
            var items_copy = [...this.items];
            var order = [];
            //add items that have been ordered
            for (let i = 0; i < this.itemsSelected.length; i++) {
                order.push({
                    itemName: this.itemsSelected[i][0],
                    itemQty: this.itemsSelected[i][1],
                });
            for(let j = 0; j < items_copy.length; j++) {
                if (this.itemsSelected[i][0] === items_copy[j].name) {
                    items_copy.splice(j,1)
                }
            }

            }

            for (let k = 0; k < items_copy.length; k++) {
                order.push({
                    itemName: items_copy[k].name,
                    itemQty: 0,
                });
            }

            database.collection("orders").add({
                order: order,
            }).then(() => location.reload());
            alert('Your order has been received')

        },
    },

    computed: {
        grandTotal: function() {
            return (this.subtotal * 1.07).toFixed(2)
        }
    }


}
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 15px 25px;
  font-size: 24px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  outline: none;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 15px;
  box-shadow: 0 9px #999;
}

.button:hover {background-color: #3e8e41}
.button:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
</style>
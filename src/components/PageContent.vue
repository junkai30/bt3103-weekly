<template>
    <div>
        <div id="menu">
        <ul>
            <li v-for="item in items" :key="item.name">
                <div id="itemName">{{item.name}}</div>
                <img v-bind:src="item.imageURL">
                <div id="price">${{item.price}}</div>
                <quantityCounter v-bind:item=item v-on:counter="onCounter"></quantityCounter>
            </li>

        </ul>
        </div>
        <div id='shoppingBasket'>
        <basket v-bind:itemsSelected='itemsSelected' v-bind:items="items"></basket>
        </div>
    </div>
</template>

<script>
import Basket from './Basket.vue'
import database from '../firebase.js'

export default {
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },


    components: {
        'basket': Basket
    },

    methods: {
        onCounter: function (item, count) {
      if (this.itemsSelected.length === 0 && count > 0) {
        //If there is nothing in items selected, push the ORDER in
        this.itemsSelected.push([item.name, count, item.price]);
        return
      } else {

        // Loop through everything to check what is not in the basket
        for (let i = 0; i < this.itemsSelected.length; i++) {
          const curr_item = this.itemsSelected[i];
          const item_name = curr_item[0];

          // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
          if (item_name === item.name && count > 0) {
            this.itemsSelected.splice(i, 1, [item.name, count, item.price])
            return
          }
          // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
          else if (item_name === item.name && count === 0) {
              this.itemsSelected.splice(i,1);
              return              
          } 
          
        }
      }
      // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
      this.itemsSelected.push([item.name, count, item.price])
  
    },
      fetchItems: function() {
        database.collection('menu').get().then((querySnapShot)=>{
          let food={}
          querySnapShot.forEach(doc=>{
            food = doc.data()
            food.show=false
            food.id = doc.id
            this.items.push(food)
          })
        })
      },
    },

    created() {
      this.fetchItems()
    }
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}

#price {
  font-size: 30px;
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 40%;
  left: 78%;
}
#menu {
    float: left;
    width:70%;
    padding: 10px;
}
</style>
<template>
    <div>
        <button class="button" value="+" v-on:click="increment()">+</button>
        <h2 style="margin-left:10px; margin-right:10px; display: inline-block;">{{counter}}</h2>
        <button class="button" value="-" v-on:click="decrement()">-</button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data() {
        return {
            counter: 0,
        }
    },

    methods : {
        increment: function() {
            if (this.counter == 10) {
                alert('You cannot buy more than 10 items')
            } else {
                this.counter++;
            }
            this.$emit('counter', this.item, this.counter);
        },

        decrement: function() {
            if (this.counter != 0) {
                this.counter--;
                this.$emit('counter', this.item, this.counter);
            } 
            //this.$emit('counter', this.item, this.counter);
        }
    },

    props: {
        item : {}
    }
    
}
</script>

<style scoped>
.button {
    background-color:blueviolet;
    border: 2px solid black;
    padding: 15px 25px;
    border-radius: 8px;
    color:white;
    text-align:center;
    display: inline-block;
    font-size:16px;
}
</style>
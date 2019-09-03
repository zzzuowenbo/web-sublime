<template>
    <div class="Header">
        <h1>Todo List</h1>
        <input type="text">
    </div>
</template>

<script>
    export default {
        name:'Header'
    }
</script>

<style scoped>
    h1{
        text-align: center;
        font-size: 20px;
    }
    input{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        padding: 0 10px;
        font-size: 16px;
    }
</style>
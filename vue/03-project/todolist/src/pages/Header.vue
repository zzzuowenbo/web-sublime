<template>
    <div class="Header">
        <h1>Todo List</h1>
        <input 
            type="text"
            placeholder="请输入任务:"
            v-model="task"
            @keyup.enter="handleAdd()" 
        >
    </div>
</template>

<script>
    export default {
        name:'Header',
        props:{
            addTodo:Function
        },
        data(){
            return{
                task:''
            }
        },
        methods:{
            handleAdd(){
                const task = this.task.trim();
                if(!task){
                    alert('请输入任务:');
                    return;
                }
                const todo = {
                    task,
                    done:false
                }
                this.addTodo(todo);
                this.task = '';
            }
        }
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
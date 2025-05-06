<template>
    <div>
        <h1>My List</h1>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
            <h2> {{ todo.name }} </h2>
            <p> {{ todo.description }} </p>
            <p v-if="todo.location"> {{ todo.location }} </p>
            <p> {{ todo.date }} </p>
            <button @click="deleteTodo(todo.id)" class="button-btn-green">Complete</button>
            <button @click="editTodo(todo.id)" class="button-btn-dark-green">Edit</button>
          </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ListComponent',
        data() {
            return {
                todos: [],
            }
        },
        methods: {
            async fetchTodos() {
                const response = await fetch('http://localhost:3000/api/todos');
                const data = await response.json();
                this.todos = data;
            },
            async deleteTodo(id) {
                await fetch(`http://localhost:3000/api/todos/${id}`, {
                    method: 'DELETE',
                });
                this.fetchTodos();
            }
        },
        mounted() {
            this.fetchTodos();
        }
    }
</script>

<style>
   .button-btn-green {
    background-color: green; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
   }

   .button-btn-dark-green {
    background-color: darkgreen; /* Green */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
   }
</style>


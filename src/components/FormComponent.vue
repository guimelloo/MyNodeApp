<template>
  <div>
    <form>
        <input type="text" placeholder="Name of to do" name="name" required v-model="name" />
        <input type="date" placeholder="date to be finished" name="date" required v-model="date"/>
        <input type="text" placeholder="location" name="location" v-model="location"/>
        <input type="text" placeholder="description" name="description" required v-model="description"/>
        <button @click="submitForm">Submit</button>
    </form>
  </div>
</template>

<script>
     export default {
        name: 'FormComponent',
        data() {
            return {
                name: '',
                date: '',
                location: '',
                description: '',
            }
        },
        methods: {
            async submitForm() { 
                console.log(this.name, this.date, this.location, this.description);

                const infos = {
                    name: this.name,
                    date: this.date,
                    location: this.location,
                    description: this.description,
                };

                const response = await fetch('http://localhost:3000/api/todos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(infos),
                });
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }
    input {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }
    
</style>

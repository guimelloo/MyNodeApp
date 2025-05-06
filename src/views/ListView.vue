<template>
    <ListComponent />
</template>

<script>
    import ListComponent from '../components/ListComponent.vue';
    export default {
        components: { ListComponent },
    }
</script>

<style>
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        border: 1px solid #ffffff;
        padding: 10px;
        margin: 10px;
    }
    h2 {
        margin: 0;
    }
    p {
        margin: 0;
    }   
</style>
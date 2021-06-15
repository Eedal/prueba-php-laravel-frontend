<template>
    <div class="container">

      <router-link to="/usuario/crear" class="btn btn-success">Crear nuevo usuario</router-link>
        <br/>
        <br/>
        <div class="card">
            <div class="card-header">
                Usuarios
               
            </div>
            <div class="card-body">
                <FormulateInput type="text" />

                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.data.user_id">
                            <td>{{user.data.user_id}}</td>
                            <td>{{user.data.attributes.nombres}}</td>
                            <td>{{user.data.attributes.correo}}</td>
                            <td>
                                <div class="btn-group" role="group" arial-label="">
                                    <router-link :to="{name: 'EditComponent', params:{id:user.data.user_id}}" class="btn btn-info">Editar</router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        async getUsers() {
            const users = await axios.get('https://stark-bastion-08167.herokuapp.com/api/users')
            try {
                this.users = users.data.data
                console.log(this.users);
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
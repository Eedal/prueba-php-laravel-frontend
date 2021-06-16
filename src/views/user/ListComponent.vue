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
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.data.user_id">
                            <td>{{user.data.attributes.nombres}}</td>
                            <td>{{user.data.attributes.correo}}</td>
                            <td>
                                <div class="btn-group" role="group" arial-label="">
                                    <router-link :to="{name: 'EditComponent', params:{id:user.data.user_id}}" class="btn btn-info">Editar</router-link>
                                    <button type="button" v-on:click="deleted(user.data.user_id)" class="btn btn-danger">Borrar</button>
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
import Swal from 'sweetalert2'
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
        getUsers() {
            axios.get('https://prueba-php-laravel-backend.herokuapp.com/api/users')
            .then(response => {
                this.users = response.data.data
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleted(user_id) {
            Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, quiero eliminar el usuario!'
            }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('https://prueba-php-laravel-backend.herokuapp.com/api/users/' + user_id)
                .then(() => {
                    Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido eliminado',
                    'success'
                    )
                    this.getUsers()
                })
                .catch(error => {
                    console.log(error);
                })
            }
            })
            
        }
    }
}
</script>
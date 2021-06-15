<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Edición
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="update">
                    <div class="form-group">
                        <label for="cedula">Cédula</label>
                        <input type="text" 
                            class="form-control" 
                            name="cedula" 
                            id="cedula"
                            aria-describedby="helpId"
                            placeholder="Los cedula"
                            v-model="user.cedula"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe la cédula del usuario</small>
                    </div>
                    <div class="form-group">
                        <label for="nombres">Nombres</label>
                        <input type="text" 
                            class="form-control" 
                            name="nombres" 
                            id="nombres"
                            aria-describedby="helpId"
                            placeholder="Los nombres"
                            v-model="user.nombres"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe el nombre del usuario</small>
                    </div>
                    <div class="form-group">
                        <label for="apellidos">Apellidos</label>
                        <input type="text" 
                            class="form-control" 
                            name="apellidos" 
                            id="apellidos"
                            aria-describedby="helpId"
                            placeholder="Los apellidos"
                            v-model="user.apellidos"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe el apellido del usuario</small>
                    </div>
                    <div class="form-group">
                        <label for="correo">correo</label>
                        <input type="email" 
                            class="form-control" 
                            name="correo" 
                            id="correo"
                            aria-describedby="helpId"
                            placeholder="Los correo"
                            v-model="user.correo"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe el correo del usuario</small>
                    </div>
                    <div class="form-group">
                        <label for="telefono">Télefono</label>
                        <input type="text" 
                            class="form-control" 
                            name="telefono" 
                            id="telefono"
                            aria-describedby="helpId"
                            placeholder="Los telefono"
                            v-model="user.telefono"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe el teléfono del usuario</small>
                    </div>

                    <div class="btn-group" role="group" arial-label="">
                        <button type="submit" class="btn btn-success">Modificar</button>
                        <router-link :to="{name:'ListComponent'}" class="btn btn-warning">Cancelar</router-link>
                    </div>

                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    created: function(){
        this.getUser()
    },
    data() {
        return {
            user: {
                
            }
        }
    },
    methods: {
        getUser() { 
            axios.get('https://stark-bastion-08167.herokuapp.com/api/users/'+this.$route.params.id)
            .then(response => { 
                this.user = response.data.data.attributes
                this.user.id = response.data.data.user_id
                console.log(this.user);
            })
            .catch(error => {
                console.log(error);
            })
        },
        async update() {
            console.log(this.user);
            try {
                await axios.put('https://stark-bastion-08167.herokuapp.com/api/users/'+this.user.id,this.user)
                window.location.href="/usuario/listar"
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
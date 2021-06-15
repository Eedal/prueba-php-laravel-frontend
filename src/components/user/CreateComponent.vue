<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Creación
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="save">
                    <div class="form-group">
                        <label for="cedula">Cédula</label>
                        <input type="text" 
                            class="form-control" 
                            name="cedula" 
                            id="cedula"
                            aria-describedby="helpId"
                            placeholder="Los cedula"
                            v-model="user.cedula"
                            v-on:keyup="contentLetters('cedula', user.cedula)"
                            required
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
                            required
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
                            required
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
                            v-on:keyup="contentLetters('telefono', user.telefono)"
                            >
                        <small id="helpId" class="form-text text-muted">Escribe el teléfono del usuario</small>
                    </div>

                    <div class="btn-group" role="group" arial-label="">
                        <button type="submit" class="btn btn-success">Agregar</button>
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
    data() {
        return { 
            user: {},
        }  
    },     
    methods: {  
        async save() {
            try { 
                await axios.post('https://stark-bastion-08167.herokuapp.com/api/users', this.user)
                window.location.href="/usuario/listar"
            } catch (error) {
                let keys = Object.keys(error.response.data.errors)
                let text = "El formulario no es valido \n"
                for(let i=0; i< keys.length; i++){
                    let key = keys[i];
                    for(let j=0; j<error.response.data.errors[key].length;j++ ){
                        let er = error.response.data.errors[key][j]
                        text += er +"\n"
                    }
                }
                alert(text); 
            } 
        },
        contentLetters(input, value){
            var result = /[?!a-zA-Z]/.test(value);
            if (result)
                alert("Campo " + input +" no puede contener letras");
        }
    }
}
</script>
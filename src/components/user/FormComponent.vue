<template>
<p v-if="errors.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
      <li v-for="error in errors" :key="error">{{ error }}</li>
    </ul>
  </p>
    <div class="form-group">
        <label for="cedula">Cédula</label>
        <input type="text" 
            class="form-control" 
            name="cedula" 
            id="cedula"
            aria-describedby="helpId"
            placeholder="123456789"
            v-model="user.cedula"
            required
            >
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
    </div>
    <div class="form-group">
        <label for="correo">correo</label>
        <input type="email" 
            class="form-control" 
            name="correo" 
            id="correo"
            aria-describedby="helpId"
            placeholder="usuario@ejemplo.com"
            v-model="user.correo"
            required
            >
    </div>
    <div class="form-group">
        <label for="telefono">Télefono</label>
        <input type="text" 
            class="form-control" 
            name="telefono" 
            id="telefono"
            aria-describedby="helpId"
            placeholder="3016152112"
            v-model="user.telefono"
            >
    </div>
    <div class="btn-group" role="group" arial-label="">
        <button type="button" class="btn btn-success" @click="save" @keyup.enter="save" v-if="method=='save'">Agregar</button>
        <button type="button" class="btn btn-success" @click="update" @keyup.enter="update" v-if="method=='update'">Modificar</button>
        <router-link :to="{name:'ListComponent'}" class="btn btn-warning">Cancelar</router-link>
    </div>
</template>

<script>
//import Swal from 'sweetalert2'
export default {
    props: [
        "method",
        "userEdit"
    ],
    data() {
        return { 
            user: {},
            errors: [],

        }  
    },
    updated(){
        if(this.method != 'save')
            this.user = this.userEdit ? this.userEdit : {};
    },
    methods: {
        save(){
            if(this.checkForm())
                this.$emit('user', this.user)
        },
        update(){
            if(this.checkForm())
                this.$emit('user', this.user)
        },
        checkForm(){
            this.errors = [];
            /* Cedula requerida */
            if(!this.user.cedula){
                this.errors.push('El campo cedula es requerido')
            }else{
                /* Cedula no puede tener letra */
                var cedulaTieneLetra = /[?!a-zA-Z]/.test(this.user.cedula);
                if (cedulaTieneLetra) this.errors.push('El campo cedula no puede contener letras')
            }

            if(this.user.telefono){
                /* Telefono no puede tener letra */
                var telefonoTieneLetra = /[?!a-zA-Z]/.test(this.user.telefono);
                if (telefonoTieneLetra) this.errors.push('El campo telefono no puede contener letras')
            }

            /* Correo requerido */
            if(!this.user.correo){
                this.errors.push('El campo correo es requerido')
            }else{
                /* Correo valido */
                var correoValido = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.user.correo);
                if (!correoValido) this.errors.push('El campo correo no es valido')
            }

            /* Si no hay errores se emiten los datos del usuario */
            if(!this.errors.length){
                return true
            }
            return false

        }
    }
}
</script>
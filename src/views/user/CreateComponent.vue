<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Creación
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="save">
                    <FormComponent
                        method="save"
                        v-on:user="save"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import FormComponent from '../../components/user/FormComponent'
import Swal from 'sweetalert2'
export default {
    data() {
        return { 
            user: {},
        }  
    },     
    components: {
        FormComponent,
    },
    methods: {  
        save(user) {
            axios.post('https://prueba-php-laravel-backend.herokuapp.com/api/users', user)
            .then(() => {
                window.location.href="/usuario/listar"
            })
            .catch(error => {
                let keys = Object.keys(error.response.data.errors)
                let text = "El formulario no es valido \n\n"
                for(let i=0; i< keys.length; i++){
                    let key = keys[i];
                    for(let j=0; j<error.response.data.errors[key].length;j++ ){
                        let er = error.response.data.errors[key][j]
                        text += "- "+ er +"\n"
                    }
                }
                Swal.fire(text)
            })
        }
    }
}
</script>
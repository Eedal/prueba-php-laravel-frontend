<template>
    <div class="container">
        <div class="card">
            <div class="card-header">
                Edición
            </div>
            <div class="card-body">
                <form v-on:submit.prevent="update">
                    <form v-on:submit.prevent="update">
                        <FormComponent
                            method="update"
                            v-on:user="update"
                            :userEdit="user"
                        />
                    </form>
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
    created: function(){
        this.getUser()
    },
    data() {
        return {
            user: {}
        }
    }, 
    components: {
        FormComponent
    },
    methods: {
        getUser() { 
            axios.get('https://prueba-php-laravel-backend.herokuapp.com/api/users/' + this.$route.params.id)
            .then(response => { 
                this.user = response.data.data.attributes
                this.user.id = response.data.data.user_id
            })
            .catch(error => {
                console.log(error);
            })
        },
        update(user) {
            axios.put('https://prueba-php-laravel-backend.herokuapp.com/api/users/' + this.user.id, user)
            .then(() => {
                window.location.href="/"
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
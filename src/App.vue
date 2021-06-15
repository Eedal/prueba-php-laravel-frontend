<template>
 
  <nav class="navbar navbar-expand navbar-light bg-light">
    <div class="nav navbar-nav">

      <router-link to="/usuario/crear" class="nav-link">Crear</router-link>
      <router-link to="/usuario/listar" class="nav-link">Usuarios</router-link>

    </div>
  </nav>

  <router-view/>
</template>

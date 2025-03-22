<template>
  <div class="profile-container">
    <h2>👤 Mi Perfil</h2>
    <div v-if="loading" class="loading">Cargando...</div>
    <div v-else-if="error" class="error-message">❌ {{ errorMessage }}</div>
    <div v-else-if="userStore.userData">
      <div class="profile-card">
        <!-- 📌 Subir imagen de perfil -->
        <label class="avatar-upload">
          <input type="file" @change="uploadAvatar" accept="image/*" class="display-no" />
          <img :src="userStore.userData.avatar || defaultAvatar" alt="Avatar" class="avatar" />
          <span v-if="isUploading" class="upload-text">⏳ Subiendo...</span>
          <span v-else class="upload-text">📷 Cambiar Foto</span>
        </label>
        
        <button @click="toggleEdit" class="edit-btn">
          {{ isEditing ? "✖ Cancelar" : "✏️ Editar" }}
        </button>

        <div class="user-info">
          <label>Email:</label>
          <p>{{ userStore.userData.email }}</p>

          <label>Nombre:</label>
          <input v-if="isEditing" v-model="userStore.userData.name" type="text" />
          <p v-else>{{ userStore.userData.name }}</p>
        </div>

        <div v-if="isEditing" class="button-group">
          <button @click="updateProfile" class="save-btn">💾 Guardar Cambios</button>
        </div>
      </div>
    </div>
    <div v-else class="error-message">❌ No se encontraron datos del usuario.</div>
  </div>
</template>
  
<script>
import { useUserStore } from "@/store/userStore";
import { ref, onMounted } from "vue";
import defaultAvatar from "@/assets/UserLogo.png";
import axios from "axios";

export default {
  setup() {
    const userStore = useUserStore();
    const newPassword = ref("");
    const isEditing = ref(false);
    const loading = ref(true);
    const error = ref(false);
    const errorMessage = ref("");
    const isUploading = ref(false); // Estado de carga


    // 📌 Alternar el modo de edición
    const toggleEdit = () => {
      isEditing.value = !isEditing.value;
    };

    // 📌 Subir imagen de perfil
    const uploadAvatar = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("avatar", file);

      try {
        isUploading.value = true; // 📌 Activar loading

        const response = await axios.post("http://localhost:4005/users/upload-avatar", formData, {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        userStore.userData.avatar = response.data.avatar;
        alert("✅ Imagen de perfil actualizada con éxito");
      } catch (error) {
        console.error("❌ Error al subir la imagen:", error);
        errorMessage.value = "No se pudo subir la imagen.";
        error.value = true;
      } finally {
        isUploading.value = false; // 📌 Desactivar loading
      }
    };

    // 📌 Actualizar datos del usuario
    const updateProfile = async () => {
      try {
        const updateData = { name: userStore.userData.name }; // Solo enviamos datos de texto

        await axios.put(`http://localhost:4005/users/update/${userStore.userData._id}`, updateData, {
          headers: {
            Authorization: `Bearer ${userStore.token}`,
          },
        });

        alert("✅ Perfil actualizado con éxito");
        isEditing.value = false;
      } catch (err) {
        console.error("❌ Error al actualizar perfil:", err);
        error.value = true;
        errorMessage.value = "Error al actualizar el perfil.";
      }
    };

    // 📌 Obtener datos del usuario al montar la vista
    onMounted(async () => {
      try {
        if (!userStore.userData) {
          await userStore.fetchUserData();
        }
      } catch (err) {
        error.value = true;
        errorMessage.value = "No se pudo cargar la información del usuario.";
      } finally {
        loading.value = false;
      }
    });

    return {
      userStore,
      newPassword,
      isEditing,
      loading,
      error,
      errorMessage,
      defaultAvatar,
      toggleEdit,
      updateProfile,
      uploadAvatar,
    };
  },
};
</script>
  
<style scoped>
  .profile-container {
    max-width: 420px;
    margin: 50px auto;
    text-align: center;
    background: var(--color-light-secondary);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  /* 📌 Botón de Editar */
  .edit-btn {
    position: absolute;
    right: 30px;
    top: 30px;
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background: var(--color-primary);
    color: white;
  }
  
  /* 📌 Tarjeta de perfil */
  .profile-card {
    padding: 20px;
  }
  
  .avatar-upload {
    position: relative;
    display: inline-block;
    cursor: pointer;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 3px solid var(--color-primary);
  }
  
  .upload-text {
    display: block;
    margin-top: 5px;
    font-size: 14px;
    color: var(--color-dark-secondary);
  }
  
  /* 📌 Información del usuario */
  .user-info {
    text-align: left;
    margin-top: 15px;
  }
  
  .user-info label {
    font-weight: bold;
    display: block;
  }
  
  .user-info p,
  .user-info input {
    width: 100%;
  }
  
  input {
    padding: 8px;
    border: 1px solid var(--color-secondary);
    border-radius: 5px;
  }
  
  /* 📌 Grupo de botones */
  .button-group {
    margin-top: 15px;
  }
  
  .save-btn {
    padding: 8px 12px;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    background: var(--color-dark-secondary);
    color: white;
  }
  
  /* 📌 Mensaje de carga y error */
  .loading {
    font-weight: bold;
    color: var(--color-dark-secondary);
  }
  
  .error-message {
    font-weight: bold;
    color: red;
  }
  .display-no {
    display: none;
  }
</style>
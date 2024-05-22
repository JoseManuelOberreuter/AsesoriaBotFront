<template>
  <div>
    <button class="menu-toggle" @click="toggleSidebar">☰</button>
    <aside :class="['sidebar', { open: isOpen }]">
      <nav>
        <ul>
          <li class="first-item"><a href="#">Nuevo Chat</a></li>
          <li><a href="#">Chat antiguo</a></li>
          <li><a href="#">Chat antiguo</a></li>
          <li><a href="#">Chat antiguo</a></li>
        </ul>
      </nav>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'SideBar',
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #333;
  padding: 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  transition: transform 0.3s ease;
  transform: translateX(-100%);
  z-index: 1000;
}

.sidebar.open {
  transform: translateX(0);
}

.menu-toggle {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 1rem;
  left: 1rem;
  cursor: pointer;
  z-index: 1100;
  border-radius: 15px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 1rem 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease;
  border-radius: 8px;
}

.sidebar a:hover {
  background-color: #7c7c7c;
}

.sidebar .first-item a {
  background-color: #007bff;
  padding: 0.5rem 1rem;
}

.sidebar .first-item a:hover {
  background-color: #7c7c7c;
}

@media (min-width: 768px) {
  .sidebar {
    transform: translateX(0);
    width: 15vw;
  }

  .menu-toggle {
    display: none;
  }
}
</style>

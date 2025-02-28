<template>
  <span v-html="displayText"></span>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number,
      default: 50
    }
  },
  data() {
    return {
      displayText: '',
      currentIndex: 0
    };
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      let index = 0;
      let finalText = ""; // Acumulador del texto que se va mostrando
      const characters = this.text.split(""); // Ahora dividimos el texto carácter por carácter

      const interval = setInterval(() => {
        if (characters[index] === "<") {
          // Si detecta una etiqueta HTML, la procesa completa
          let tag = "";
          while (index < characters.length && characters[index] !== ">") {
            tag += characters[index];
            index++;
          }
          tag += characters[index]; // Agrega el cierre de la etiqueta ">"
          finalText += tag; // Agrega la etiqueta HTML completa
        } else {
          // Agrega el carácter siguiente de forma normal
          finalText += characters[index] || "";
        }

        this.displayText = finalText;
        index++;

        if (index >= characters.length) {
          clearInterval(interval);
        }
      }, this.speed);
    }
  }
};
</script>

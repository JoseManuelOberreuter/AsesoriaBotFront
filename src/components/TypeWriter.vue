<template>
  <span>{{ displayText }}</span>
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
      default: 50 // valor por defecto
    }
  },
  data() {
    return {
      displayText: ''
    }
  },
  mounted() {
    this.typeText();
  },
  methods: {
    typeText() {
      let index = 0;
      const interval = setInterval(() => {
        this.displayText += this.text[index];
        index++;
        if (index >= this.text.length) {
          clearInterval(interval);
        }
      }, this.speed);
    }
  }
};
</script>

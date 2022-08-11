<template>
<div class="CanvasBackStyle">
  <Particles id="tsparticles" :options="options" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" />
</div>
</template>
<script lang="ts" setup>
import { reactive, toRefs } from 'vue';
import { loadFull } from "tsparticles"
const particles = reactive({
  options: {
    fpsLimit: 50,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: "push",
        },
        onHover: {
          enable: true,
          mode: "grab",
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.6,
          size: 10,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: "none",
        enable: true,
        outMode: "bounce",
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 60,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        random: true,
        value: 3,
      },
    },
    detectRetina: true
  }
})
const { options } = toRefs(particles)
const particlesInit = async (engine: any) => {
  await loadFull(engine)
}
const particlesLoaded = async (container: any) => {
  // console.log('Particles container loaded', container)
}
</script>

<style scoped>
.lizi {
  width: 100%;
  height: 100%;
}

/*pc端*/
@media only screen and (min-device-width: 768px) {
  .CanvasBackStyle {
    position: fixed;
    z-index: -1;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: block;
  }
}

/*移动端*/
@media only screen and (max-device-width: 768px) {
  .CanvasBackStyle {
    display: none;
  }
}
</style>

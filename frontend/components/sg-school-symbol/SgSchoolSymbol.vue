<template>
  <img
    :height="height"
    :width="width"
    :src="src"
    :alt="school"
    :title="school"
  />
</template>

<script>
export default {
  name: 'sg-school-symbol',
  props: {
    school: {
      type: String,
      default: 'No School'
    },
    width: {
      default: 'auto',
    },
    height: {
      default: 'auto',
    },
  },
  computed: {
    src() {
      switch (this.school.toLowerCase()) {
        case 'abjuration':
          return '/school-symbols/abjuration.png'
          break
        case 'conjuration':
          return '/school-symbols/conjuration.png'
          break
        case 'divination':
          return '/school-symbols/divination.png'
          break
        case 'enchantment':
          return '/school-symbols/enchantment.png'
          break
        case 'evocation':
          return '/school-symbols/evocation.png'
          break
        case 'illusion':
          return '/school-symbols/illusion.png'
          break
        case 'necromancy':
          return '/school-symbols/necromancy.png'
          break
        case 'transmutation':
          return '/school-symbols/transmutation.png'
          break

        default:
          return '/school-symbols/default.png'
          break
      }
    },
  },
}
</script>

<style>
</style>
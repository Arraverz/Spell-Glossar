<template>
  <div>
    <vs-row>
      <vs-col
        v-for="spell in spells"
        :key="spell.id"
        class="w-6/12 mb-5 xl:w-4/12 xxl:w-3/12"
      >
        <sg-spell-card :spell="spell"></sg-spell-card>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
export default {
  layout: 'overview',
  // middleware: 'auth',
  meta: {},
  data() {
    return {
      spells: [
        {
          id: 1,
          name: 'Transfigure',
          range: "10'",
          school: 'Transmutation',
          castTime: '1 round',
          duration: 'Instant',
          level: {
            magicUser: 0,
            illusionist: 0,
          },
          components: null,
          category: 'Utility',
          attackSave: null,
          system: 'OSR',
          book: 'BF 0 Level Spells Supplement',
          effect: `This cantrip may change a small object (up to 27 cubic inches) into
          another shape, size, color, or texture. Radical changes (such as
          creating small living things) are not apt to last more than one turn,
          but minor changes (such as coloring a head of hair bright pink)
          maystay as long as a month. "Related" changes, such as creating a baby
          hedgehog from a pincushion) may last longer than non-related ones
          (such as changing a book sinto a lizard).`,
        },
        {
          id: 2,
          name: 'Mage Hand',
          school: 'Conjuration',
          system: 'OSR',
          level: 0,
          book: 'BF 0 Level Spells Supplement',
          effect: `A spectral hand is conjured, which may either move one pound of materials at a speed of 10 feet per round for ten rounds (at a maximum range of 40 feet), 
            or give an object a powerful push about equal to the caster's strength at a range of 10 feet.`,
        },
        {
          id: 3,
          name: 'Summon Vermin',
          system: 'OSR',
          book: 'BF 0 Level Spells Supplement',
          effect: `This cantrip summons one small, totally ordinary insect (such as a beetle, fly, or spider), 
            a small rodent (such as a field mouse), or a cloud of gnatsinto a certain area. 
            If targeted intelligently, the spell maybe able to disrupt spellcasting, 
            but will never deal anyactual damage (including poison) to the target. 
            Reversed,this cantrip becomes Exterminate, which may kill any one creature of similar size as the ones described in the spell.`,
        },
      ],
    }
  },
}
</script>

<style lang="scss">
</style>

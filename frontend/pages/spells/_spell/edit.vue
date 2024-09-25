<template>
  <div>
    <vs-card class="w-6/12 mx-auto">
      <div class="p-2">
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.name"
              class="w-full"
              label="Name"
              placeholder="Name"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.range"
              class="w-full"
              label="Range"
              placeholder="Range"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <v-select
              v-model="spell.school"
              :options="schools"
              :reduce="(school) => school.value"
              label="label"
              :clearable="false"
              taggable
              push-tags
              :create-option="
                (school) => ({ label: school, value: school.toLowerCase() })
              "
            >
              <template #header>
                <div class="v-select-header">School</div>
              </template>
            </v-select>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.castTime"
              class="w-full"
              label="Cast Time"
              placeholder="Cast Time"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.duration"
              class="w-full"
              label="Duration"
              placeholder="Duration"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.levelString"
              class="w-full"
              label="Level (class names may not contain a space, classes are sperated by a semi-colon ; )"
              placeholder="e.g. Magic-User 2; Illusionist 1"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.components"
              class="w-full"
              label="Components"
              placeholder="Components"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.category"
              class="w-full"
              label="Category"
              placeholder="e.g. Damage, Utility, etc."
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.attackSave"
              class="w-full"
              label="Attack / Save"
              placeholder="e.g. Ranged, Melee, Save vs. Spell, etc."
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.system"
              class="w-full"
              label="System"
              placeholder="e.g. OSE, 5e, etc."
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-input
              v-model="spell.book"
              class="w-full"
              label="Book"
              placeholder="Book"
            ></vs-input>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vue-editor v-model="spell.effect"></vue-editor>
          </vs-col>
        </vs-row>
        <vs-row class="mb-5" vs-type="flex" vs-justify="center">
          <vs-col>
            <vs-button @click="send">Save</vs-button>
          </vs-col>
        </vs-row>
      </div>
    </vs-card>
  </div>
</template>

<script>
export default {
  layout: 'glossar',
  data() {
    return {
      spell: {
        name: '',
        range: '',
        school: '',
        castTime: '',
        duration: '',
        levelString: '',
        components: '',
        category: '',
        attackSave: '',
        system: '',
        book: '',
        effect: '',
      },
      schools: [
        {
          label: 'Abjuration',
          value: 'abjuration',
        },
        {
          label: 'Conjuration',
          value: 'conjuration',
        },
        {
          label: 'Divination',
          value: 'divination',
        },
        {
          label: 'Enchantment',
          value: 'enchantment',
        },
        {
          label: 'Evocation',
          value: 'evocation',
        },
        {
          label: 'Illusion',
          value: 'illusion',
        },
        {
          label: 'Necromancy',
          value: 'necromancy',
        },
        {
          label: 'Transmutation',
          value: 'transmutation',
        },
      ],
    }
  },
  created() {
    this.$store.dispatch('changePageTitle', 'Edit Spell')
    this.init()
  },
  methods: {
    init() {
      this.$axios
        .get(process.env.API + '/spells/get?id=' + this.$route.params.spell)
        .then((res) => {
          this.spell = res.data
          this.spell.levelString = this.getLevelString(this.spell.level)
        })
    },
    getLevelString(levelObjet) {
      if (!levelObjet || typeof levelObjet !== 'object') return ''

      let string = ''
      for (const cClass in levelObjet) {
        if (Object.hasOwnProperty.call(levelObjet, cClass)) {
          const classLevel = levelObjet[cClass]
          if (string.length !== 0) {
            string += '; '
          }
          string += cClass + ' ' + classLevel
        }
      }
      return string
    },
    send() {
      this.$axios
        .post(process.env.API + '/spells/save', { spell: this.spell })
        .then((res) => {
          this.$router.push({
            name: 'spells-spell',
            params: { spell: res.data.id },
          })
        })
    },
  },
}
</script>

<style>
</style>
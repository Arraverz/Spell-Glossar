<template>
  <div>
    <vs-card class="w-6/12 mx-auto">
      <vs-tabs class="" alignment="fixed">
        <vs-tab label="Manual">
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
        </vs-tab>
        <vs-tab label="JSON import">
          <div class="p-2">
            <vs-row class="mb-5" >
              <vs-col vs-type="flex" vs-justify="center">
                <input
                  @change="onFileChange"
                  ref="json"
                  type="file"
                  name="file"
                  id="file"
                  accept="application/JSON"
                />
              </vs-col>
            </vs-row>
            <vs-row class="mb-5">
              <vs-col vs-type="flex" vs-justify="center">
                <vs-button @click="sendBulk">Send</vs-button>
              </vs-col>
            </vs-row>
          </div>
        </vs-tab>
      </vs-tabs>
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
      file: null,
      jsonSpells: [],
    }
  },
  mounted() {
    this.$store.dispatch('changePageTitle', 'New Spell')
  },
  methods: {
    send() {
      this.$axios
        .post(process.env.API + '/spells/create', { spell: this.spell })
        .then((res) => {
          this.$vs.notify({
            title: 'Spell created',
            text: 'Spell created successfuly.',
            color: 'success',
          })
          this.$router.push('/')
        })
    },
    sendBulk() {
      if(!this.file) {
        return this.$vs.notify({
          title: 'Error',
          text: 'No file selected',
          color: 'danger',
        })
      }
      if (this.jsonSpells.length === 0) {
        return this.$vs.notify({
          title: 'Error',
          text: 'No spells detected in selected file',
          color: 'danger',
        })
      }
      this.$axios
        .post(process.env.API + '/spells/create/bulk', { spells: this.jsonSpells })
        .then((res) => {
          this.$vs.notify({
            title: 'Spells created',
            text: 'Spells created successfuly.',
            color: 'success',
          })
          this.$router.push('/')
        })
    },
    async onFileChange(e) {
      this.file = e.target.files[0]
      if (this.file instanceof File) {
        const text = await this.file.text()
        try {
          var spells = JSON.parse(text)
          console.log({ spells })
          this.jsonSpells = spells
        } catch (error) {
          console.log(error)
        }
      } else {
        this.jsonSpells = []
      }
    },
  },
}
</script>

<style>
</style>
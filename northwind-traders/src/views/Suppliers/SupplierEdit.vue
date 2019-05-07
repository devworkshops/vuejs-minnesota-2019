<template>
  <div>
    <h1>{{ id ? `Supplier #${id}` : 'New Supplier' }}</h1>
    <form class="form">
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input
          class="form-control"
          id="companyNameField"
          type="text"
          v-model="model.companyName"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input
          class="form-control"
          id="contactNameField"
          type="text"
          v-model="model.contactName"
        />
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input
          class="form-control"
          id="contactTitleField"
          type="text"
          v-model="model.contactTitle"
        />
      </div>
    </form>
    <p>
      <button class="btn btn-primary" id="saveButton" @click.prevent="save">
        Save
      </button>
      <router-link class="btn" to="/suppliers">Cancel</router-link>
    </p>
  </div>
</template>

<script>
import { SuppliersService } from '@/services/NorthwindService.js'

export default {
  props: {
    id: String,
    supplier: Object
  },
  data() {
    return {
      model: {}
    }
  },
  created() {
    if (this.id == '0') {
      this.model = {
        id: 0,
        companyName: undefined,
        contactName: undefined,
        contactTitle: undefined,
        address: {
          street: undefined,
          city: undefined,
          region: undefined,
          postalCode: undefined,
          country: undefined,
          phone: undefined
        }
      }
    } else {
      if (!this.supplier) {
        SuppliersService.get(this.id)
          .then(r => (this.model = r.data))
          .catch(err => console.error(err))
      } else {
        this.model = this.supplier || {}
      }
    }
  },
  methods: {
    save() {
      if (this.id == '0') {
        console.log(this.model)
        SuppliersService.create(this.model)
          .then(() => this.$router.push('/suppliers'))
          .catch(err => console.error(err))
      } else {
        SuppliersService.update(this.model)
          .then(() => this.$router.push('/suppliers'))
          .catch(err => console.error(err))
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

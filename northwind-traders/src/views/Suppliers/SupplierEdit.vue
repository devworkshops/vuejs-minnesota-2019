<template>
  <div>
    <h1>{{ id ? `Supplier #${id}` : 'New Supplier' }}</h1>
    <form class="form">
      <div class="form-group">
        <label class="col-form-label">Company Name</label>
        <input
          type="text"
          class="form-control"
          id="companyNameField"
          v-model="model.companyName"
          :class="{ 'is-invalid': errors && errors.companyName }"
        >
        <div class="invalid-feedback" v-if="errors && errors.companyName">{{ errors.companyName }}</div>
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" id="contactNameField" type="text" v-model="model.contactName">
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" id="contactTitleField" type="text" v-model="model.contactTitle">
      </div>
    </form>
    <p>
      <button class="btn btn-primary" id="saveButton" @click.prevent="save">Save</button>
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
      model: {},
      errors: {}
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
          .then(() => this.navigateBack())
          .catch(err => {
            if (err.response.status == 422) {
              this.errors = err.response.data.errors
            }
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>

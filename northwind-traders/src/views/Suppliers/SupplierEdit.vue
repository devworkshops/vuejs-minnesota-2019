<template>
  <div>
    <h1>{{ id ? `Supplier #${id}` : 'New Supplier' }}</h1>
    <form class="form">
      <div class="form-group">
        <label class="form-label">Company Name</label>
        <input class="form-control" type="text" v-model="model.companyName" />
      </div>
      <div class="form-group">
        <label class="form-label">Contact Name</label>
        <input class="form-control" type="text" v-model="model.contactName" />
      </div>
      <div class="form-group">
        <label class="form-label">Contact Title</label>
        <input class="form-control" type="text" v-model="model.contactTitle" />
      </div>
    </form>
    <p>
      <button class="btn btn-primary" @click.prevent="save">Save</button>
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
      model: Object
    }
  },
  created() {
    if (!this.supplier) {
      SuppliersService.get(this.id)
        .then(r => (this.model = r.data))
        .catch(err => console.error(err))
    } else {
      this.model = this.supplier || {}
    }
  },
  methods: {
    save() {
      SuppliersService.update(this.model)
        .then(() => this.$router.push('/suppliers'))
        .catch(err => console.error(err))
    }
  }
}
</script>

<style lang="scss" scoped></style>

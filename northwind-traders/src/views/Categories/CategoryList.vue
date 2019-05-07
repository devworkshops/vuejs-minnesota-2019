<template>
  <div>
    <h1>Categories</h1>
    <table class="table">
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
      <template v-for="(category, index) in categories">
        <tr :key="category.id" v-if="category.id === editingCategory.id">
          <td>{{ category.id }}</td>
          <td>
            <input
              type="text"
              v-model="editingCategory.name"
              class="form-control"
            />
          </td>
          <td>
            <input
              type="text"
              v-model="editingCategory.description"
              class="form-control"
            />
          </td>
          <td>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-secondary" @click="update()">
                <vue-feather type="check"></vue-feather>
              </button>
              <button
                type="button"
                class="btn btn-warning"
                @click="cancelUpdate()"
              >
                <vue-feather type="corner-up-left"></vue-feather>
              </button>
            </div>
          </td>
        </tr>
        <tr :key="category.id" v-else>
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <div class="btn-group" role="group">
              <button
                type="button"
                class="btn btn-secondary"
                @click="edit(category, index)"
              >
                <vue-feather type="edit-2"></vue-feather>
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="remove(category.id)"
              >
                <vue-feather type="x"></vue-feather>
              </button>
            </div>
          </td>
        </tr>
      </template>
      <tr>
        <td>New</td>
        <td>
          <input
            type="text"
            v-model="addingCategory.name"
            placeholder="Name..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.name }"
          />
          <div class="invalid-feedback" v-if="errors && errors.name">
            {{ errors.name }}
          </div>
        </td>
        <td>
          <input
            type="text"
            v-model="addingCategory.description"
            placeholder="Description..."
            class="form-control"
            :class="{ 'is-invalid': errors && errors.description }"
          />
          <div class="invalid-feedback" v-if="errors && errors.description">
            {{ errors.description }}
          </div>
        </td>
        <td>
          <div class="btn-group" role="group">
            <button type="button" class="btn btn-secondary" @click="add()">
              <vue-feather type="plus"></vue-feather>
            </button>
            <button type="button" class="btn btn-warning" @click="resetAdd()">
              <vue-feather type="corner-up-left"></vue-feather>
            </button>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { CategoriesService } from '@/services/NorthwindService.js'
import VueFeather from 'vue-feather'
import { mapActions } from 'vuex'

export default {
  components: {
    VueFeather
  },
  data() {
    return {
      categories: [],
      editingCategory: {},
      editingIndex: null,
      addingCategory: {
        name: '',
        description: ''
      },
      defaultCategory: {
        name: '',
        description: ''
      },
      errors: null
    }
  },
  created() {
    this.fetchAll()
  },
  methods: {
    ...mapActions(['raiseSuccessNotification', 'raiseErrorNotification']),
    fetchAll() {
      CategoriesService.getAll()
        .then(result => (this.categories = result.data))
        .catch(() => {
          this.raiseErrorNotification(
            'A server error occurred attempting to get all categories.'
          )
        })
    },
    edit(category, index) {
      this.editingCategory = { ...category }
      this.editingIndex = index
    },
    update() {
      CategoriesService.update(this.editingCategory)
        .then(() => {
          this.raiseSuccessNotification(
            `The category '${
              this.editingCategory.name
            }' was successfully updated.`
          )

          this.categories[this.editingIndex] = this.editingCategory
          this.editingCategory = {}
        })
        .catch(() => {
          this.raiseErrorNotification(
            `A server error occurred attempting to update the category '${
              this.editingCategory.name
            }'.`
          )
        })
    },
    cancelUpdate() {
      this.editingCategory = {}
    },
    remove(id) {
      CategoriesService.delete(id)
        .then(() => {
          this.categories = this.categories.filter(c => c.id !== id)
          this.raiseSuccessNotification(
            `The category was successfully deleted.`
          )
        })
        .catch(() => {
          this.raiseErrorNotification(
            `A server error occurred attempting to delete the category.`
          )
        })
    },
    add() {
      this.validate(this.addingCategory)
      if (this.errors) {
        return
      }

      CategoriesService.create(this.addingCategory)
        .then(result => {
          this.raiseSuccessNotification(
            `The category '${
              this.addingCategory.name
            }' was successfully created.`
          )

          this.categories.push(result.data)
          this.resetAdd()
        })
        .catch(() => {
          this.raiseErrorNotification(
            `A server error occurred attempting to create the category '${
              this.addingCategory.name
            }'.`
          )
        })
    },
    resetAdd() {
      this.addingCategory = { ...this.defaultCategory }
    },
    validate(category) {
      this.errors = {}

      if (!category.name || !category.name.trim()) {
        this.errors.name = 'Name is a required field'
      }
      if (!category.description || !category.description.trim()) {
        this.errors.description = 'Description is a required field'
      }

      // If no errors added, set errors to null
      if (Object.keys(this.errors).length === 0) {
        this.errors = null
      }
    }
  }
}
</script>

<template>
  <MainLayout>
    <v-container class="p-6 min-h-screen">
      <h1 class="text-2xl font-semibold text-blue-800 mb-6">Settings</h1>
      <v-card class="pa-4">
        <v-tabs v-model="activeTab" color="blue" align-tabs="center">
          <v-tab value="profile">Profile</v-tab>
          <v-tab value="team">Team</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Profile Section -->
          <v-window-item value="profile">
            <div class="p-6">
              <h2 class="text-xl font-semibold mb-6">Personal Information</h2>
              <div class="grid grid-cols-2 gap-4">
                <v-text-field
                  v-model="profile.firstname"
                  label="First Name"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.lastname"
                  label="Last Name"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="profile.phone_number"
                  label="Phone Number"
                  variant="outlined"
                  color="blue"
                />
                <v-text-field
                  v-model="email"
                  label="Email Address"
                  variant="outlined"
                  color="blue"
                />

                <v-select
                  v-model="selectedRole"
                  :items="roles"
                  item-title="label"
                  item-value="value"
                  label="Select Role"
                  variant="outlined"
                  color="blue"
                  dense
                  return-object
                />

                <v-text-field
                  v-model="profile.password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  color="blue"
                >
                  <template #append-inner>
                    <i
                      class="fas fa-sync-alt text-blue-500 cursor-pointer"
                      @click="updatePassword"
                    ></i>
                  </template>
                </v-text-field>
              </div>
              <div class="flex justify-end mt-auto pt-6">
                <v-btn class="custom-btn text-white" @click="saveProfile">Save changes</v-btn>
              </div>
            </div>
          </v-window-item>

          <!-- Team Section -->
          <!-- Team Section -->
          <v-window-item value="team">
            <div class="p-6">
              <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold mb-4">Users</h2>
                <v-btn @click="openModal" class="mt-4 custom-btn" color="primary"
                  >Invite User</v-btn
                >
              </div>

              <div
                v-if="users.length === 0"
                class="flex flex-col items-center justify-center text-center"
              >
                <v-icon size="64" color="blue">mdi-account-multiple-outline</v-icon>
                <p class="text-gray-600 mt-4 text-lg">No users found</p>
                <p class="text-gray-500 mb-4">Start by inviting your first team member.</p>
                <v-btn color="blue" @click="openModal">Invite User</v-btn>
              </div>

              <div v-else class="overflow-x-auto bg-white shadow-md rounded-md mt-6">
                <table class="min-w-full divide-y divide-gray-200 text-sm text-left">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-gray-600 font-semibold">S/N</th>
                      <th class="px-6 py-3 text-gray-600 font-semibold">Full Name</th>
                      <th class="px-6 py-3 text-gray-600 font-semibold">Email</th>
                      <th class="px-6 py-3 text-gray-600 font-semibold">Status</th>
                      <th class="px-6 py-3 text-gray-600 font-semibold">Role</th>
                      <th class="px-6 py-3 text-gray-600 font-semibold">Created At</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 text-gray-700">
                    <tr
                      v-for="(user, index) in users"
                      :key="user.id"
                      class="hover:bg-gray-50 transition"
                    >
                      <td class="px-6 py-4">{{ index + 1 }}</td>
                      <td class="px-6 py-4 font-medium">{{ user.name }}</td>

                      <td class="px-6 py-4">{{ user.email }}</td>
                      <td class="px-6 py-4">
                        <span
                          :class="
                            user.status === 'Active'
                              ? 'text-green-600 bg-green-100 px-2 py-1 rounded-full text-xs font-semibold'
                              : 'text-red-600 bg-red-100 px-2 py-1 rounded-full text-xs font-semibold'
                          "
                        >
                          {{ user.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4">{{ user.role }}</td>
                      <td class="px-6 py-4">{{ user.creationDate }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </v-card>

      <v-dialog v-model="showModal" persistent max-width="500px" class="pa-4">
        <v-card class="bg-white rounded-lg shadow-lg max-h-[90vh] flex flex-col relative">
          <div class="flex justify-between items-center mb-4 p-4">
            <h2 class="text-lg font-bold text-blue-600 mb-4">New User</h2>
            <div @click="closeModal">
              <i class="fa-solid fa-close text-3xl text-red mr-2"></i>
            </div>
          </div>

          <!-- Scrollable Form Body -->
          <div class="px-6 overflow-y-auto flex-1">
            <form @submit.prevent="inviteUser">
              <v-text-field
                v-model="newUser.firstname"
                label="First Name"
                variant="outlined"
                color="blue"
                class="mt-4"
              />
              <v-text-field
                v-model="newUser.lastname"
                label="Last Name"
                variant="outlined"
                color="blue"
              />
              <v-text-field
                v-model="newUser.email"
                label="Email address"
                variant="outlined"
                color="blue"
              />
              <v-text-field
                v-model="newUser.phone_number"
                label="Phone number"
                variant="outlined"
                color="blue"
              />
              <v-select
                v-model="newUser.role"
                :items="roles"
                item-title="label"
                item-value="value"
                label="Select Role"
                variant="outlined"
                color="blue"
                dense
                return-object
              />
              <v-text-field
                v-model="newUser.password"
                type="password"
                label="Password"
                variant="outlined"
                color="blue"
              />

              <!-- Footer -->
              <div class="pb-6">
                <v-btn type="submit" class="w-full text-white mt-4 custom-btn"> Invite User </v-btn>
              </div>
            </form>
          </div>
        </v-card>
      </v-dialog>
    </v-container>
  </MainLayout>
</template>

<script setup>
import { ElNotification, ElLoading } from 'element-plus'
import moment from 'moment'
import MainLayout from '@/layouts/full/MainLayout.vue'
const activeTab = ref('profile')
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
const token = savedAuth?.token || authStore.token
const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
const user = savedAuth?.user

const profile = ref({
  user_id: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  email: '',
  role: '',
  password: ''
})
const users = ref([])
const email = ref('')
const selectedRole = ref(null)

const roles = ref([
  { value: 'tenant', label: 'Tenant' },
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'credit_manager', label: 'Credit Manager' },
  { value: 'loan_manager', label: 'Loan Manager' },
  { value: 'analysis_manager', label: 'Analysis Manager' },
  { value: 'observer', label: 'Observer' }
])
const getRoleLabel = (roleValue) => {
  const found = roles.value.find((r) => r.value === roleValue)
  return found ? found.label : 'N/A'
}
const isLoading = ref(true)

const getRoles = async () => {
  try {
    const response = await axios.get(
      `https://dev02201.getjupita.com/api/${tenantId.value}/get-roles`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      }
    )
    console.log('roles response:', response)
    if (response.data && response.data.data && Array.isArray(response.data.data.roles)) {
      roles.value = response.data.data.roles.map((role) => ({
        value: role.title, // You can use `role.id` as the value
        label: role.title // Use `role.title` for the label
      }))
      console.log('Mapped roles:', roles.value)
    } else {
      roles.value = []
    }
  } catch (error) {
    console.error('Error fetching roles:', error)
    roles.value = []
  }
}

const showModal = ref(false)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const newUser = ref({
  user_id: '',
  firstname: '',
  lastname: '',
  phone_number: '',
  email: '',
  password: '',
  role: ''
})

const fetchTeam = async () => {
  const savedAuth = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : null

  console.log(JSON.parse(localStorage.getItem('data')))
  const token = savedAuth ? savedAuth?.token : computed(() => authStore.token)?.value
  const tenantId = savedAuth
    ? savedAuth?.user?.tenant_id
    : computed(() => authStore.tenant_id)?.value
  const API_URL = `https://dev02201.getjupita.com/api/${tenantId}/get-team`

  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    console.log('fetch team data:', response)
    const members = response.data.data.members

    // Normalize the members
    const normalized = members.map((m) => {
      const user = m.me ?? m
      const rawRole = user.role?.title || m.role?.title

      return {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email: user.email,
        phone: user.phone_number || 'N/A',
        status: user.active === 1 ? 'Active' : 'Inactive',
        creationDate: moment(user.created_at).format('MMMM Do YYYY, h:mm a'),
        role: getRoleLabel(rawRole)
      }
    })

    users.value = normalized
  } catch (error) {
    console.error('Error fetching team data:', error)
  } finally {
  }
}

const inviteUser = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id

  closeModal()
  ElNotification({
    title: 'Downloading',
    message: 'Inviting your new user...',
    type: 'info',
    duration: 3000
  })

  try {
    const payload = {
      firstname: newUser.value.firstname,
      lastname: newUser.value.lastname,
      email: newUser.value.email,
      phone_number: newUser.value.phone_number,
      password: newUser.value.password,
      roles: newUser.value.role.value
    }

    console.log('invite user request payload:', payload)

    const response = await axios.post(
      `https://dev02201.getjupita.com/api/${tenantId}/add-member`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(response)

    ElNotification({
      title: 'Success',
      message: 'User was successfully invited.',
      type: 'success',
      duration: 10000
    })

    // Reset form fields after success
    newUser.value.firstname = ''
    newUser.value.lastname = ''
    newUser.value.email = ''
    newUser.value.phone_number = ''
    newUser.value.password = ''
    newUser.value.role = ''

    closeModal()
  } catch (err) {
    console.error('Invite failed:', err)

    ElNotification({
      title: 'Invitation Failed',
      message: err.response?.data?.message || 'There was a problem inviting the user.',
      type: 'error',
      duration: 5000
    })
  } finally {
    closeModal()
  }
}

const updatePassword = async () => {
  const savedAuth = JSON.parse(localStorage.getItem('data') || '{}')
  const token = savedAuth?.token || authStore.token
  const tenantId = savedAuth?.user?.tenant_id || authStore.tenant_id
  if (!profile.value.password) return

  ElNotification({
    title: 'Updating',
    message: 'Updating password...',
    type: 'info',
    duration: 3000
  })

  try {
    console.log('new password:', profile.value.password)
    const response = await axios.put(
      `https://dev02201.getjupita.com/api/${tenantId}/update-password`,
      { new_password: profile.value.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    console.log('Password update success:', response.data)
    ElNotification({
      title: 'Success',
      message: 'Password successfully updated.',
      type: 'success',
      duration: 3000
    })
  } catch (error) {
    console.error('Error updating password:', error)
    ElNotification({
      title: 'Password update failed',
      message: error.response?.data?.message || 'There was a problem updating the password.',
      type: 'error',
      duration: 5000
    })
  }
}

const api = ref({
  clientId: 'jupita-sofimfb-api',
  secretKey: '**********'
})

const saveProfile = async () => {
  ElNotification({
    title: 'Updating',
    message: 'Updating profile...',
    type: 'info',
    duration: 3000
  });

  try {
    // 1. If there is valid profile info, update profile
    if (profile.value.firstname || profile.value.lastname || profile.value.email ) {
      const payload = {
        user_id: profile.value.user_id,
        firstname: profile.value.firstname,
        lastname: profile.value.lastname,
        email: profile.value.email,
        phone_number: profile.value.phone_number
      };
      
      console.log('payload save profile:', payload);

      const response = await axios.put(
        `https://dev02201.getjupita.com/api/${tenantId}/update-user-data`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Profile update Response:', response.data);
    }

    // 2. If there is a password, update password
    if (profile.value.password) {
      await updatePassword();
    }

    ElNotification({
      title: 'Updated',
      message: 'Profile uploaded successfully!',
      type: 'success',
      duration: 3000
    });

  } catch (err) {
    console.error('Update failed:', err);
    ElNotification({
      title: 'Profile update failed',
      message: err.response?.data?.message || 'There was a problem updating the profile.',
      type: 'error',
      duration: 5000
    });
  }
};


const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  alert('Copied to clipboard!')
}

onMounted(() => {
  getRoleLabel()
  fetchTeam()
  console.log('User data from storage:', user)
  if (user) {
    profile.value = {
      user_id: user.id || '',
      firstname: user.firstname || '',
      lastname: user.lastname || '',
      phone_number: user.phone_number || '',
      email: user.email || '',
      role: ''
    }
    email.value = user.email || ''
  }
})
</script>

<style scoped>
.custom-btn {
  background-color: #1f5aa3;
  text-transform: none !important;
}
.v-card {
  border-radius: 12px;
}
.v-tab {
  text-transform: none !important;
}
</style>

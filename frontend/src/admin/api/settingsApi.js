import { apiPut } from './client'
  export const settingsApi = {
    changePassword: (currentPassword, newPassword) =>
      apiPut('/admin/auth/change-password', { currentPassword, newPassword }),
  }
  
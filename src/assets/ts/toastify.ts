import Vue3Toasity, { toast, type ToastContainerOptions } from 'vue3-toastify'
import '@/assets/css/toastify.css'
export default {
  install(app: any) {
    app.use(
      Vue3Toasity,
      {
        autoClose: 10000,
        position: toast.POSITION.TOP_CENTER,
        dangerouslyHTMLString: true,
        limit: 1, // 确保设置为1
        hideProgressBar: true,
        closeButton: false,
        pauseOnHover: false,
        pauseOnFocusLoss: false, 
      } as ToastContainerOptions
    )
  }
}
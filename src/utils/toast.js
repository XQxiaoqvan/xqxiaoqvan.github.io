export function showToast(message, options = {}) {
  const toastContainer = document.getElementById('custom-toast-container') || createToastContainer()
  const toast = document.createElement('div')
  toast.className = 'custom-toast'
  toast.innerHTML = `
    <div style="display: flex; align-items: center;">
      <i class="fa-solid fa-circle-exclamation" style="font-size: 20px;"></i>
      <span style="margin-left: 10px;">${message}</span>
    </div>
  `

  toastContainer.appendChild(toast)

  setTimeout(() => {
    toast.classList.add('fade-out')
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast)
      }
    }, 300)
  }, options.duration || 1000)
}

function createToastContainer() {
  const container = document.createElement('div')
  container.id = 'custom-toast-container'
  document.body.appendChild(container)
  return container
}

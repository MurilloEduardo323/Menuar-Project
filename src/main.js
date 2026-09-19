
import './style.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="menu-page">
    <header class="menu-header">
      <span class="menu-logo">MenuAR</span>
      <h1>Hambúrguer artesanal</h1>
      <p>Veja o nosso hambúrguer em 3D</p>
    </header>

    <section class="product-card">
      <model-viewer
  id="burgerModel"
  class="product-viewer"
  src="https://favlbdmmpyeubdfdjrpk.supabase.co/storage/v1/object/public/ar-models/hamburger.glb"
  ios-src="https://favlbdmmpyeubdfdjrpk.supabase.co/storage/v1/object/public/ar-models/Hamburger.usdz"
  alt="Modelo 3D de um hambúrguer"
  camera-controls
  touch-action="pan-y"
  shadow-intensity="1"
  exposure="1"
  environment-image="neutral"
  camera-orbit="0deg 75deg 105%"
  interaction-prompt="auto"
  loading="eager"
  ar
  ar-modes="scene-viewer webxr quick-look"
  ar-scale="fixed"
  ar-placement="floor"
>
</model-viewer>

      <div class="product-info">
        <h2>X-Bacon</h2>

        <p class="product-description">
          Hambúrguer artesanal com carne, queijo, bacon e ingredientes
          selecionados.
        </p>

        <div class="product-bottom">
          <span class="product-price">R$ 32,90</span>
        </div>
      </div>
    </section>

    <div class="actions">
      <button
        id="cameraButton"
        class="action-button button-primary"
        type="button"
      >
        📷 Abrir câmera
      </button>

      <button
        id="resetModelButton"
        class="action-button button-secondary"
        type="button"
      >
        ↻ Reposicionar modelo
      </button>
    </div>
  </main>

  <section
    id="cameraPanel"
    class="camera-panel"
    hidden
    aria-label="Câmera do celular"
  >
    <header class="camera-header">
      <h2>Visualização da câmera</h2>

      <button
        id="closeCameraButton"
        class="close-camera"
        type="button"
        aria-label="Fechar câmera"
      >
        ×
      </button>
    </header>

    <div class="camera-content">
      <video
        id="cameraVideo"
        class="camera-video"
        autoplay
        playsinline
        muted
      ></video>

      <p id="cameraMessage" class="camera-message">
        Aponte a câmera para o ambiente.
      </p>
    </div>

    <footer class="camera-footer">
      <button
        id="stopCameraButton"
        class="action-button button-secondary"
        type="button"
      >
        Fechar câmera
      </button>
    </footer>
  </section>
`

const cameraButton = document.querySelector('#cameraButton')
const closeCameraButton = document.querySelector('#closeCameraButton')
const stopCameraButton = document.querySelector('#stopCameraButton')
const cameraPanel = document.querySelector('#cameraPanel')
const cameraVideo = document.querySelector('#cameraVideo')
const cameraMessage = document.querySelector('#cameraMessage')
const resetModelButton = document.querySelector('#resetModelButton')
const burgerModel = document.querySelector('#burgerModel')

let cameraStream = null

async function openCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    cameraMessage.textContent =
      'Seu navegador não permite acesso à câmera neste endereço. Use HTTPS ou localhost.'
    cameraPanel.hidden = false
    return
  }

  try {
    cameraMessage.textContent = 'Solicitando acesso à câmera...'
    cameraPanel.hidden = false

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' }
      },
      audio: false
    })

    cameraVideo.srcObject = cameraStream
    cameraMessage.textContent =
      'Câmera ativa. Esta é a visualização do ambiente.'
  } catch (error) {
    console.error('Erro ao abrir câmera:', error)

    cameraMessage.textContent =
      'Não foi possível acessar a câmera. Verifique a permissão do navegador.'
  }
}

function closeCamera() {
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop())
    cameraStream = null
  }

  cameraVideo.srcObject = null
  cameraPanel.hidden = true
}

cameraButton.addEventListener('click', openCamera)
closeCameraButton.addEventListener('click', closeCamera)
stopCameraButton.addEventListener('click', closeCamera)

resetModelButton.addEventListener('click', () => {
  burgerModel.cameraOrbit = '0deg 75deg 105%'
  burgerModel.fieldOfView = 'auto'
})
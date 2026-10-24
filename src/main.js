
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
  src="https://favlbdmmpyeubdfdjrpk.supabase.co/storage/v1/object/public/ar-models/Untitled.glb"
  ios-src="https://favlbdmmpyeubdfdjrpk.supabase.co/storage/v1/object/public/ar-models/Untitled.usdc"
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
        id="resetModelButton"
        class="action-button button-secondary"
        type="button"
      >
        ↻ Reposicionar modelo
      </button>
    </div>
  </main>
`

const resetModelButton = document.querySelector('#resetModelButton')
const burgerModel = document.querySelector('#burgerModel')

resetModelButton.addEventListener('click', () => {
  burgerModel.cameraOrbit = '0deg 75deg 105%'
  burgerModel.fieldOfView = 'auto'
})

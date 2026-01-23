let qr = null
let canvas = null
let avatarImageData = null
let currentMode = "emoji"

const STORAGE_KEY = "qrAppState"

const textInput = document.getElementById("textInput")
const usernameInput = document.getElementById("usernameInput")

const emojiInput = document.getElementById("emojiInput")
const displayUsername = document.getElementById("displayUsername")

const avatarIcon = document.getElementById("avatarIcon")
const bgLayer = document.getElementById("bgLayer")

const downloadBtn = document.getElementById("downloadBtn")
const bgOptions = document.querySelectorAll(".bg-option")

const avatarImageInput = document.getElementById("avatarImage")
const fileLabel = document.getElementById("fileLabel")

const emojiModeBtn = document.getElementById("emojiModeBtn")
const imageModeBtn = document.getElementById("imageModeBtn")

const emojiInputWrapper = document.getElementById("emojiInputWrapper")
const imageInputWrapper = document.getElementById("imageInputWrapper")

const debounce = (fn, delay = 300) => {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

const generateQr = text => {
  const qrEl = document.getElementById("qrcode")
  if (!qrEl) return

  qrEl.innerHTML = ""
  canvas = document.createElement("canvas")
  qrEl.appendChild(canvas)

  qr = new QRious({
    element: canvas,
    value: text || "https://t.me/femboyjs",
    size: 200,
    level: "H",
  })
}

const saveState = () => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      text: textInput.value,
      username: usernameInput.value,
      emoji: emojiInput.value,
      mode: currentMode,
      avatarImageData,
      bgClass: bgLayer.className,
    })
  )
}

const loadState = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return

  const state = JSON.parse(raw)

  if (state.text) {
    textInput.value = state.text
    generateQr(state.text)
  } else {
    generateQr()
  }

  if (state.username) {
    usernameInput.value = state.username
    displayUsername.textContent = state.username
  }

  if (state.emoji) {
    emojiInput.value = state.emoji
  }

  if (state.bgClass) {
    bgLayer.className = state.bgClass
    bgOptions.forEach(opt => opt.classList.toggle("active", state.bgClass.includes(opt.dataset.bg)))
  }

  if (state.mode === "image") {
    switchToImage()
  } else {
    switchToEmoji()
  }

  if (state.avatarImageData) {
    avatarImageData = state.avatarImageData
    avatarIcon.innerHTML = `<img src="${avatarImageData}" alt="Avatar">`
  }
}

const switchToEmoji = () => {
  currentMode = "emoji"

  emojiModeBtn.classList.add("active")
  imageModeBtn.classList.remove("active")

  emojiInputWrapper.style.display = "block"
  imageInputWrapper.style.display = "none"

  avatarIcon.innerHTML = `<div class="avatar-emoji">${emojiInput.value || "🎨"}</div>`
  saveState()
}

const switchToImage = () => {
  currentMode = "image"
  imageModeBtn.classList.add("active")

  emojiModeBtn.classList.remove("active")
  imageInputWrapper.style.display = "block"

  emojiInputWrapper.style.display = "none"
  saveState()
}

textInput.addEventListener(
  "input",
  debounce(() => {
    generateQr(textInput.value)
    saveState()
  }, 500)
)

usernameInput.addEventListener("input", e => {
  displayUsername.textContent = e.target.value || "@username"
  saveState()
})

emojiInput.addEventListener("input", e => {
  if (currentMode === "emoji") {
    avatarIcon.innerHTML = `<div class="avatar-emoji">${e.target.value || "🎨"}</div>`
  }

  saveState()
})

emojiModeBtn.addEventListener("click", switchToEmoji)
imageModeBtn.addEventListener("click", switchToImage)

avatarImageInput.addEventListener("change", e => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()

  reader.onload = ev => {
    avatarImageData = ev.target.result

    avatarIcon.innerHTML = `<img src="${avatarImageData}">`
    fileLabel.textContent = `✅ ${file.name}`

    saveState()
  }

  reader.readAsDataURL(file)
})

bgOptions.forEach(opt => {
  opt.addEventListener("click", () => {
    bgOptions.forEach(o => o.classList.remove("active"))
    opt.classList.add("active")

    bgLayer.className = `qr-background ${opt.dataset.bg}`
    saveState()
  })
})

downloadBtn.addEventListener("click", () => {
  const a = document.createElement("a")
  a.href = canvas.toDataURL("image/png")

  a.download = "qr-code.png"
  a.click()
})

loadState()

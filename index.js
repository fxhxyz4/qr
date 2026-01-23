let qr = null
let avatarImageData = null
let currentMode = "emoji"

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

const gradients = {
  "bg-1": ["#667eea", "#764ba2"],
  "bg-2": ["#89f7fe", "#66a6ff"],
  "bg-3": ["#a8edea", "#fed6e3"],
  "bg-4": ["#84fab0", "#8fd3f4"],
  "bg-5": ["#fbc2eb", "#a6c1ee"],
  "bg-6": ["#fdcbf1", "#e6dee9"],
  "bg-7": ["#f6d365", "#fda085"],
  "bg-8": ["#a1c4fd", "#c2e9fb"],
  "bg-9": ["#ff9a9e", "#fecfef"],
  "bg-10": ["#ffecd2", "#fcb69f"],
  "bg-11": ["#ff6e7f", "#bfe9ff"],
  "bg-12": ["#e0c3fc", "#8ec5fc"],
  "bg-13": ["#f093fb", "#f5576c"],
  "bg-14": ["#4facfe", "#00f2fe"],
  "bg-15": ["#43e97b", "#38f9d7"],
  "bg-16": ["#fa709a", "#fee140"],
  "bg-17": ["#30cfd0", "#330867"],
  "bg-18": ["#a8ff78", "#78ffd6"],
  "bg-19": ["#ff0844", "#ffb199"],
  "bg-20": ["#13547a", "#80d0c7"],
}

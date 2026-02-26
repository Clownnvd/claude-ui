import { Font } from "@react-pdf/renderer"

let registered = false

export function registerFonts() {
  if (registered) return
  registered = true
  // Disable hyphenation for Vietnamese text
  Font.registerHyphenationCallback((word) => [word])
}

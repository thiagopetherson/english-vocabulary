export function useSpeech() {
  const synth = window.speechSynthesis

  const speak = (text, lang = 'en-US') => {
    if (!synth) return console.error('SpeechSynthesis not supported')
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    synth.speak(utterance)
  }

  return { speak }
}

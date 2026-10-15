const STORAGE_KEY = 'preferred-voice-uri'

export function useSpeech() {
  const selectedVoiceURI = useState('selectedVoiceURI', () => '')

  const synth = typeof window !== 'undefined' ? window.speechSynthesis : null

  if (typeof window !== 'undefined' && !selectedVoiceURI.value) {
    selectedVoiceURI.value = localStorage.getItem(STORAGE_KEY) || ''
  }

  const getVoices = () => {
    if (!synth) return []
    return synth.getVoices().filter((voice) => voice.lang.startsWith('en'))
  }

  const setVoice = (voiceURI) => {
    selectedVoiceURI.value = voiceURI
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, voiceURI)
    }
  }

  const speak = (text, lang = 'en-US') => {
    if (!synth) return console.error('SpeechSynthesis not supported')
    const utterance = new SpeechSynthesisUtterance(text)

    const voices = getVoices()
    const preferredVoice = voices.find((voice) => voice.voiceURI === selectedVoiceURI.value)

    if (preferredVoice) {
      utterance.voice = preferredVoice
      utterance.lang = preferredVoice.lang
    } else {
      utterance.lang = lang
    }

    synth.speak(utterance)
  }

  return { speak, getVoices, setVoice, selectedVoiceURI }
}

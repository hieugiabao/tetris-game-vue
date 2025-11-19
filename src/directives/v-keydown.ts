import type { Directive, DirectiveBinding } from 'vue'

// Define a type for the keydown handlers
export type KeydownHandlers = Record<string, (e: KeyboardEvent) => void>

interface KeydownBinding {
  active: boolean
  handlers: KeydownHandlers
}

// Extend HTMLElement to store the handler reference
interface KeydownElement extends HTMLElement {
  _keydownHandler?: (e: KeyboardEvent) => void
}

const vKeydown: Directive<KeydownElement, KeydownBinding> = {
  mounted(el: KeydownElement, binding: DirectiveBinding<KeydownBinding>) {
    const { active, handlers } = binding.value
    if (!active) {
      return
    }

    el._keydownHandler = (e: KeyboardEvent) => {
      const fn = handlers[e.code]
      if (fn) {
        fn(e)
      }
    }

    document.addEventListener('keydown', el._keydownHandler)
  },

  unmounted(el: KeydownElement, binding: DirectiveBinding<KeydownBinding>) {
    const { active } = binding.value
    if (!active) {
      return
    }

    if (el._keydownHandler) {
      document.removeEventListener('keydown', el._keydownHandler)
      delete el._keydownHandler
    }
  },
}

export default vKeydown

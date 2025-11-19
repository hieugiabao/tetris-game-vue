import type { Directive, DirectiveBinding } from 'vue'

// Define a type for the keyup handlers
export type KeyupHandlers = Record<string, (e: KeyboardEvent) => void>

interface KeyupBinding {
  active: boolean
  handlers: KeyupHandlers
}

// Extend HTMLElement to store the handler reference
interface KeyupElement extends HTMLElement {
  _keyupHandler?: (e: KeyboardEvent) => void
}

const vKeyup: Directive<KeyupElement, KeyupBinding> = {
  mounted(el: KeyupElement, binding: DirectiveBinding<KeyupBinding>) {
    const { active, handlers } = binding.value
    if (!active) {
      return
    }

    el._keyupHandler = (e: KeyboardEvent) => {
      const fn = handlers[e.code]
      if (fn) {
        fn(e)
      }
    }

    document.addEventListener('keyup', el._keyupHandler)
  },

  unmounted(el: KeyupElement, binding: DirectiveBinding<KeyupBinding>) {
    const { active } = binding.value
    if (!active) {
      return
    }

    if (el._keyupHandler) {
      document.removeEventListener('keyup', el._keyupHandler)
      delete el._keyupHandler
    }
  },
}

export default vKeyup

import { test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import SubmitForm from '../components/SubmitForm/SubmitForm.vue'

test("Renders button in slot 'buttons'", () => {
  const button = `<button type="button">Previous</button>`
  const wrapper = shallowMount(SubmitForm, {
    slots: {
      buttons: button,
    },
  })
  expect(wrapper.html()).toContain(button)
})

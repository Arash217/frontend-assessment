import { test, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import Wizard from '../components/Wizard/Wizard.vue'

test('Renders', () => {
  const wrapper = shallowMount(Wizard)
  expect(wrapper.exists()).toBe(true)
})

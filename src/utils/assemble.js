import ElementUI from 'element-ui'

export const hyphenate = str =>
  str.replace(/[A-Z]/g, _ => '-' + _.toLowerCase())

export const assembleComponentName = module => {
  const filtersKeys = Object.keys(module).filter(key => /^[A-Z]/.test(key))
  return filtersKeys.reduce(
    (ret, key) => (ret[key] = 'el' + hyphenate(key)) && ret,
    {}
  )
}

export const ELEMENTS = {
  ...assembleComponentName(ElementUI),
  Slot: 'slot',
  HelloWorld: 'HelloWorld'
}

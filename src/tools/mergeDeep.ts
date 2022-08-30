// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObject(item : any) {
  return (item && typeof item === 'object' && !Array.isArray(item))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function mergeDeep(target:any, ...sources: any[]): any {
  if (!sources.length) return target
  const source = sources.shift()
  if (isObject(target) && isObject(source!)) {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return mergeDeep(target, ...sources)
}

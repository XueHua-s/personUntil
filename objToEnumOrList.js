export default (obj, type) => {
  if (type === 1) {
    // 枚举
    const keyValues = {}
    for (const key in obj) {
      // console.log(key)
      const value = obj[key]
      keyValues[key] = value
      keyValues[value] = key
    }
    return keyValues
  } else {
    const list = []
    for (const key in obj) {
      list.push({
        label: key,
        value: obj[key]
      })
    }
    return list
  }
}

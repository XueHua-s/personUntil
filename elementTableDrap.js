/**
 *
 * @param { Array<Number> } filters - 需要被排除的表头下标(-1表示倒数第一个)
 * @param { Element } ref - 需要操作的element表格
 * @param { Array<string> } data - 控制表头顺序的数组
 * @param { Function} callBack - 更换成功后的回调函数
 */
export const moveTableCol = (filters = [], ref, data, callBack) => {
  // console.log(value)
  // const newData = JSON.parse(JSON.stringify(data))
  const start = {
    x: null,
    y: null,
    dom: null
  }
  const end = {
    x: null,
    y: null
  }
  const priveLength = filters.filter((value) => value >= 0).length
  const header = ref.querySelector('table.el-table__header').querySelectorAll('th .cell')
  for (const colKey in header) {
    let isJmp = false
    for (const index of filters) {
      if (index >= 0) {
        if (index === parseInt(colKey)) {
          isJmp = true
        }
      } else {
        if (parseInt(colKey) === (header.length + index)) {
          isJmp = true
        }
      }
    }
    if (isJmp) {
      continue
    }
    const headerCol = header[colKey]
    if (typeof headerCol !== 'object') {
      continue
    }
    // console.log(headerCol , '123')
    headerCol.setAttribute('drapKey', parseInt(colKey) - priveLength)
    headerCol.draggable = true
    headerCol.addEventListener('dragover', (e) => {
      e.preventDefault()
      e.stopPropagation()
    }, false)
    headerCol.addEventListener('dragstart', (e) => {
      // console.log(e, 'start')
      e.stopPropagation()
      start.x = e.offsetX
      start.y = e.offsetY
      start.dom = e.target
    }, false)
    headerCol.addEventListener('drop', (e) => {
      e.stopPropagation()
      // console.log(e, 'end')
      // console.log(start.dom, 'start')
      end.x = e.offsetX
      end.y = e.offsetY
      end.dom = e.target
      const startKey = start.dom.getAttribute('drapKey')
      const startkeyValue = data[startKey]
      const endKey = end.dom.getAttribute('drapKey')
      const endkeyValue = data[endKey]
      data[startKey] = endkeyValue
      data[endKey] = startkeyValue
      if (typeof callBack === 'function') {
        callBack()
      }
      // console.log(startkeyValue, startKey)
      // console.log(endkeyValue, endKey)
    }, false)
  }
}

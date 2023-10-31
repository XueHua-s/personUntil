// 渲染树状表格下标
import lodash from 'lodash'
/**
 * 递归渲染树的索引。
 * @param {string} prevIndex - 上一个索引。
 * @param {Object} row - 当前行。
 * @param {number} deep - 树的深度。
 * @param {Object} topNode - 顶级节点。
 * @param {Object} prev - 上一个节点。
 * @returns {void}
 */
const renderTreeIndex = (prevIndex, row, deep, topNode = null, prev = null) => {
  if (row.children) {
    for (const index in row.children) {
      row.children[index].key = `${prevIndex}.${parseInt(index) + 1}`
      row.children[index].treeDeep = deep
      row.children[index].topNode = topNode || row
      row.children[index].prev = prev || row
      if (row.children[index]) {
        renderTreeIndex(row.children[index].key, row.children[index], row.children[index].treeDeep + 1, row, row.children[index])
      }
    }
  }
}

/**
 * 将给定的列表转换为树状结构，并添加关联属性。
 * @param {Array} list - 要转换的列表。
 * @param {Function} setKey - 设置键的函数，可选。
 * @returns {Array} - 转换后的新列表。
 */
export const mapTreeAddLinked = (list, setKey) => {
  const newList = lodash.cloneDeep(list)
  // eslint-disable-next-line no-unmodified-loop-condition
  for (let key = 0; typeof newList[key] !== 'undefined'; key++) {
    const item = newList[key]
    item.key = key + 1
    if (typeof setKey === 'function') {
      item.key = setKey(key)
    }
    item.treeDeep = 1
    item.topNode = null
    item.prev = null
    renderTreeIndex(item.key, item, item.treeDeep + 1)
  }
  return newList
}

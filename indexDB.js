export default function () {
  const indexDB = window.indexedDB
  let datebase = null
  /**
   *
   * @param { string } databaseName 数据库名称
   * @param { string } version 数据库版本
   * @param { string } storeName 版本更新时创建的表
   * @description 打开数据库
   */
  this.openDB = (databaseName, version = 1, storeName) => {
    return new Promise((resolve, reject) => {
      const request = indexDB.open(databaseName, version)
      request.onerror = (err) => {
        reject(err)
        throw '打开数据库报错'
      }
      request.onsuccess = ()=> {
        datebase = request.result
        resolve(request.result)
      }
      request.onupgradeneeded = (event) => {
        let db = event.target.result
        let objectStore
        if (!db.objectStoreNames.contains(storeName)) {
          objectStore = db.createObjectStore(storeName, { keyPath: 'id' }) // 创建表
          // objectStore.createIndex('name', 'name', { unique: true }) // 创建索引 可以让你搜索任意字段
        }
      }
    })
  }
  /**
   *
   * @param { string } name 表名
   * @param { string } key 主键名id值
   * @description 根据主键获取数据
   */
  this.getObj = (name, key) => {
    return new Promise((resolve, reject) => {
      const transaction = datebase.transaction([name])
      const objectStore = transaction.objectStore(name)
      const request = objectStore.get(key)
      request.onerror = function(event) {
        reject(event)
      }
      request.onsuccess = function(event) {
        resolve(request.result)
      }
    })
  }
  /**
   *
   * @param { string } name 表名
   * @param { Object } data 更新的数据
   * @description 打开数据库
   */
  this.updateObj = (name, data) => {
    return new Promise((resolve, reject) => {
      const transaction = datebase.transaction([name], 'readwrite')
      const objectStore = transaction.objectStore(name)
      const request = objectStore.put(data)
      request.onerror = function(event) {
        reject(event)
      }
      request.onsuccess = function(event) {
        resolve(request.result)
      }
    })
  }
  /**
   *
   * @param { string } name 表名
   * @param { string } key 键名
   * @description 打开数据库
   */
  this.deleteObj = (name, key) => {
    return new Promise((resolve, reject) => {
      const transaction = datebase.transaction([name], 'readwrite')
      const objectStore = transaction.objectStore(name)
      const request = objectStore.delete(key)
      request.onerror = function(event) {
        reject(event)
      }
      request.onsuccess = function(event) {
        resolve(request.result)
      }
    })
  }
  /**
   *
   * @param { string } storeName 表名
   * @param { Object } data 添加的数据
   * @description 表添加数据
   */
  this.addObj = (storeName, data) => {
    return new Promise((resolve, reject) => {
      const request = datebase.transaction([storeName], 'readwrite') // 事务对象 指定表格名称和操作模式（"只读"或"读写"）
        .objectStore(storeName) // 仓库对象
        .add(data)
      request.onsuccess = function(event) {
        // console.log('数据写入成功')
        resolve()
      }
      request.onerror = function(event) {
        // console.log('数据写入失败')
        reject(event)
        throw new Error(event.target.error)
      }
    })
  }
  /**
   * @param { string } storeName - 表名
   * @param { Object } data - 默认加入的数据
   * @description 新建表
   */
  this.createStore = (storeName, data) => {
    return new Promise((resolve, reject) => {
      if (!datebase.objectStoreNames.contains(storeName)) {
        const reuqest = datebase.createObjectStore(storeName, data)
        reuqest.onsuccess(() => {
          resolve()
        })
        reuqest.onerror((err) => {
          reject(err)
        })
      }
      reject()
    })
  }
}

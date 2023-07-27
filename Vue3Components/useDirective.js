function addThousandsSeparator(num, fixedNum) {
  if (num !== null && num !== undefined) {
    const newFixedNum = fixedNum || 2
    if (fixedNum) {
      return (parseFloat(num).toFixed(newFixedNum) + '').replace(/\d{2,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    } else {
      return (parseFloat(num).toFixed(newFixedNum) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
    }
  } else {
    return 0
  }
}
export const useInstruction = (app) => {
  // 千分符指令
  app.directive('millage', (el, binding) => {
    if (el) {
      const showValue = addThousandsSeparator(binding.value)
      if (binding.value) {
        el.innerText = showValue
      }
      if (binding.value) {
        el.value = showValue
      }
    }
  })
  // element-table折叠指令
  app.directive('elfold', (el, binding) => {
    const elBody = el.querySelector(".el-table__body>tbody")
    const elBodyC = elBody.children
    if (elBodyC.length > 3) {
      // 给表格添加只展示三行的类名
      elBody.classList.add('el-folding')
      // 判断有没有创建过面板
      const foldingLine = el.querySelector('.el-folding-line')
      if (foldingLine) {
        el.removeElement(foldingLine)
      }
      if (!foldingLine) {
        // 创建折叠面板元素
        const extendsTop = document.createElement('div')
        extendsTop.className = "flex-ct p5 el-folding-line"
        const extendsTopButton = document.createElement('i')
        extendsTopButton.className = "fa fa-angle-down el-folding-extends"
        extendsTopButton.style.fontSize = "30px"
        extendsTop.append(extendsTopButton)
        el.append(extendsTop)
        // 控制变量
        let controller = false
        extendsTop.addEventListener('click', () => {
          if (controller) {
            extendsTopButton.classList.add('rotate')
            elBody.classList.remove('el-folding')
          } else {
            extendsTopButton.classList.remove('rotate')
            elBody.classList.add('el-folding')
          }
          controller = !controller
        })
      }
    }
  })
}

window.dom = {
  create(node) {
    const continer = document.createElement("template")
    continer.innerHTML = node.trim()
    return continer.content.firstChild
  },
  after(node, node2) { // 加弟弟元素
    node.parentNode.insertBefore(node2, node.nextSibling)
  },
  before(node, node2) { // 加哥哥元素
    node.parentNode.insertBefore(node2, node)
  },
  append(parent, node) { // 加儿子元素
    parent.appendChild(node)
  },
  wrap(node, parent) { // 给元素加个爹
    dom.before(node, parent)
    dom.append(parent, node)
  },
  remove(node) { // 删除节点
    node.parentNode.removeChild(node)
    return node
  },
  empty(node) { // 删除节点的所有儿子，节点本身保留
    let array = []
    let x = node.firstChild
    while (x) {
      array.push(dom.remove(node.firstChild))
      x = node.firstChild
    }
    return array
  },
  attr(node, name, value) { // 重载
    if (arguments.length === 3) { // 传三个参数时修改元素属性值
      node.setAttribute(name, value)
    } else if (arguments.length === 2) { // 传两个参数时获取属性值
      return node.getAttribute(name)
    }
  },
  text(node, string) { // 更改文本内容
    if (arguments.length === 2) {
      if ('innerText' in node) { // 适配IE和其它浏览器
        console.log('innerText' in node);
        node.innerText = string // IE
      } else {
        node.textContent = string // Firefox / Chore
      }
    } else if (arguments.length === 1) { // 只传一个参数的话表示想要获取元素文本内容
      if ('innerText' in node) {
        return node.innerText
      } else {
        return node.textContent
      }
    }
  },
  html(node, string) { // 读写元素
    if (arguments.length === 2) {
      node.innerHTML = string

    } else if (arguments.length === 1) {
      return node.innerHTML
    }
  },
  style(node, object) {
    for (let key in object) {
      node.style[key] = object[key]
    }
  }
}
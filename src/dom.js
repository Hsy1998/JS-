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
  style(node, name, value) { // 增删改查样式
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div,'color')
        return node.style[name]
      } else if (name instanceof Object) {
        // dom.style(div,'color:red')
        for (let key in name) {
          node.style[key] = name[key]
        }
      }
    }
  },
  class: {
    add(node, className) { // 增加className
      node.classList.add(className)
    },
    remove(node, className) { // 删除className
      node.classList.remove(className)
    },
    contains(node, className) { // 判断元素是否有某个className
      return node.classList.contains(className)
    }
  }
}
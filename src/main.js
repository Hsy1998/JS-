let div1 = dom.create('<div>我是test的兄弟</div>')
let div2 = dom.create('<div><strong>我是div3的爹</strong></div>')
let div3 = dom.create('<div>我是你儿子</div>')
dom.after(test, div1)
dom.append(test, div3)
dom.wrap(div3, div2)
const node = dom.empty(div2)
console.log(node);
dom.attr(test, 'title', 'Hi,I m H')
const title = dom.attr(test, 'title')
console.log(title);
const div4 = dom.text(test, '你好，这是新的内容')
dom.text(div4)
console.log(div4);
dom.style(test, {
  border: '1px solid red'
})
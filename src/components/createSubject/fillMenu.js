// 添加填空选项
import Editor from 'wangeditor'
const {
  BtnMenu
} = Editor
class fillMenu extends BtnMenu {
  constructor (editor) {
    const $elem = Editor.$(
      `<div class="w-e-menu" data-title="填空">
            <p>[填空]</p>
        </div>`
    )
    super($elem, editor)
  }
  clickHandler () {
    this.editor.cmd.do('insertHTML', `<p>【填空】</p>`)
  }
  tryChangeActive () {
  }
}

export default fillMenu

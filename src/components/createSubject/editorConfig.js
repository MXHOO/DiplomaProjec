import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
// 编辑器配置
const editorConfig = (obj) => {
  const temp = {
    highlight: hljs
  }
  const config = {
    showFullScreen: false,
    menus: ['bold',
      'head',
      'link',
      'italic',
      'underline',
      'code'
    ],
    height: 100
  }
  Object.assign(obj, temp)
  Object.assign(obj.config, config)
}
export default editorConfig

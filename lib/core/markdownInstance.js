let MarkdownIt = require('markdown-it')
let options = {
  html: true,
  breaks: true,
  linkify: true
}

export default new MarkdownIt(options)

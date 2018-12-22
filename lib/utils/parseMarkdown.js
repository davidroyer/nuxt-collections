const path = require('path')
const fm = require('front-matter')
export function parseMarkdown (name, content) {
  return {
    name: path.basename(name, '.md'),
    matter: fm(content),
    ...fm(content)
  }
}

exports.parseMarkdown = parseMarkdown

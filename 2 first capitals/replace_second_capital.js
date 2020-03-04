var wordsWithTwoCapitalPattern = new RegExp('[\\p{Lu}\\p{Lt}]([\\p{Lu}\\p{Lt}]+)\\w*', 'gu')
// ask about check for caps

var result = {
  success: false
}

if (crowdin.contentType == 'application/vnd.crowdin.text+plural') {
  var obj = JSON.parse(crowdin.source)
  source = obj[crowdin.context.pluralForm].replace(/(?:\r\n|\r)/g, '\n')
} else {
  source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n')
}
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n')

var translationMatchArray = translation.match(wordsWithTwoCapitalPattern)

if (translationMatchArray != null) {
  result.message = 'The translate text have word(s) starting from 2 or more capitals. Words: ' + translationMatchArray
  result.fixes = []
  while ((matchInfo = wordsWithTwoCapitalPattern.exec(translation)) !== null) {
    var fix = {
      from_pos: matchInfo.index + 1,
      to_pos: matchInfo.index + matchInfo[1].length + 1,
      replacement: matchInfo[1].toLowerCase()
    }
    result.fixes.splice(0, 0, fix)
  }
} else {
  var result = {
    success: true
  }
}
return result
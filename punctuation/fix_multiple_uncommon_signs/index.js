//Config
var arrayOfPunctuation = [',','.',':',';','!','?'] // put here any punctuation signs


var duplicatedPunctuationsPattern = new RegExp('(?<!\\.)(?!\\.{3}(?!\\.))(['+arrayOfPunctuation.join('')+'])\\1+', 'gmu')

var result = {
  success: false
}

translation = crowdin.translation

var translationMatchArray = translation.match(duplicatedPunctuationsPattern)

if (translationMatchArray != null) {
  result.message = 'The translation text have punctuation without space.'
  result.fixes = []
  while ((matchInfo = duplicatedPunctuationsPattern.exec(translation))) {
    if(matchInfo[0].indexOf('.')!=-1 & matchInfo[0].length>3) {
      var fix = {
        from_pos: matchInfo.index,
        to_pos: matchInfo.index + matchInfo[0].length,
        replacement: '...'
      }
      result.fixes.splice(0, 0, fix)
    } else {
      var fix = {
        from_pos: matchInfo.index,
        to_pos: matchInfo.index + matchInfo[0].length,
        replacement: matchInfo[0][0]
      }
      result.fixes.splice(0, 0, fix)
    }
  }
} else {
  var result = {
    success: true
  }
}
return result
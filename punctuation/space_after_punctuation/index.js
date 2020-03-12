//Config
var arrayOfPunctuation = [',','.',':',';','!','?'] // put here any punctuation signs


var spaceAfterPunctuationPattern = new RegExp('(['+arrayOfPunctuation.join('')+'])(?!['+arrayOfPunctuation.join('')+'])', 'gmu')

var result = {
  success: false
}

translation = crowdin.translation

var translationMatchArray = translation.match(spaceAfterPunctuationPattern)

if (translationMatchArray != null) {
  result.message = 'The translation text have punctuation without space.'
  result.fixes = []
  while ((matchInfo = spaceAfterPunctuationPattern.exec(translation))) {
    var fix = {
      from_pos: matchInfo.index,
      to_pos: matchInfo.index + matchInfo[1].length,
      replacement: matchInfo[1]+' '
    }
    result.fixes.splice(0, 0, fix)
  }
} else {
  var result = {
    success: true
  }
}
return result
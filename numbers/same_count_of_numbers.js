var numberInWordPattern = new RegExp('(\\d{1,})', 'gmu')

var result = {
  success: false
}

if (crowdin.contentType == 'application/vnd.crowdin.text+plural') {
  var obj = JSON.parse(crowdin.source)
  if (obj[crowdin.context.pluralForm] != null) {
    source = obj[crowdin.context.pluralForm]
  } else {
    source = obj.other
  }
} else {
  source = crowdin.source
}
translation = crowdin.translation

if (source.match(numberInWordPattern) != null) {
  sourceMatchArray = source.match(numberInWordPattern).slice(0)
} else {
  sourceMatchArray = []
}

if (translation.match(numberInWordPattern) != null) {
  translationMatchArray = translation.match(numberInWordPattern).slice(0)
} else {
  translationMatchArray = []
}

sourceInsertedWordCount = sourceMatchArray !== null ? sourceMatchArray.length : 0
translationInsertedWordCount = translationMatchArray !== null ? translationMatchArray.length : 0

if (sourceInsertedWordCount != translationInsertedWordCount) {
  result.message = 'Count of numbers in translation and source are different: ' + sourceInsertedWordCount + ' in source, ' + translationInsertedWordCount + ' in translation.'
  result.fixes = []
  return result
} else {
  return result = {
    success: true
  }
}

return result
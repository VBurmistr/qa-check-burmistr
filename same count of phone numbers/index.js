var phoneNumberPattern = new RegExp('(?<=\\s|^)([+]{1,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]+)(?=\\s|$)', 'gm')

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

var sourceMatchArray = []

while (matchIterator = phoneNumberPattern.exec(source)) {
  sourceMatchArray.push(matchIterator[1])
}

var translationMatchArray = []

while (matchIterator = phoneNumberPattern.exec(translation)) {
  translationMatchArray.push(matchIterator[1])
}

sourceInsertedWordCount = sourceMatchArray !== null ? sourceMatchArray.length : 0
translationInsertedWordCount = translationMatchArray !== null ? translationMatchArray.length : 0

if (sourceInsertedWordCount != translationInsertedWordCount) {
  result.message = 'Count of phone numbers in translation and source are different: ' + sourceInsertedWordCount + ' in source, ' + translationInsertedWordCount + ' in translation.'
  result.fixes = []
  return result
} else {
  return result = {
    success: true
  }
}

return result
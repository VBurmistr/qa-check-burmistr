var phoneNumberPattern = new RegExp('(?<=\\s|^)([+]{1,1}[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.0-9]+)(?=\\s|$)', 'gm')

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

var sourceMatchArray = []

if (source.match(phoneNumberPattern) != null) {
  while (matchIterator = phoneNumberPattern.exec(source)) {
    sourceMatchArray.push(matchIterator[1])
  }
}

var translationMatchArray = []

if (translation.match(phoneNumberPattern) != null) {
  while (matchIterator = phoneNumberPattern.exec(translation)) {
    translationMatchArray.push(matchIterator[1])
  }
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
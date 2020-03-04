var numberInWordPattern = new RegExp('[\\p{L}]{1,1}(\\d{1,})[\\p{L}]{1,1}|[\\p{L}]{0,1}(\\d{1,})[\\p{L}]{1,1}|[\\p{L}]{1,1}(\\d{1,})[\\p{L}]{0,1}', 'gmu')

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

function removeElementFromArray (arrayToRemoveFrom, Element) {
  for (var i = 0; i < arrayToRemoveFrom.length; i++) {
    if (arrayToRemoveFrom[i] === Element) {
      arrayToRemoveFrom.splice(i, 1)
      break
    }
  }
  return arrayToRemoveFrom
}

function differenceBetweenTwoArrays (decreasingArray, deductionArray) {
  var tempDecreasingArray = decreasingArray.slice(0)
  var tempDeductionArray = deductionArray.slice(0)
  for (i = 0; i < tempDeductionArray.length; i++) {
    removeElementFromArray(tempDecreasingArray, tempDeductionArray[i])
  }
  return tempDecreasingArray
}

var sourceMatchArray = []

if (source.match(numberInWordPattern) != null) {
  while (matchIterator = numberInWordPattern.exec(source)) {
    for (i = 1; i < matchIterator.length; i++) {
      if (matchIterator[i] != null) {
        sourceMatchArray.push(matchIterator[i])
        break
      }
    }
  }
}

var translationMatchArray = []

if (translation.match(numberInWordPattern) != null) {
  while (matchIterator = numberInWordPattern.exec(translation)) {
    for (i = 1; i < matchIterator.length; i++) {
      if (matchIterator[i] != null) {
        translationMatchArray.push(matchIterator[i])
        break
      }
    }
  }
}

var missingNumbersSource = []

missingNumbersSource = differenceBetweenTwoArrays(sourceMatchArray, translationMatchArray)

if (missingNumbersSource.length != 0) {
  result.message = 'The translate text have some missing numbers. Missing numbers in translate: ' + missingNumbersSource
  result.fixes = []
  return result
} else {
  return result = {
    success: true
  }
}

return result
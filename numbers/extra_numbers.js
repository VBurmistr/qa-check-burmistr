var numberInWordPattern = new RegExp('[\\p{L}]{1,1}(\\d{1,})[\\p{L}]{1,1}|[\\p{L}]{0,1}(\\d{1,})[\\p{L}]{1,1}|[\\p{L}]{1,1}(\\d{1,})[\\p{L}]{0,1}', 'gu');


var result = {
    success: false
};

if (crowdin.contentType == "application/vnd.crowdin.text+plural") {
    var obj = JSON.parse(crowdin.source);
    source = obj[crowdin.context.pluralForm].replace(/(?:\r\n|\r)/g, '\n');
} else {
    source = crowdin.source.replace(/(?:\r\n|\r)/g, '\n');
}
translation = crowdin.translation.replace(/(?:\r\n|\r)/g, '\n');

function removeElementFromArray(arrayToRemoveFrom, Element) {
    for (var i = 0; i < arrayToRemoveFrom.length; i++) {
        if (arrayToRemoveFrom[i] === Element) {
            arrayToRemoveFrom.splice(i, 1);
            break;
        }
    }
    return arrayToRemoveFrom;
}

function differenceBetweenTwoArrays(decreasingArray, deductionArray) {
    var tempDecreasingArray = decreasingArray.slice(0);
    var tempDeductionArray = deductionArray.slice(0);
    for (i = 0; i < tempDeductionArray.length; i++) {
        removeElementFromArray(tempDecreasingArray, tempDeductionArray[i]);
    }
    return tempDecreasingArray;
}

var sourceMatchArray = [];

if (source.match(numberInWordPattern) != null) {
    while (matchIterator = numberInWordPattern.exec(source)) {
        for (i = 1; i < matchIterator.length; i++) {
            if (matchIterator[i] != null) {
                sourceMatchArray.push(matchIterator[i]);
                break;
            }
        }

    }
}

var translationMatchArray = [];

if (translation.match(numberInWordPattern) != null) {
    while (matchIterator = numberInWordPattern.exec(translation)) {
        for (i = 1; i < matchIterator.length; i++) {
            if (matchIterator[i] != null) {
                translationMatchArray.push(matchIterator[i]);
                break;
            }
        }

    }
}

var extraNumbersInTranslate = differenceBetweenTwoArrays(translationMatchArray, sourceMatchArray).slice(0);

if (extraNumbersInTranslate.length != 0) {
    result.message = 'The translate text have some extra numbers. Extra numbers in translate: ' + extraNumbersInTranslate;
    result.fixes = []
    while ((matchInfo = numberInWordPattern.exec(translation)) !== null) {
        var notNullGroup;

        for (i = 1; i < matchInfo.length; i++) {
            if (matchInfo[i] != null) {
                notNullGroup = matchInfo[i];
                break;
            }
        }
        
        if (extraNumbersInTranslate.indexOf(notNullGroup) != -1) {
            var fix = {
                from_pos: matchInfo.index,
                to_pos: numberInWordPattern.lastIndex,
                replacement: matchInfo[0].replace(/[0-9]/g, "")
            };
            result.fixes.splice(0, 0, fix);
            removeElementFromArray(extraNumbersInTranslate, notNullGroup);
        }
    }
    return result;
} else {

    return result = {
        success: true
    };
}

return result;
var testRow = [" "," "," ","h","e","l","l","o"," "," ","t","h","e","r","e"];
function getWords(row){
  if (!row || !Array.isArray(row) || row.length === 0){
    return [];
  } else {
   return row.join('').match(/\w+/gi) || [];
  }
}

var wordList = getWords(testRow);
var wordString = testRow.join('');

function getIndexList(wordString, wordList){
  var idxList = [];
  for (let w of wordList){
    idxList.push(wordString.indexOf(w));
  }
  if (idxList.length === 0){
    return [0];
  }
  return idxList;
}

var indexList = getIndexList(wordString, wordList);
function getSpaceList(indexList, wordList, boardLength, c){
  var spaceBetween = [indexList[0]];
    if (!Array.isArray(wordList) || !wordList || wordList == undefined ||
      !Array.isArray(indexList) || !indexList || indexList == undefined){
      return [0];
    }
  for (var i = 0, n = i; i < indexList.length; i++){
    if (i === indexList.length -1){ 
        spaceBetween.push((boardLength - indexList[i] - (wordList[i] ? wordList[i].length : 0 ) ) - c ); 
      } else {
        spaceBetween.push(indexList[i+1] - (indexList[i] + (wordList[i] ? wordList[i].length : 0 )) );
      }
    }
  return spaceBetween || [0];
}

var spaceList = getSpaceList(indexList, wordList, 15, 1);

function constructRegex(spaceList, indexList, wordList, c){
  var arrayConcat = [];
  var regexConcat = `^\\w{0,${indexList[0]-1||0}}$`;
  var startingSpaces = new RegExp(regexConcat); 
  arrayConcat.push(startingSpaces);
  regexConcat = '^';
  for (var i = 0; i < indexList.length; i++){ 
    regexConcat += wordList[i] ? `\\w{${spaceList[i]}}${wordList[i]}` : ``;
    if (i === indexList.length-1){
      var regExtra = new RegExp(regexConcat+`(\\w{0,${spaceList[spaceList.length-1]}})?$`);
      arrayConcat.push(regExtra);
      return arrayConcat || /\w{1,9}/;
    }
    var regExtra = new RegExp(regexConcat+`(\\w{0,${spaceList[i+1]-1}})?$`);
    arrayConcat.push(regExtra);
  }
}
var patterns = constructRegex(spaceList, indexList, wordList, 1);





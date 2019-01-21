/**
 * Check if two strings are rotated for each other or not.
 *
 * @param word1 <String>
 * @param word2 <String>
 *
 * @returns Boolean
 */
isRotated = function (word1, word2) {
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();

  word2 += word2;
  return word2.includes(word1);
}

/**
 * Group roteated Strings.
 *
 * @param words Array of strings
 *
 * @returns 2D array each element represent an array of grouped words.
 */
groupRotatedWords = function(words) {
  let groupedWords = [];

  for (let i= 0; i < words.length; i++) {
    const currentWord = words[i];

    if (currentWord.isGrouped) continue;

    let rotatedWords = [currentWord.text];
    for (let j = i + 1; j < words.length; j++) {
      const comparedWord = words[j];

      if (!comparedWord.isGrouped
          && isRotated(comparedWord.text, currentWord.text)) {
        rotatedWords.push(comparedWord.text);
        comparedWord.isGrouped = true;
      }
    }

    groupedWords.push(rotatedWords);
  }

  return groupedWords;
};

/**
 * Conver array of Strings to be array of Objects.
 *
 * @param words: array of strings
 *
 * @returns array of object, each object has:
 *          - text: String,  the word string itself.
 *          - isGrouped: boolean, if the word added to other group or not,
 *                       by default all of them are false.
 */
formatInput = function(words) {
  return words.map(function (word) {
    return { text: word, isGrouped: false };
  });
}

/**
 * Get User input from the script command line.
 *
 * @returns array of strings.
 */
getInput = function() {
  return process.argv.splice(2, process.argv.length);
}

start = function() {
  const input = getInput();
  const formatedInput = formatInput(input);
  return groupRotatedWords(formatedInput);
}

const res = start();
console.log(res);

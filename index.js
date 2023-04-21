const fs = require('fs');
const ethers = require('ethers');

for (let i = 0; i < 1000; i++) {
  // Read the contents of the file
  const fileContents = fs.readFileSync('bip39-wordlist.txt', 'utf8');

  // Split the contents by line breaks and count the number of lines
  const lines = fileContents.split(/\r?\n/);
  const numLines = lines.length;

  // Choose 12 random line numbers
  const randomLineNumbers = [];
  while (randomLineNumbers.length < 12) {
    const randomNumber = Math.floor(Math.random() * numLines);
    if (!randomLineNumbers.includes(randomNumber)) {
      randomLineNumbers.push(randomNumber);
    }
  }

  

  // Get the contents of the 12 random lines and validate each line
  const randomLines = [];
  for (const lineNumber of randomLineNumbers) {
    const line = lines[lineNumber];
    
      randomLines.push(line);
      //console.log(line)
    
  }

  // Write the contents of the valid lines to a new file in append mode
  if (randomLines.length > 0) {
    if (ethers.utils.isValidMnemonic(randomLines.join(' ')) ) {
        console.log(randomLines.join(' '))
        fs.appendFileSync('output.txt', randomLines.join(' ') + '\n');
    }
    
  }
}

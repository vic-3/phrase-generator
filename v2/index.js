const ethers = require('ethers');
const fs = require('fs')

//const seedPhrase = 'breeze push hockey june october wonder push embody property design goddess rough';
const walletAddress = '0x2F88297bC896bAD60876B2Ff9Acdb44567E700F9';



// Specify the BIP44 derivation path for Ethereum
const derivationPath = "m/44'/60'/0'/0/0";




for (let i = 0; i < 1000000000000000000000; i++) {
  // Read the contents of the file
  const fileContents = fs.readFileSync('../bip39-wordlist.txt', 'utf8');

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
      const seedPhrase = randomLines.join(' ')

          // Generate the HD wallet using the seed phrase and derivation path
          const hdNode = ethers.utils.HDNode.fromMnemonic(seedPhrase).derivePath(derivationPath);

          // Get the address of the HD wallet
          const hdAddress = hdNode.address;

          // Compare the address of the HD wallet with the address of your wallet
          if (hdAddress === walletAddress) {
            console.log('The seed phrase belongs to your wallet address');
            fs.appendFileSync('output.txt', randomLines.join(' ') + '\n');
            break
          } else {
            console.log(i)
            //console.log('The seed phrase does not belong to your wallet address');
          }
       // console.log(randomLines.join(' '))
        
    }
    
  }
}





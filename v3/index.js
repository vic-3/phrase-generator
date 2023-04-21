const fs = require('fs');
const ethers = require('ethers');

//const provider = ethers.getDefaultProvider('mainnet');
const provider = new ethers.providers.EtherscanProvider('mainnet', '7PBYJ8VXUQJ9AYCEHGA9BINCRF3IYN8VFZ');


async function checkBalance(mnemonic) {
  try {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    const address = wallet.address;
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  } catch (error) {
    console.log(error);
    return 0;
  }
}

async function generateMnemonic() {
  const fileContents = fs.readFileSync('../bip39-wordlist.txt', 'utf8');
  const lines = fileContents.split(/\r?\n/);
  const numLines = lines.length;

  const randomLineNumbers = [];
  while (randomLineNumbers.length < 12) {
    const randomNumber = Math.floor(Math.random() * numLines);
    if (!randomLineNumbers.includes(randomNumber)) {
      randomLineNumbers.push(randomNumber);
    }
  }

  const randomLines = [];
  for (const lineNumber of randomLineNumbers) {
    const line = lines[lineNumber];
    randomLines.push(line);
  }

  const mnemonic = randomLines.join(' ');
  if (!ethers.utils.isValidMnemonic(mnemonic)) {
   // console.log(`Invalid mnemonic: ${mnemonic}`);
    return;
  }
  else{
    const balance = await checkBalance(mnemonic);
    if (parseFloat(balance) >= 0.0056) {
      console.log(`Mnemonic: ${mnemonic}\nBalance: ${balance} ETH\n`);
      fs.appendFileSync('output.txt', `${mnemonic}\n`);
    }
  }

  
}

for (let i = 0; i < 1000; i++) {
   generateMnemonic();
}

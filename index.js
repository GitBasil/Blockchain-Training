const Transaction = require("./Transaction");
const Blockchain = require("./Blockchain");

let testBlock = new Blockchain();

const Account1 = "Account1";
const Account2 = "Account2";
const minerAddress = "Account3";

testBlock.addTransaction(new Transaction(Account1,Account2,200));
testBlock.addTransaction(new Transaction(Account2,Account1,100));

testBlock.minePendingTransations(minerAddress);

console.log(Account1 + " Balance:" +testBlock.getBalanceOfAddress(Account1));
console.log(Account2 + " Balance:" +testBlock.getBalanceOfAddress(Account2));
console.log(minerAddress + " Balance:" +testBlock.getBalanceOfAddress(minerAddress));

testBlock.minePendingTransations(minerAddress);
console.log(minerAddress + " Balance:" +testBlock.getBalanceOfAddress(minerAddress));
// testBlock.addBlock({amount : 40});
// testBlock.addBlock({amount : 30});

console.log(JSON.stringify(testBlock.chain,null,4));

// console.log("is blockchain valid ? " + testBlock.isValid());

// testBlock.chain[1].data.amount =3000;
// testBlock.chain[1].hash =testBlock.chain[1].calculateHash();

// console.log("is blockchain valid ? " + testBlock.isValid());
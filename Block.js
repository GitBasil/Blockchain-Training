const SHA256 = require('crypto-js/sha256');
const Transaction = require("./Transaction");

class Block{
    constructor(timestamp, transactions, difficulty, previousHash){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.difficulty = difficulty;
        this.nonce =0;
        this.mineBlock();
    }

    calculateHash(){
        return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString();
    }

    mineBlock(){
        console.log("Start mining...");
        this.hash = this.calculateHash();

        while(!(/^0*$/.test(this.hash.substring(0, this.difficulty)))){
            //console.log("Nonce:" + this.nonce);
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined (" + this.hash  + ") successfully\nNonce:" + this.nonce);
    }
}

module.exports = Block;
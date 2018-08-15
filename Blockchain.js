const Block = require("./Block");
const Transaction = require("./Transaction");

class Blockchain{
    constructor(){
        this.difficulty = 4;
        this.pendingTransactions = [];
        this.chain = [this.createGenisisBlock()];
        this.miningReward =12.5;
    }

    createGenisisBlock(){
        return new Block(new Date(),'Genisis Block', this.difficulty, null);
    }

    getLastetBlock(){
        return this.chain[this.chain.length -1];
    }

    // addBlock(data){
    //     const previousHash = this.getLastetBlock().hash;
    //     const newBlock = new Block(new Date(), data, this.difficulty, previousHash);
    //     this.chain.push(newBlock);
    // }

    addTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    minePendingTransations(miningRewardAddress){
        const previousHash = this.getLastetBlock().hash;
        let newBlock = new Block(new Date, this.pendingTransactions,this.difficulty, previousHash);
        this.chain.push(newBlock);

        this.pendingTransactions =[
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    getBalanceOfAddress(address){
        let balance=0;

        for(const b of this.chain){
            for(const trans of b.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }
                if(trans.toAddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isValid(){
        for(let i=1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
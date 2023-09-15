let pin = "";
let tryCount = 3;
let balance = 5000;
let hasCredit = false;
let salary = 1500;

let transactions = [];

let userPin = prompt('Enter your 4-digit PIN:');
pin = userPin;

while (true) {
    // let userPin = prompt('Enter your 4-digit PIN:');

    if (/^\d{4}$/.test(userPin)) { 
        pin = userPin;
        break;
    } else {
        alert('PIN must be 4 digits. Please try again.');
    }
}

while (tryCount > 0) {
    let loginPin = prompt('add pin for login');
    if (loginPin === pin) {
        console.log('welcome');
        withDraw();
        break;

    } else {
        tryCount--;
        console.log(`${tryCount} chance remained`);
        if (tryCount === 0) {
            console.error('Your card is blocked.Contact the bank')
        }
    }
}

function withDraw() {
    let hasShowedCredit;
    let newOffer;

    let amount = Math.abs(Number(prompt('How much cash do you want to withdraw?')));
    if (amount <= balance) {
        balance -= amount;

        let trObj = {
            amount: amount,
            date: new Date(),
            deposit: false
        }
        transactions.push(trObj)

        console.log('Your balance:', balance);
        if (balance == 0 && !hasCredit && !hasShowedCredit) { //
            hasShowedCredit = confirm('You want credit?') 

            if (hasShowedCredit) {
                let result = calculateCredit(salary);
                console.log(`Max amount:${result.maxCreditAmount},monthly payment: ${result.monthlyPayment}`);
                const hasAcceptedCredit = confirm('Do you accept the credit offer?')
                if (hasAcceptedCredit) {
                    balance += result.maxCreditAmount;
                    let trObjCredit = {
                        amount: result.maxCreditAmount,
                        date: new Date(),
                        deposit: true
                    }

                    transactions.push(trObjCredit)

                    hasCredit = true;
                    console.log('Credit added balance:', balance);
                } else {
                    newOffer = confirm('Do you want to listen to other offers?');
                   
                }
            }
        }
        if (newOffer) {
            let resultt = calculateNewOffer(salary);
            console.log(`Max amount:${resultt.maxCreditAmount},monthly payment: ${resultt.monthlyPayment}`);
            const hasAcceptedNewOffer = confirm('Do you agree offer?')
            if (hasAcceptedNewOffer) {
                balance += resultt.maxCreditAmount;
                hasCredit = true;
                console.log('Credit added balance:', balance);
            } else {
               
                    console.log("No more offers available.");
                    
                

            }
        }

    } else {
        console.info('There is not enough money in your balance')
    }

    let isCon = confirm('Your want check again?');
    if (isCon) {
        withDraw();
    }
    else {
        let operation = prompt('Check balance: B, Show transactions: T')

        switch (operation) {
            case 'B':
                console.log('Balance: ', balance);
                break;
            case 'T':
                ShowTransations();
                break;
        }

        console.log('Thank you for using our ATM.');
    }

}


function calculateCredit(salary) {
    let monthlyPayment = salary * 45 / 100;
    let maxCreditAmount = 12 * monthlyPayment;

    let result = maxCreditAmount - (maxCreditAmount * 10 / 100);
    return {
        monthlyPayment: monthlyPayment,
        maxCreditAmount: result
    };
}

function calculateNewOffer(salary) {
    let monthlyPayment = salary * 40 / 100;
    let maxCreditAmount = 18 * monthlyPayment;

    let result = maxCreditAmount - (maxCreditAmount * 8 / 100);
    return {
        monthlyPayment: monthlyPayment,
        maxCreditAmount: result
    };
}

function ShowTransations() {
    transactions.forEach(tr => {
        let date = tr.date;

        let trDate = `${date.getDate()} - ${date.getMonth()}- ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`


        document.write(`Amount:${tr.amount}, Date: ${trDate}- ${tr.deposit ? 'Medaxil' : 'Mexaric'}` + '<br/>') 

    });
}



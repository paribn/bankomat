let pin = "";
let tryCount = 3;
let balance = 5000;
let hasCredit = false;
let salary = 1500;

let userPin = prompt('add your pin');
pin = userPin;



while (tryCount > 0) {
    let loginPin = prompt('add pin for login');
    if (loginPin === pin) {
        console.log('welcome');
        withDraw();
        break;

    } else {
        tryCount--;
        console.log(`${tryCount} chance remained`);
        // console.log('please again check');
        if (tryCount === 0) {
            console.error('Your card blocked.Contact the bank')
        }
    }
}

function withDraw() {
    let hasShowedCredit;
    let amount = Number(prompt('add you want cash'))
    if (amount <= balance) {
        balance -= amount;
        console.log('Your balance:', balance);
        if (balance == 0 && !hasCredit) {
             hasShowedCredit = confirm('You want credit?')
            if (hasShowedCredit) {
                let result = calculateCredit(salary);
                console.log(`Max amount:${result.maxCreditAmount},monthly payment: ${result.monthlyPayment}`);
                const hasAcceptedCredit = confirm('Do you agree offer?')
                if (hasAcceptedCredit) {
                    balance += result.maxCreditAmount;
                    hasCredit = true;
                    console.log('credit added balance:', balance);
                } else {
                    let newOffer =confirm('Do you want to listen to other offers?'); ///yes dese elave sert yaz alerte cixardin sert ver ve yeni 8faizlik teklifi ireli sur
                    return;
                }
            }
        }
    } else {
        console.info('There is not enough money in your balance')
    }
    if (balance > 0 || hasShowedCredit) {
        let isCon = confirm('Your want check again?');
        if (isCon) {
            withDraw();
        }
        else {
            console.log('Thanks');
        }
    } else {
        console.log('bye!');
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



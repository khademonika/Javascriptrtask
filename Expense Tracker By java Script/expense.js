function togglebutton() {
    if (add.textContent == "Add new") {
        add.textContent = "Close"
    } else {
        add.textContent = "Add new"
    }
    var hide = document.getElementById("hide")
    if (hide.style.display === "none") {
        hide.style.display = "block"

    } else {
        hide.style.display = "none"
    }
}
document.getElementById("submit").onclick = function () {
    addExpense();
};

function addExpense() {
    var remark = document.getElementById('remark').value;
    var amount = document.getElementById('amount').value;
    var type = document.getElementById('type').value;
    var transactions = []
    var transactionCount = 0;
    if (remark !== '' && amount !== '') {
        transactionCount++;
        var transaction = {
            id: transactionCount,
            remark: remark,
            amount: parseFloat(amount),
            type: type
        }
    }
    document.getElementById('remark').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('type').value = 'income';
    transactions.push(transaction);
    updateHistory();
    updateSummary();
    toggleForm();
  
}
function updateHistory(){
    var history = document.getElementById("history")
    history.innerHTML = ""
    for (var i = 0; i < transactions.length; i++) {
        var row = document.createElement('tr');
        row.innerHTML = 
        `
            <td class="border p-2">${transactions[i].id}</td>
            <td class="border p-2">${transactions[i].remark}</td>
            <td class="border p-2">₹${transactions[i].amount.toFixed(2)}</td>
            <td class="border p-2">${transactions[i].type}</td>
            <td class="border p-2"><button onclick="deleteTransaction(${transactions[i].id})" class="text-red-500">Delete</button></td>
        `;
        history.appendChild(row);
    }
}
function updateSummary() {
    var totalIncome = 0;
    var totalExpenses = 0;
    for (var i = 0; i < transactions.length; i++) {
        if (transactions[i].type === 'income') {
            totalIncome += transactions[i].amount;
        } else {
            totalExpenses += transactions[i].amount;
        }
    }
}

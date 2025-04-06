
//set budget ko laagi
const totalBudget = document.getElementById('budget-amount');

const setBudgetBtn = document.getElementById('setBudget');

setBudgetBtn.addEventListener('click',()=>{
    const selectMonth = document.getElementById('month-select').value;
    console.log(selectMonth);
    const estimatedBudget = parseFloat(document.getElementById('budget').value);
    const sumMonth = document.getElementById('summary-month');
    sumMonth.textContent = `Budget Summary of ${selectMonth}`;
    totalBudget.textContent = estimatedBudget;
})


//expenses
let totalExpenseAmount = 0;
const setExpenseBtn = document.getElementById('addExpense');

setExpenseBtn.addEventListener('click',()=>{
    const expenseDate = document.getElementById('expense-date').value;
    const expenseName = document.getElementById('expense-name').value;
    const expenseBudget = parseFloat(document.getElementById('expense-budget').value);
    const totalExpense = document.getElementById('total-expenses');
    

    if(!totalBudget || !expenseDate || !expenseName || isNaN(expenseBudget)){
        alert("Please fill the empty fields!!!");
        return;
    }
    totalExpense.textContent = expenseBudget;

    //add expense ko onclick ma summary ma 
    //expense amount add hudai janchha
   totalExpenseAmount += expenseBudget;
   document.getElementById('total-expenses').textContent = totalExpenseAmount;

    
    const expenseTable = document.getElementById('expense-table-body');
    //table ma row rakhni
    const newRow = document.createElement('tr');
    
    //table ma data rakhni
    const dateCell = document.createElement('td');
    const nameCell = document.createElement('td'); 
    const  budgetCell = document.createElement('td');
    const actionCell = document.createElement('td');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');
    
    dateCell.textContent = expenseDate;
    nameCell.textContent = expenseName;
    budgetCell.textContent = expenseBudget;
    editBtn.textContent = 'Edit';
    deleteBtn.textContent = 'Delete';

    expenseTable.appendChild(newRow);
    newRow.appendChild(dateCell);
    newRow.appendChild(nameCell);
    newRow.appendChild(budgetCell);
    newRow.appendChild(actionCell);
    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);

 //field khali garni==========
    document.getElementById('expense-name').value = '';
    document.getElementById('expense-budget').value = '';
    document.getElementById('expense-date').value = '';

    //delete function ko kaam
 deleteBtn.addEventListener('click',()=>{
    totalExpenseAmount -= parseFloat(budgetCell.textContent);
    totalExpense.textContent = totalExpenseAmount;
    expenseTable.removeChild(newRow);
})

editBtn.addEventListener('click', ()=>{


})


   
    
    
})
 










//set budget ko laagi
let totalBudget = document.getElementById('budget-amount');

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
    const budgetWarning = document.getElementById('warning-message');
    

    if(!totalBudget || !expenseDate || !expenseName || isNaN(expenseBudget)){
        alert("Please fill the empty fields!!!");
        return;
    }

    totalExpense.textContent = expenseBudget;
    
    //expense ra budget equal aayo bhani more expense add garna namilni
    if((totalExpenseAmount + expenseBudget) >  expenseBudget){
        alert("No budget left for more expenses!!!");
        return;
    }
   
    //add expense ko onclick ma summary ma 
    //expense amount add hudai janchha
   totalExpenseAmount += expenseBudget;
   console.log(expenseBudget);
   

   if (totalExpenseAmount > parseFloat(totalBudget.textContent)) {
    alert("You are out of Budget!!!");
}
   
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
    totalExpenseAmount -= parseFloat(budgetCell.textContent);
    totalExpense.textContent = totalExpenseAmount;

    document.getElementById('expense-date').value = dateCell.textContent;
    document.getElementById('expense-name').value = nameCell.textContent;
    document.getElementById('expense-budget').value = budgetCell.textContent;

    expenseTable.removeChild(newRow);
})  
})
 









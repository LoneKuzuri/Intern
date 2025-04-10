//set budget ko laagi
let totalBudget = document.getElementById('budget-amount');
const remainBudget = document.getElementById('remaining-balance');
const setBudgetBtn = document.getElementById('setBudget');
const monthSelect = document.getElementById('month-select');
const expenseDateInput = document.getElementById('expense-date');
//month fix rakhna ko laagi date ni chainchha so new expenseDateInput liyeko 
//for the input field 

//each month ko starting ra ending date provide garni
const monthRanges = {
    January: { start: "01-01-2025", end: "01-31-2025" },
    February: { start: "02-01-2025", end: "02-28-2025" },
    March: { start: "03-01-2025", end: "03-31-2025" },
    April: { start: "04-01-2025", end: "04-30-2025" },
    May: { start: "05-01-2025", end: "05-31-2025" },
    June: { start: "06-01-2025", end: "06-30-2025" },
    July: { start: "07-01-2025", end: "07-31-2025" },
    August: { start: "08-01-2025", end: "08-31-2025" },
    September: { start: "09-01-2025", end: "09-30-2025" },
    October: { start: "10-01-2025", end: "10-31-2025" },
    November: { start: "11-01-2025", end: "11-30-2025" },
    December: { start: "12-01-2025", end: "12-31-2025" }
};

//budget set garchha click garda
setBudgetBtn.addEventListener('click',()=>{
    const selectMonth = document.getElementById('month-select').value;
    const estimatedBudget = parseFloat(document.getElementById('budget').value);
    const sumMonth = document.getElementById('summary-month');
   
    
    if (isNaN(estimatedBudget) || estimatedBudget <= 0) {
        alert("Please enter a valid budget!");
        return;
    } //valid Number input garna milchha
    
    sumMonth.textContent = `Budget Summary of ${selectMonth}`;
    totalBudget.textContent = estimatedBudget;
    updateRemainingBalance();
    
    localStorage.setItem('selectedMonth', selectMonth.value); // local storage ma selected month rakhchha
    updateDateRange(selectMonth.value);//each month ko range update garchha
}); 

// monthSelect.addEventListener('change', ()=>{
//  const selectedMonth = monthSelect.value;
// })

monthSelect.addEventListener('change', () => {
    const selectedMonth = monthSelect.value;
    updateDateRange(selectedMonth);
    localStorage.setItem('selectedMonth', selectedMonth.value);  // Store the new month selection
});



function updateDateRange(month){
    const range = monthRanges[month];//starting ra ending dates range ko laagi
    if(range){
        const currentYear = new Date().getFullYear();
        
        const [startMonth, startDay] = range.start.split("-");
        const [endMonth, endDay] = range.end.split("-");
        expenseDateInput.min = `${currentYear}-${startMonth}-${startDay}`;
        expenseDateInput.max = `${currentYear}-${endMonth}-${endDay}`;     
 }
}

document.addEventListener("DOMContentLoaded", function() {
    // Retrieve the selected month from localStorage or default to 'January'
    const savedMonth = localStorage.getItem('selectedMonth') || 'January';
    
    // Set the dropdown value to the saved month
    monthSelect.value = savedMonth;
    
    // Update the date range based on the saved month
    updateDateRange(savedMonth);
});


const selectedMonth = monthSelect.value || "January";
updateDateRange(selectedMonth);




//expenses handle garna ko laagi 
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

    const estimatedBudget = parseFloat(totalBudget.textContent);
    //expense ra budget equal aayo bhani more expense add garna namilni
    if((totalExpenseAmount + expenseBudget) >  parseFloat(totalBudget.textContent)){
        alert("No budget left for more expenses!!!");
        budgetWarning.innerText =`No budget left for more expenses!!!`;
        return;
    }
   
    //add expense ko onclick ma summary ma 
    //expense amount add hudai janchha
   totalExpenseAmount += expenseBudget;
   totalExpense.textContent = totalExpenseAmount;
   updateRemainingBalance();
   budgetWarning.innerText = '';


   //budegt sakinu lagda warning message pathauchha
    if ((estimatedBudget - totalExpenseAmount) < (estimatedBudget * 0.1)) {
        budgetWarning.innerText = "Warning: Low Budget!";
        budgetWarning.style.color = 'red';
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
    updateRemainingBalance();
    expenseTable.removeChild(newRow);
});

editBtn.addEventListener('click', ()=>{
    totalExpenseAmount -= parseFloat(budgetCell.textContent);
    totalExpense.textContent = totalExpenseAmount;

    document.getElementById('expense-date').value = dateCell.textContent;
    document.getElementById('expense-name').value = nameCell.textContent;
    document.getElementById('expense-budget').value = budgetCell.textContent;
    updateRemainingBalance();
    expenseTable.removeChild(newRow);
    
  });  
});

//remaining balance updates ko laagi function
 function updateRemainingBalance(){
    const estimatedBudget = parseFloat(totalBudget.textContent);
    const remaining = estimatedBudget - totalExpenseAmount;
    remainBudget.textContent = remaining;
 }









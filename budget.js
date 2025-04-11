
let totalBudget = document.getElementById('budget-amount');
const remainBudget = document.getElementById('remaining-balance');
const setBudgetBtn = document.getElementById('setBudget');
const monthSelect = document.getElementById('month-select');
const expenseDateInput = document.getElementById('expense-date');

const filtered= document.getElementById('filter-category');

const tables = document.getElementById('tables')

tables.style.display="none";

const monthRanges = {
  January: { start: "01-01", end: "01-31" },
  February: { start: "02-01", end: "02-28" },
  March: { start: "03-01", end: "03-31" },
  April: { start: "04-01", end: "04-30" },
  May: { start: "05-01", end: "05-31" },
  June: { start: "06-01", end: "06-30" },
  July: { start: "07-01", end: "07-31" },
  August: { start: "08-01", end: "08-31" },
  September: { start: "09-01", end: "09-30" },
  October: { start: "10-01", end: "10-31" },
  November: { start: "11-01", end: "11-30" },
  December: { start: "12-01", end: "12-31" }
};

let excategory = [];

setBudgetBtn.addEventListener('click', () => {
  const selectedMonth = monthSelect.value;
  const estimatedBudget = parseFloat(document.getElementById('budget').value);
  const sumMonth = document.getElementById('summary-month');

  if (isNaN(estimatedBudget) || estimatedBudget <= 0) {
    alert("Please enter a valid budget!");
    return;
  }
  if(monthSelect===''){
    alert("Plz Select Your Month")
  };

  sumMonth.textContent = `Budget Summary of ${selectedMonth}`;
  totalBudget.textContent = estimatedBudget;
  updateRemainingBalance();

  localStorage.setItem('selectedMonth', selectedMonth);
  updateDateRange(selectedMonth);
});

monthSelect.addEventListener('change', () => {
  const selectedMonth = monthSelect.value;
  updateDateRange(selectedMonth);
});

function updateDateRange(month) {
  const range = monthRanges[month];
  if (range) {
    const currentYear = new Date().getFullYear();

    const [startMonth, startDay] = range.start.split("-");
    const [endMonth, endDay] = range.end.split("-");

    expenseDateInput.min = `${currentYear}-${startMonth}-${startDay}`;
    expenseDateInput.max = `${currentYear}-${endMonth}-${endDay}`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedMonth = localStorage.getItem('selectedMonth') || "January";
  monthSelect.value = '';
  console.log(savedMonth);
  
  updateDateRange(savedMonth);
});

let totalExpenseAmount = 0;
const setExpenseBtn = document.getElementById('addExpense');

setExpenseBtn.addEventListener('click', () => {
  const expenseDate = document.getElementById('expense-date').value;
  const expenseName = document.getElementById('expense-name').value;
  const expenseBudget = parseFloat(document.getElementById('expense-budget').value);
  const totalExpense = document.getElementById('total-expenses');
  const budgetWarning = document.getElementById('warning-message');



  const budgetCategory = document.getElementById('category').value;
  tables.style.display="block";


  if (!totalBudget || !expenseDate || !expenseName || isNaN(expenseBudget)) {
    alert("Please fill the empty fields!!!");
    return;
  }

  if ((totalExpenseAmount + expenseBudget) > parseFloat(totalBudget.textContent)) {
    alert("No budget left for more expenses!!!");
    budgetWarning.innerText = `No budget left for more expenses!!!`;
    return;
  }
  totalExpenseAmount += expenseBudget;
  totalExpense.textContent = totalExpenseAmount;
  updateRemainingBalance();
  budgetWarning.innerText = '';

if(budgetCategory ===''){
    alert("Please Select Your Category");
    return;    
}
else{

  let ex= {
  expenseDate,
  expenseName,
  budgetCategory,
  expenseBudget,
}
excategory.push(ex);
displayFilter(excategory);
} 
});

function updateRemainingBalance() {
  const estimatedBudget = parseFloat(totalBudget.textContent);
  const remaining = estimatedBudget - totalExpenseAmount;
  remainBudget.textContent = remaining;
}

// Filtering Items 
filtered.addEventListener('change',(e)=>{
  let filteredItems = [];

  const item = e.target.value;
  if(item === "All"){
    filteredItems = excategory;

    displayFilter(filteredItems);
  }else{
     filteredItems = excategory.filter((ex)=>ex.budgetCategory === item);
      displayFilter(filteredItems);


  }
  if(filteredItems.length>0 ){
    tables.style.display="block"
  }else{
    tables.style.display="none"

  }
})

function displayFilter(data){
  const arrfilter = document.getElementById('expense-table-body');
arrfilter.innerHTML = '';

data.forEach(index => {
  const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index.expenseDate}</td>
      <td>${index.budgetCategory}</td>
      <td>${index.expenseName}</td>
      <td>${index.expenseBudget}</td>
      <td>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </td>`;
    arrfilter.appendChild(row);


   // Edit button functionality
   const editBtn = row.querySelector('.edit-btn');
   editBtn.addEventListener('click', () => {
     document.getElementById('expense-date').value = index.expenseDate;
     document.getElementById('expense-name').value = index.expenseName;
     document.getElementById('expense-budget').value = index.expenseBudget;
      document.getElementById('category').value=index.budgetCategory;



     excategory = excategory.filter(expense => expense !== index);  // Remove from array
     displayFilter(excategory);  // Update the table
   });

   // Delete button functionality
   const deleteBtn = row.querySelector('.delete-btn');
   deleteBtn.addEventListener('click', () => {
     excategory = excategory.filter(expense => expense !== index);  // Remove from array
     displayFilter(excategory);  // Update the table

     totalExpenseAmount -= items.expenseBudget;  // Subtract from total expense
     totalExpense.textContent = totalExpenseAmount;
     updateRemainingBalance();
   });

})
}
 

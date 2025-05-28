import React from "react";
import "../App.css";

function ExpenseList({ expenses }) {
  return (
    <div className="expense-list-container-scrollable">
      <h3>Expenses</h3>
      {expenses.length === 0 ? (
        <p className="empty-message">No expenses yet.</p>
      ) : (
        expenses.map((exp) => (
          <div key={exp.id} className="expense-card">
            ₹{exp.amount} - {exp.category} ({exp.note})
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;

import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  collection,
  onSnapshot,
  query,
  where
} from "firebase/firestore";

import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import Chart from "../components/Chart";
import FilterBar from "../components/FilterBar";

import jsPDF from "jspdf";
import "jspdf-autotable";

function Dashboard({ user, logout }) {
  const [expenses, setExpenses] = useState([]);
  
  // Filters state with category and date
  const [filters, setFilters] = useState({ category: "", date: "" });

  useEffect(() => {
    const q = query(
      collection(db, "expenses"),
      where("user", "==", user.uid)
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  // Filter expenses by category and date
 const filteredExpenses = expenses.filter((expense) => {
  const matchCategory = filters.category
    ? expense.category === filters.category
    : true;

  let matchDate = true;
  if (filters.date) {
    let expDate;

    if (expense.date instanceof Date) {
      expDate = expense.date;
    } else if (expense.date?.seconds) {
      expDate = new Date(expense.date.seconds * 1000);
    } else if (typeof expense.date === "string") {
      expDate = new Date(expense.date);
    } else {
      expDate = null;
    }

    if (expDate) {
      const formatted = expDate.toISOString().split("T")[0];
      matchDate = formatted === filters.date;
    } else {
      matchDate = false;
    }
  }

  return matchCategory && matchDate;
});


  // Export CSV function
  const exportToCSV = (expenses) => {
    if (!expenses || expenses.length === 0) {
      toast.info("No data to export!");
      return;
    }

    const csvRows = [];

    // Headers
    const headers = Object.keys(expenses[0]);
    csvRows.push(headers.join(','));

    // Data
    for (const row of expenses) {
      const values = headers.map(header => {
        const escaped = ('' + row[header]).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(','));
    }

    const csvString = csvRows.join('\n');

    // Download csv file
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'expenses.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Export PDF function
  const exportToPDF = (expenses) => {
    try {
      if (!expenses || expenses.length === 0) {
        toast.info("No data to export!");
        return;
      }

      const doc = new jsPDF();

      if (typeof doc.autoTable !== "function") {
        toast.warning("🚧 This feature is coming soon!");
        return;
      }

      doc.setFontSize(18);
      doc.text("Expenses Report", 14, 22);

      const headers = [Object.keys(expenses[0])];
      const data = expenses.map(expense => Object.values(expense));

      doc.autoTable({
        startY: 30,
        head: headers,
        body: data,
        styles: { fontSize: 10 },
        headStyles: { fillColor: [22, 160, 133] },
      });

      doc.save("expenses.pdf");
      toast.success("PDF exported successfully!");
    } catch (error) {
      console.error("PDF Export Error:", error);
      toast.error("Error exporting PDF. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      <div className="filters">
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, date: e.target.value }))
          }
        />
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Shopping">Shopping</option>
          <option value="Groceries">Groceries</option>
          <option value="Bills">Bills</option>
          <option value="Other">Other</option>
        </select>

        <div className="export-buttons">
          <button onClick={() => exportToCSV(filteredExpenses)}>Export CSV</button>
          <button onClick={() => exportToPDF(filteredExpenses)}>Export PDF</button>
        </div>
      </div>

      <FilterBar setFilter={(cat) => setFilters(prev => ({ ...prev, category: cat }))} />

      <Chart expenses={filteredExpenses} />
      <ExpenseForm user={user} />
      <ExpenseList expenses={filteredExpenses} />

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Dashboard;

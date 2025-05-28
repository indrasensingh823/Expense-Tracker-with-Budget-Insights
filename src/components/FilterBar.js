import React from "react";
import { saveAs } from "file-saver";
import "../App.css";

function FilterBar({ setFilter }) {
  const handleExport = () => {
    const csv = "data:text/csv;charset=utf-8,Category,Amount,Note\n" + 
      (window.filteredExpenses || [])
        .map((e) => `${e.category},${e.amount},${e.note}`)
        .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    saveAs(blob, "expenses.csv");
  };

  // return (
  //   <div className="filter-bar">
  //     <select onChange={(e) => setFilter(e.target.value)}>
  //       <option>All</option>
  //       <option>Food</option>
  //       <option>Transport</option>
  //       <option>Shopping</option>
  //       <option>Other</option>
  //     </select>
  //     <button onClick={handleExport}>Export CSV</button>
  //   </div>
  // );
}
export default FilterBar;
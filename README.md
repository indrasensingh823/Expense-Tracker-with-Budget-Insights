# Expense Tracker with Budget Insights

PrecisionSpend is a powerful and minimal expense tracker web application built with **React** and **Firebase**, designed to help users manage and visualize their daily spending with features like category/date filtering, real-time charts, PDF/CSV export, and dark/light mode.

![Image](https://github.com/user-attachments/assets/7bef0524-994a-45f8-99d6-e3a90ec3c990)

![Image](https://github.com/user-attachments/assets/7bd3c8ee-3e0e-4b82-866b-dddb90fdae25)

---

## 🚀 Features

- 🔐 **Authentication**: Email/Password + Google Login
- 🧾 **Expense Management**: Add, View, and Filter Expenses
- 📊 **Analytics**: Visual chart breakdown by category
- 📁 **Export**: Save reports as **CSV** and **PDF**
- 🌓 **Dark/Light Mode**: System-friendly theming with toggle
- 🔎 **Smart Filters**: By Category and Date
- 🌍 **Currency Switcher**: Supports INR, USD, EUR, and 10+ others
- ☁️ **Realtime Sync**: Data saved and synced with **Firebase Firestore**
- 🎨 **Responsive UI**: Optimized for desktop, tablet, and mobile

---

## 🛠️ Tech Stack

- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Firebase Auth + Firestore
- **Charts**: Chart.js (via `react-chartjs-2`)
- **Export**: jsPDF & AutoTable, Blob CSV export
- **Currency API**: [ExchangeRate-API](https://www.exchangerate-api.com)

---

## 🧪 Installation

```bash
git clone https://github.com/yourusername/precision-spend.git
cd precision-spend
npm install
```

---

## 🔑 Set up .env in the root directory:

```bash
REACT_APP_API_KEY=your_firebase_api_key
REACT_APP_AUTH_DOMAIN=your_auth_domain
REACT_APP_PROJECT_ID=your_project_id
REACT_APP_STORAGE_BUCKET=your_storage_bucket
REACT_APP_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_APP_ID=your_app_id
REACT_APP_EXCHANGE_API_KEY=your_exchange_rate_api_key
Then run the app:
```
---

```bash
npm start
```

---

## 📁 Folder Structure
src/
│
├── components/       # Navbar, Header, Footer, Chart, ExpenseForm, ExpenseList, FilterBar
├── pages/            # Dashboard
├── firebase.js       # Firebase config
├── App.js            # Main App file
├── App.css           # Global styling
├── theme.css         # Dark/Light mode styles
└── index.js

---

## License
This project is licensed under the MIT License.

## Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## Contact

If you have any questions, feedback, or suggestions, feel free to reach out:

- 📧 **Email:** indrasensingh770@gmail.com
- 🐙 **GitHub:** [@indrasensingh823](https://github.com/indrasensingh823)
- 🔗 **LinkedIn:** [Indrasen Singh](https://www.linkedin.com/in/indrasensingh823)




# 📂 Employee Directory Web App

[![Employee Directory]()]

A modern, responsive employee management system built with **HTML5, CSS3, and Vanilla JavaScript**. Features CRUD operations, filtering, sorting, and pagination.

## ✨ Features

- **Add/Edit/Delete** employees<br>
- **Search** by name or email<br>
- **Filter** by department/role<br>
- **Sort** by first name or department<br>
- **Pagination** support<br>
- **Responsive design** (works on mobile/tablet/desktop)<br>
- **Form validation** with error handling<br>
- **Clean UI** with modal dialogs<br>

## 🛠️ Technologies Used

![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/employee-directory.git
   cd employee-directory
   ```
2. **Open in VS Code**
   ```bash
   code .
   ```
3. **Run the app (choose one method):**

   Recommended: Use Live Server extension in VS Code

   Alternative: Open index.html directly in your browser   

## 🎨 Project Structure

employee-directory/<br>
├── index.html          # Main HTML file<br>
├── styles.css          # All CSS styles<br>
├── script.js           # JavaScript functionality<br>
└── README.md           # This documentation<br>

## 📝 Code Overview

Key JavaScript Functions
```bash
class EmployeeManager {
  constructor() {
    // Initializes employee data and UI
  }
  
  applyFilters() {
    // Handles search/filter/sort logic
  }
  
  renderEmployees() {
    // Displays employees with pagination
  }
  
  handleFormSubmit() {
    // Validates and processes add/edit forms
  }
}
```
## UI Components

========================================================
||               COMPONENT BREAKDOWN                  ||
========================================================
| Component       | Description                        |
|-----------------|------------------------------------|
| Employee Cards  | Displays employee details with     |
|                 | Edit/Delete action buttons         |
|-----------------|------------------------------------|
| Filter Panel    | Slide-out panel with filters for:  |
|                 | - First Name                       |
|                 | - Department                       |
|                 | - Role                             |
|-----------------|------------------------------------|
| Add/Edit Modal  | Form for adding new employees or   |
|                 | editing existing ones with:        |
|                 | - Input validation                 |
|                 | - Error messages                   |
|-----------------|------------------------------------|
| Pagination      | Navigation controls showing:       |
|                 | - Previous/Next buttons            |
|                 | - Page numbers                     |
|                 | - Items per page selector          |
========================================================


## 📱 Responsive Design
Fully responsive across all device sizes:

1.Desktop: 3-column grid layout<br>
2.Tablet: 2-column grid<br>
3.Mobile: Single column layout<br>

## 🤝 Contributing
Contributions are welcome! Follow these steps:

Fork the project<br>
Create your feature branch (git checkout -b feature/AmazingFeature)<br>
Commit your changes (git commit -m 'Add some amazing feature')<br>
Push to the branch (git push origin feature/AmazingFeature)<br>
Open a Pull Request<br>

## 📜 License

Distributed under the MIT License. See LICENSE for more information.# Employee-Directory-Interface

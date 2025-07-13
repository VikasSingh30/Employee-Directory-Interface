class EmployeeManager {
    constructor() {
        this.employees = this.loadMockData(); //Loads mock employee data
        this.filteredEmployees = [...this.employees]; //Creates a copy for filtering (filteredEmployees)
        this.currentPage = 1; //Sets pagination defaults
        this.itemsPerPage = 10; //(page 1, 10 items/page)
        this.currentEditId = null; //Initializes empty filters object
        this.filters = {
            search: '',
            firstName: '',
            department: '',
            role: ''
        };
        this.sortBy = '';
        this.init();
    }

    // Load mock employee data
    loadMockData() {
        return [
            { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice@example.com', department: 'HR', role: 'Manager' },
            { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', department: 'IT', role: 'Developer' },
            { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie@example.com', department: 'Finance', role: 'Analyst' },
            { id: 4, firstName: 'Diana', lastName: 'Williams', email: 'diana@example.com', department: 'Marketing', role: 'Manager' },
            { id: 5, firstName: 'Edward', lastName: 'Brown', email: 'edward@example.com', department: 'IT', role: 'Developer' },
            { id: 6, firstName: 'Fiona', lastName: 'Davis', email: 'fiona@example.com', department: 'Sales', role: 'Coordinator' },
            { id: 7, firstName: 'George', lastName: 'Miller', email: 'george@example.com', department: 'HR', role: 'Coordinator' },
            { id: 8, firstName: 'Helen', lastName: 'Wilson', email: 'helen@example.com', department: 'Finance', role: 'Analyst' },
            { id: 9, firstName: 'Ian', lastName: 'Moore', email: 'ian@example.com', department: 'IT', role: 'Developer' },
            { id: 10, firstName: 'Julia', lastName: 'Taylor', email: 'julia@example.com', department: 'Marketing', role: 'Designer' }
        ];
    }

    // Initialize the application
    init() {
        this.bindEvents();
        this.applyFilters();
    }

    // Bind event listeners
    bindEvents() {
        // Search functionality
        /* 
        - Watches the search input field
        - Updates filters on every keystroke
        - Triggers filtering
        */
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filters.search = e.target.value.toLowerCase();
            this.applyFilters();
        });

        // Sort functionality (Handles dropdown selection for sorting)
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFiltersFromPanel();
        });

        // [PAGINATION] Changes how many items show per page
        document.getElementById('showEntries').addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1;
            this.renderEmployees();
        });

        // [FORM SUBMISSION] Handles Add/Edit employee forms
        document.getElementById('employeeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // [FILTERS] Stores filter values (applied when user clicks "Apply")
        document.getElementById('filterFirstName').addEventListener('input', (e) => {
            this.filters.firstName = e.target.value.toLowerCase();
        });

        document.getElementById('filterDepartment').addEventListener('change', (e) => {
            this.filters.department = e.target.value;
        });

        document.getElementById('filterRole').addEventListener('change', (e) => {
            this.filters.role = e.target.value;
        });
    } // ... (similar for department/role filters)

    // [FILTER PANEL] Toggles the sliding filter panel visibility
    toggleFilter() {
        const panel = document.getElementById('filterPanel');
        const overlay = document.getElementById('filterOverlay');
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            overlay.classList.remove('active');
        } else {
            panel.classList.add('active');
            overlay.classList.add('active');
        }
    }

    // [MAIN FILTER LOGIC] Applies all active filters/sorting
    applyFilters() {
                /* 
        FILTER STEPS:
        1. Start with all employees
        2. Apply search filter (name/email)
        3. Apply first name filter
        4. Apply department filter
        5. Apply role filter
        6. Apply sorting if specified
        7. Update UI
        */
        this.toggleFilter(); // Close filter panel
        
        let filtered = [...this.employees];

        // Apply search filter
        if (this.filters.search) {
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(this.filters.search) ||
                emp.lastName.toLowerCase().includes(this.filters.search) ||
                emp.email.toLowerCase().includes(this.filters.search)
            );
        }

        // Search filter (checks name/email)
        if (this.filters.firstName) {
            filtered = filtered.filter(emp => 
                emp.firstName.toLowerCase().includes(this.filters.firstName)
            );
        }

        // Apply department filter
        if (this.filters.department) {
            filtered = filtered.filter(emp => emp.department === this.filters.department);
        }

        // Apply role filter
        if (this.filters.role) {
            filtered = filtered.filter(emp => emp.role === this.filters.role);
        }
        // ... (other filters)

        // Apply sorting
        if (this.sortBy) {
            filtered.sort((a, b) => {
                if (this.sortBy === 'firstName') {
                    return a.firstName.localeCompare(b.firstName);
                } else if (this.sortBy === 'department') {
                    return a.department.localeCompare(b.department);
                }
                return 0;
            });
        }

        this.filteredEmployees = filtered;
        this.currentPage = 1;
        this.renderEmployees();
    }

    // Apply filters from filter panel
    applyFiltersFromPanel() {
        this.filters.firstName = document.getElementById('filterFirstName').value.toLowerCase();
        this.filters.department = document.getElementById('filterDepartment').value;
        this.filters.role = document.getElementById('filterRole').value;
        
        this.applyFilters();
    }

    // Render employees
    renderEmployees() {
        /* 
        PAGINATION MATH:
        - Calculate start/end indexes for current page
        - Slice the employee array accordingly
        - Generate HTML cards for each employee
        */
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const pageEmployees = this.filteredEmployees.slice(start, end);

        // Generate employee cards or show "no results" message
        const grid = document.getElementById('employeeGrid');
        
        if (pageEmployees.length === 0) {
            grid.innerHTML = `
                <div class="empty-state">
                    <h3>No employees found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
        } else {
            grid.innerHTML = pageEmployees.map(emp => `
                <div class="employee-card">
                    <div class="employee-name">${emp.firstName} ${emp.lastName}</div>
                    <div class="employee-info">
                        <div><strong>Email:</strong> ${emp.email}</div>
                        <div><strong>Department:</strong> ${emp.department}</div>
                        <div><strong>Role:</strong> ${emp.role}</div>
                    </div>
                    <div class="employee-actions">
                        <button class="btn btn-small btn-secondary" onclick="employeeManager.editEmployee(${emp.id})">Edit</button>
                        <button class="btn btn-small btn-danger" onclick="employeeManager.deleteEmployee(${emp.id})">Delete</button>
                    </div>
                </div>
            `).join('');
        }

        this.renderPagination();
    }

    // Render pagination
    renderPagination() {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        const pagination = document.getElementById('pagination');

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let html = '';
        
        // Previous button
        html += `<button ${this.currentPage === 1 ? 'disabled' : ''} onclick="employeeManager.goToPage(${this.currentPage - 1})">Previous</button>`;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                html += `<button class="active">${i}</button>`;
            } else {
                html += `<button onclick="employeeManager.goToPage(${i})">${i}</button>`;
            }
        }

        // Next button
        html += `<button ${this.currentPage === totalPages ? 'disabled' : ''} onclick="employeeManager.goToPage(${this.currentPage + 1})">Next</button>`;

        pagination.innerHTML = html;
    }

    // Go to specific page
    goToPage(page) {
        const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            this.currentPage = page;
            this.renderEmployees();
        }
    }

    // Open add modal
    openAddModal() {
        this.currentEditId = null;
        document.getElementById('modalTitle').textContent = 'Add Employee';
        document.querySelector('#employeeForm button[type="submit"]').textContent = 'Add';
        this.clearForm();
        document.getElementById('employeeModal').style.display = 'block';
    }

    // Edit employee
    editEmployee(id) {
        const employee = this.employees.find(emp => emp.id === id);
        if (employee) {
            this.currentEditId = id;
            document.getElementById('modalTitle').textContent = 'Edit Employee';
            document.querySelector('#employeeForm button[type="submit"]').textContent = 'Update';
            
            // Populate form
            document.getElementById('firstName').value = employee.firstName;
            document.getElementById('lastName').value = employee.lastName;
            document.getElementById('email').value = employee.email;
            document.getElementById('department').value = employee.department;
            document.getElementById('role').value = employee.role;
            
            document.getElementById('employeeModal').style.display = 'block';
        }
    }

    // Delete employee
    deleteEmployee(id) {
        if (confirm('Are you sure you want to delete this employee?')) {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.applyFilters();
        }
    }

    // Handle form submission
    handleFormSubmit() {
        if (this.validateForm()) {
            const formData = new FormData(document.getElementById('employeeForm'));
            const employee = {
                firstName: formData.get('firstName').trim(),
                lastName: formData.get('lastName').trim(),
                email: formData.get('email').trim(),
                department: formData.get('department'),
                role: formData.get('role')
            };

            if (this.currentEditId) {
                // Update existing employee
                const index = this.employees.findIndex(emp => emp.id === this.currentEditId);
                if (index !== -1) {
                    this.employees[index] = { ...employee, id: this.currentEditId };
                }
            } else {
                // Add new employee
                const newId = Math.max(...this.employees.map(emp => emp.id)) + 1;
                this.employees.push({ ...employee, id: newId });
            }

            this.closeModal();
            this.applyFilters();
        }
    }

    // Validate form
    validateForm() {
                /* 
        VALIDATION CHECKS:
        1. All required fields filled
        2. Valid email format
        3. No duplicate emails (except when editing)
        */
        let isValid = true;
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];

        // Clear previous errors
        fields.forEach(field => {
            document.getElementById(field).classList.remove('input-error');
            document.getElementById(field + 'Error').textContent = '';
        });

        // Check required fields
        fields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                input.classList.add('input-error');
                document.getElementById(field + 'Error').textContent = 'This field is required.';
                isValid = false;
            }
        });

        // Validate email format
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() && !emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('input-error');
            document.getElementById('emailError').textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        // Check for duplicate email (excluding current employee when editing)
        if (emailInput.value.trim()) {
            const existingEmployee = this.employees.find(emp => 
                emp.email.toLowerCase() === emailInput.value.trim().toLowerCase() && 
                emp.id !== this.currentEditId
            );
            if (existingEmployee) {
                emailInput.classList.add('input-error');
                document.getElementById('emailError').textContent = 'This email is already in use.';
                isValid = false;
            }
        }

        return isValid;
    }

    // Clear form
    clearForm() {
        document.getElementById('employeeForm').reset();
        const fields = ['firstName', 'lastName', 'email', 'department', 'role'];
        fields.forEach(field => {
            document.getElementById(field).classList.remove('input-error');
            document.getElementById(field + 'Error').textContent = '';
        });
    }

    // Close modal
    closeModal() {
        document.getElementById('employeeModal').style.display = 'none';
        this.clearForm();
    }

    // Reset filters
    resetFilters() {
        this.filters = {
            search: '',
            firstName: '',
            department: '',
            role: ''
        };
        
        document.getElementById('searchInput').value = '';
        document.getElementById('filterFirstName').value = '';
        document.getElementById('filterDepartment').value = '';
        document.getElementById('filterRole').value = '';
        document.getElementById('sortBy').value = '';
        this.sortBy = '';
        this.applyFilters();
    }
}

// Initialize the EmployeeManager
// Start the application
const employeeManager = new EmployeeManager();
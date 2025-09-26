Student Registration System
A simple and responsive Student Registration System that allows users to register, view, edit, and delete student records. The application stores data persistently in the browser using localStorage.

Features
User-friendly registration form capturing Student Name, Student ID, Email, and Contact Number.

Display of student records in a responsive table on the same page.

Functionality to add new records, edit existing ones, and delete records.

Data persistence across browser sessions with localStorage.

Input validation rules:

Student Name: letters and spaces only, minimum 2 characters.

Student ID: numbers only, no duplicates allowed.

Email: valid email format.

Contact Number: numbers only, minimum 10 digits.

Responsive design optimized for mobile, tablet, and desktop screens.

Dynamic addition of a vertical scrollbar when records exceed a certain count.

File Structure
index.html - Main HTML page with the structure and form.

styles.css - CSS file implementing styling and responsive layout.

script.js - JavaScript file containing logic for adding, editing, deleting, validating, and persisting records.

README.md - Project documentation.

How to Use
Open the index.html file in any modern web browser (e.g., Chrome, Firefox).

Fill the registration form with the student's details and submit.

View student records listed below the form.

Use the Edit button next to each record to update student information.

Use the Delete button to remove a record.

Data remains saved even after refreshing or closing the browser, thanks to localStorage.

Validation Rules
Student Name: Must contain only letters and spaces with a minimum length of 2 characters.

Student ID: Must be numeric and unique.

Email: Must follow a valid email format.

Contact Number: Numeric only with at least 10 digits.

GitHub Submission Instructions
To set up the repository on your local machine:

Initialize a new Git repository:

text
git init
Add the remote origin:

text
git remote add origin https://github.com/<your-username>/<your-repo>.git
Add and commit files with descriptive commit messages:

text
git add index.html
git commit -m "Add index.html (HTML structure and content)"

git add styles.css
git commit -m "Add styles.css (styling and responsive design)"

git add script.js
git commit -m "Add script.js (add/edit/delete, validation, localStorage, scrollbar)"

git add README.md
git commit -m "Add README.md (project documentation and usage)"
Push your commits to GitHub:

text
git branch -M main
git push -u origin main
Notes
The project uses semantic HTML5 and ensures accessibility.

The code is thoroughly commented in script.js.

Tested for functional correctness and responsiveness across device sizes.
Student Registration System
A simple and responsive Student Registration System that allows users to register, view, edit, and delete student records. The application stores data persistently in the browser using localStorage.
________________________________________
Features
•	User-friendly registration form capturing Student Name, Student ID, Email, and Contact Number.
•	Display of student records in a responsive table on the same page.
•	Ability to add new records, edit existing ones, and delete records.
•	Data persistence across browser sessions using localStorage.
•	Input validations:
•	Student Name: Letters and spaces only, minimum 2 characters.
•	Student ID: Numbers only, duplicates not allowed.
•	Email: Valid email format.
•	Contact Number: Numbers only, minimum 10 digits.
•	Responsive design optimized for mobile, tablet, and desktop screens.
•	Dynamic vertical scrollbar appears when the number of records exceeds the visible area.
________________________________________
File Structure
•	index.html — Main HTML page containing the registration form and display table.
•	styles.css — CSS file for styling and responsive layout.
•	script.js — JavaScript file handling record management, validations, and data persistence.
•	README.md — Project documentation.
________________________________________
How to Use
1.	Open index.html in any modern web browser (such as Chrome or Firefox).
2.	Fill in the registration form with student details and submit.
3.	View the registered students listed in the table below the form.
4.	Use the Edit button to update student details.
5.	Use the Delete button to remove a student record.
6.	Data is saved in browser localStorage, so it remains even after refreshing or closing the browser.
________________________________________
Validation Rules
•	Student Name: Letters and spaces only, minimum 2 characters.
•	Student ID: Must be numeric and unique.
•	Email: Must follow a valid email format.
•	Contact Number: Numeric only, minimum of 10 digits.
________________________________________
GitHub Submission Instructions
To set up this project repository on your local machine:
bash
# Initialize a new Git repository
git init

# Add remote repository origin
git remote add origin https://github.com/<your-username>/<your-repo>.git

# Add files and commit with descriptive messages
git add index.html
git commit -m "Add index.html (HTML structure and content)"

git add styles.css
git commit -m "Add styles.css (styling and responsive design)"

git add script.js
git commit -m "Add script.js (CRUD operations, validation, localStorage)"

git add README.md
git commit -m "Add README.md (project documentation and usage)"

# Push commits to GitHub
git branch -M main
git push -u origin main
________________________________________
Notes
•	The project follows semantic HTML5 standards and accessible design practices.
•	The JavaScript code (script.js) includes detailed comments for clarity and maintainability.
•	Tested for functionality and responsiveness on multiple device screen sizes.


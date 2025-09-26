
;(() => {
  const form = document.getElementById("studentForm")
  const submitBtn = document.getElementById("submitBtn")
  const resetBtn = document.getElementById("resetBtn")
  const editingIdInput = document.getElementById("editingId")

  const nameInput = document.getElementById("studentName")
  const idInput = document.getElementById("studentId")
  const emailInput = document.getElementById("email")
  const contactInput = document.getElementById("contact")

  const tableWrapper = document.getElementById("tableWrapper")
  const tbody = document.getElementById("recordsBody")
  const emptyState = document.getElementById("emptyState")
  const recordCountEl = document.getElementById("recordCount")

  const YEAR = document.getElementById("year")
  if (YEAR) YEAR.textContent = String(new Date().getFullYear())

  const STORAGE_KEY = "students"

  /** Load students from localStorage */
  function loadStudents() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  /** Save students to localStorage */
  function saveStudents(students) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
  }

  /** Render the table rows and UI state */
  function renderTable() {
    const students = loadStudents()
    tbody.innerHTML = ""
    recordCountEl.textContent = String(students.length)

    if (students.length === 0) {
      emptyState.style.display = "block"
    } else {
      emptyState.style.display = "none"
    }

    students.forEach((s) => {
      const tr = document.createElement("tr")
      tr.innerHTML = `
        <td>${escapeHtml(s.name)}</td>
        <td>${escapeHtml(s.id)}</td>
        <td>${escapeHtml(s.email)}</td>
        <td>${escapeHtml(s.contact)}</td>
        <td>
          <span class="row-actions">
            <button type="button" class="btn btn-edit" data-action="edit" data-id="${s.id}">Edit</button>
            <button type="button" class="btn btn-delete" data-action="delete" data-id="${s.id}">Delete</button>
          </span>
        </td>
      `
      tbody.appendChild(tr)
    })

    // Re-bind action handlers after re-render
    tbody.querySelectorAll("button[data-action='edit']").forEach((btn) => btn.addEventListener("click", onEdit))
    tbody.querySelectorAll("button[data-action='delete']").forEach((btn) => btn.addEventListener("click", onDelete))

    updateDynamicScrollbar(students.length)
  }

  /** Prevent XSS by escaping content inserted as HTML */
  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }

  /** Validate form inputs against assignment rules */
  function validateInputs() {
    // HTML validation
    if (!nameInput.value.trim()) {
      nameInput.setCustomValidity("Student name is required.")
    } else if (!/^[A-Za-z\s]{2,}$/.test(nameInput.value.trim())) {
      nameInput.setCustomValidity("Name must contain only letters/spaces (min 2).")
    } else {
      nameInput.setCustomValidity("")
    }

    if (!idInput.value.trim()) {
      idInput.setCustomValidity("Student ID is required.")
    } else if (!/^\d+$/.test(idInput.value.trim())) {
      idInput.setCustomValidity("Student ID must contain numbers only.")
    } else {
      idInput.setCustomValidity("")
    }

    if (!emailInput.value.trim()) {
      emailInput.setCustomValidity("Email is required.")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
      emailInput.setCustomValidity("Please enter a valid email address.")
    } else {
      emailInput.setCustomValidity("")
    }

    if (!contactInput.value.trim()) {
      contactInput.setCustomValidity("Contact number is required.")
    } else if (!/^\d{10,}$/.test(contactInput.value.trim())) {
      contactInput.setCustomValidity("Contact number must be at least 10 digits.")
    } else {
      contactInput.setCustomValidity("")
    }

    // Report validity to show messages if invalid
    return form.reportValidity()
  }

  /** Strip invalid characters while typing/pasting */
  function attachInputFilters() {
    // Name: letters + spaces only
    nameInput.addEventListener("input", () => {
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, "")
    })

    // ID and Contact: digits only
    const digitOnly = (el) =>
      el.addEventListener("input", () => {
        el.value = el.value.replace(/[^\d]/g, "")
      })

    digitOnly(idInput)
    digitOnly(contactInput)
  }

  /** Add a new student (ensures ID uniqueness, no empty rows) */
  function addStudent(student) {
    const students = loadStudents()
    // Ensure no empty rows and unique ID
    const exists = students.some((s) => s.id === student.id)
    if (exists) {
      alert("A student with this ID already exists. Please use a unique Student ID.")
      return false
    }
    students.push(student)
    saveStudents(students)
    return true
  }

  /** Update an existing student by ID */
  function updateStudent(student) {
    const students = loadStudents()
    const idx = students.findIndex((s) => s.id === student.id)
    if (idx === -1) return false
    students[idx] = student
    saveStudents(students)
    return true
  }

  /** Delete a student by ID */
  function deleteStudent(id) {
    const students = loadStudents()
    const filtered = students.filter((s) => s.id !== id)
    saveStudents(filtered)
  }

  /** Handle submit: add or update based on editing state */
  function onSubmit(e) {
    e.preventDefault()
    if (!validateInputs()) return

    const student = {
      name: nameInput.value.trim(),
      id: idInput.value.trim(),
      email: emailInput.value.trim(),
      contact: contactInput.value.trim(),
    }

    const editingId = editingIdInput.value.trim()
    let ok = false

    if (editingId && editingId === student.id) {
      ok = updateStudent(student)
    } else if (editingId && editingId !== student.id) {
      // If user changes ID during edit, ensure new ID is unique
      const existing = loadStudents().some((s) => s.id === student.id)
      if (existing) {
        alert("New Student ID already exists. Please choose a unique ID.")
        ok = false
      } else {
        // Remove old record and add new with changed ID
        deleteStudent(editingId)
        ok = addStudent(student)
      }
    } else {
      ok = addStudent(student)
    }

    if (ok) {
      renderTable()
      resetFormState()
      form.reset()
      nameInput.focus()
    }
  }

  /** Populate form for editing */
  function onEdit(e) {
    const id = e.currentTarget.getAttribute("data-id")
    const students = loadStudents()
    const student = students.find((s) => s.id === id)
    if (!student) return

    // Fill form fields
    nameInput.value = student.name
    idInput.value = student.id
    emailInput.value = student.email
    contactInput.value = student.contact

    // Mark editing state
    editingIdInput.value = student.id
    submitBtn.textContent = "Update Student"
    submitBtn.classList.add("is-editing")

    // Scroll to form for clarity
    document.getElementById("register").scrollIntoView({ behavior: "smooth", block: "start" })
    nameInput.focus()
  }

  /** Delete handler */
  function onDelete(e) {
    const id = e.currentTarget.getAttribute("data-id")
    if (confirm("Delete this student record?")) {
      deleteStudent(id)
      renderTable()
      // If we were editing this ID, reset state
      if (editingIdInput.value === id) {
        resetFormState()
        form.reset()
      }
    }
  }

  /** Reset form and editing state */
  function resetFormState() {
    editingIdInput.value = ""
    submitBtn.textContent = "Add Student"
    submitBtn.classList.remove("is-editing")
    // Clear custom validity messages
    ;[nameInput, idInput, emailInput, contactInput].forEach((el) => el.setCustomValidity(""))
  }

  /** Dynamically add vertical scrollbar when many rows exist (JS requirement) */
  function updateDynamicScrollbar(count) {
    // With > 6 rows, limit visible height and enable scroll
    if (count > 6) {
      tableWrapper.style.maxHeight = "320px"
      tableWrapper.style.overflowY = "auto"
      tableWrapper.setAttribute("aria-busy", "false")
    } else {
      tableWrapper.style.maxHeight = "none"
      tableWrapper.style.overflowY = "visible"
      tableWrapper.setAttribute("aria-busy", "false")
    }
  }

  /** Bind events */
  function bindEvents() {
    form.addEventListener("submit", onSubmit)
    resetBtn.addEventListener("click", () => {
      form.reset()
      resetFormState()
      nameInput.focus()
    })

    // Live filters for input characters
    attachInputFilters()
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    bindEvents()
    renderTable()
  })
})()

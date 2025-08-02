document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")
  const authTabs = document.querySelectorAll(".auth-tab")

  // Tab switching
  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      authTabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      const targetForm = tab.getAttribute("data-tab")
      loginForm.classList.toggle("active", targetForm === "login")
      signupForm.classList.toggle("active", targetForm === "signup")
    })
  })

  // Login form submission
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const email = document.getElementById("login-email").value
    const password = document.getElementById("login-password").value

    // Here you would typically send the login data to your server
    console.log("Login attempt:", { email, password })
    alert("Login functionality would be implemented here.")
  })

  // Signup form submission
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("signup-name").value
    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value
    const confirmPassword = document.getElementById("signup-confirm").value

    if (password !== confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    // Here you would typically send the signup data to your server
    console.log("Signup attempt:", { name, email, password })
    alert("Signup functionality would be implemented here.")
  })
})


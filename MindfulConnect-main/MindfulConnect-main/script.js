// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize the application
  initApp()
})

// Main initialization function
function initApp() {
  // Initialize theme
  initTheme()

  // Initialize navigation
  initNavigation()

  // Initialize modals
  initModals()

  // Initialize mood tracker
  initMoodTracker()

  // Initialize forums
  initForums()

  // Initialize challenges
  initChallenges()

  // Initialize events
  initEvents()

  // Initialize smooth scrolling
  initSmoothScrolling()

  // Add animation classes on scroll
  initScrollAnimations()

  // Initialize mouse following background
  initMouseFollowingBackground()
}

// Theme initialization and toggle
function initTheme() {
  const themeToggle = document.getElementById("theme-toggle")
  const storedTheme = localStorage.getItem("theme")

  // Set initial theme based on stored preference or system preference
  if (storedTheme) {
    document.body.classList.toggle("dark-mode", storedTheme === "dark")
    updateThemeIcon(storedTheme === "dark")
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.body.classList.add("dark-mode")
    updateThemeIcon(true)
  }

  // Theme toggle event listener
  themeToggle.addEventListener("click", (event) => {
    event.stopPropagation(); 
    const isDarkMode = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    updateThemeIcon(isDarkMode);
});


  // Update theme icon based on current theme
  function updateThemeIcon(isDarkMode) {
    const icon = themeToggle.querySelector("i")
    if (isDarkMode) {
      icon.classList.remove("fa-moon")
      icon.classList.add("fa-sun")
    } else {
      icon.classList.remove("fa-sun")
      icon.classList.add("fa-moon")
    }
  }
}

// Navigation initialization
function initNavigation() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active")

      // Update icon
      const icon = mobileMenuBtn.querySelector("i")
      if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    })
  }

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      navLinks.classList.remove("active")
      const icon = mobileMenuBtn.querySelector("i")
      icon.classList.remove("fa-times")
      icon.classList.add("fa-bars")
    }
  })

  // Active link highlighting
  const navItems = document.querySelectorAll(".nav-links a")
  const sections = document.querySelectorAll("section")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id")
      }
    })

    navItems.forEach((item) => {
      item.classList.remove("active")
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active")
      }
    })
  })
}

// Modal initialization
function initModals() {
  const loginBtn = document.querySelector(".login-btn")
  const signupBtn = document.querySelector(".signup-btn")
  const emergencyBtn = document.querySelector(".emergency-btn")
  const showLoginBtn = document.getElementById("show-login")
  const showSignupBtn = document.getElementById("show-signup")
  const closeModalBtns = document.querySelectorAll(".close-modal")

  const loginModal = document.getElementById("login-modal")
  const signupModal = document.getElementById("signup-modal")
  const emergencyModal = document.getElementById("emergency-modal")

  // Open modals
  loginBtn.addEventListener("click", () => openModal(loginModal))
  signupBtn.addEventListener("click", () => openModal(signupModal))
  emergencyBtn.addEventListener("click", () => openModal(emergencyModal))

  // Switch between login and signup
  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeModal(signupModal)
      openModal(loginModal)
    })
  }

  if (showSignupBtn) {
    showSignupBtn.addEventListener("click", (e) => {
      e.preventDefault()
      closeModal(loginModal)
      openModal(signupModal)
    })
  }

  // Close modals
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeModal(loginModal)
      closeModal(signupModal)
      closeModal(emergencyModal)
    })
  })

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === loginModal) closeModal(loginModal)
    if (e.target === signupModal) closeModal(signupModal)
    if (e.target === emergencyModal) closeModal(emergencyModal)
  })

  // Open modal function
  function openModal(modal) {
    modal.classList.add("active")
    document.body.style.overflow = "hidden" // Prevent scrolling
  }

  // Close modal function
  function closeModal(modal) {
    modal.classList.remove("active")
    document.body.style.overflow = "" // Enable scrolling
  }

  // Form submissions
  const loginForm = document.getElementById("login-form")
  const signupForm = document.getElementById("signup-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate login (would connect to backend in real app)
      const email = document.getElementById("login-email").value
      const password = document.getElementById("login-password").value

      // Simple validation
      if (email && password) {
        // Simulate successful login
        alert("Login successful! (This is a demo)")
        closeModal(loginModal)
      } else {
        alert("Please fill in all fields")
      }
    })
  }

  if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
      e.preventDefault()
      // Simulate signup (would connect to backend in real app)
      const name = document.getElementById("signup-name").value
      const email = document.getElementById("signup-email").value
      const password = document.getElementById("signup-password").value
      const confirm = document.getElementById("signup-confirm").value

      // Simple validation
      if (name && email && password && confirm) {
        if (password === confirm) {
          // Simulate successful signup
          alert("Account created successfully! (This is a demo)")
          closeModal(signupModal)
        } else {
          alert("Passwords do not match")
        }
      } else {
        alert("Please fill in all fields")
      }
    })
  }
}

// Mood tracker initialization
function initMoodTracker() {
  const moodOptions = document.querySelectorAll(".mood-option")
  const factorTags = document.querySelectorAll(".factor-tag")
  const moodChart = document.getElementById("mood-chart")

  // Select mood
  if (moodOptions) {
    moodOptions.forEach((option) => {
      option.addEventListener("click", () => {
        // Remove active class from all options
        moodOptions.forEach((opt) => opt.classList.remove("active"))

        // Add active class to selected option
        option.classList.add("active")

        // Store selected mood (would save to backend in real app)
        const selectedMood = option.getAttribute("data-mood")
        localStorage.setItem("currentMood", selectedMood)
      })
    })
  }

  // Select factors
  if (factorTags) {
    factorTags.forEach((tag) => {
      tag.addEventListener("click", () => {
        tag.classList.toggle("active")

        // Store selected factors (would save to backend in real app)
        const activeTags = Array.from(document.querySelectorAll(".factor-tag.active")).map((tag) => tag.textContent)
        localStorage.setItem("currentFactors", JSON.stringify(activeTags))
      })
    })
  }

  // Initialize mood chart (using canvas)
  if (moodChart) {
    const ctx = moodChart.getContext("2d")

    // Sample data (would come from backend in real app)
    const moodData = [
      { day: "Mon", value: 4 },
      { day: "Tue", value: 3 },
      { day: "Wed", value: 2 },
      { day: "Thu", value: 3 },
      { day: "Fri", value: 4 },
      { day: "Sat", value: 5 },
      { day: "Sun", value: 4 },
    ]

    // Set canvas size
    moodChart.width = moodChart.parentElement.offsetWidth
    moodChart.height = 250

    // Draw chart
    drawMoodChart(ctx, moodData, moodChart.width, moodChart.height)

    // Redraw on window resize
    window.addEventListener("resize", () => {
      moodChart.width = moodChart.parentElement.offsetWidth
      drawMoodChart(ctx, moodData, moodChart.width, moodChart.height)
    })
  }

  // Function to draw mood chart
  function drawMoodChart(ctx, data, width, height) {
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
    ctx.stroke()

    // Draw data points and lines
    const pointWidth = chartWidth / (data.length - 1)

    ctx.beginPath()
    ctx.moveTo(padding, height - padding - (data[0].value / 5) * chartHeight)

    data.forEach((point, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (point.value / 5) * chartHeight

      // Draw line to this point
      if (index > 0) {
        ctx.lineTo(x, y)
      }

      // Draw day label
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
      ctx.textAlign = "center"
      ctx.fillText(point.day, x, height - padding + 20)
    })

    // Style and stroke the line
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue("--primary-color")
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw points
    data.forEach((point, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - (point.value / 5) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--primary-color")
      ctx.fill()

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fillStyle = "#fff"
      ctx.fill()
    })

    // Draw y-axis labels
    const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great"]
    moodLabels.forEach((label, index) => {
      const y = height - padding - (index / 4) * chartHeight
      ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text-muted")
      ctx.textAlign = "right"
      ctx.fillText(label, padding - 10, y + 5)
    })
  }
}

// Forums initialization
function initForums() {
  const forumPostForm = document.getElementById("forum-post-form")
  const forumCategory = document.getElementById("forum-category")
  const postContent = document.getElementById("post-content")
  const stayAnonymous = document.getElementById("stay-anonymous")
  const anonymousName = document.getElementById("anonymous-name")

  if (forumPostForm) {
    forumPostForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const category = forumCategory.value
      const content = postContent.value
      const isAnonymous = stayAnonymous.checked
      const nameType = anonymousName.value

      // Validate form
      if (!category || !content) {
        alert("Please fill in all required fields")
        return
      }

      // Generate anonymous name
      let displayName = "Anonymous User"
      if (nameType === "random") {
        const animals = ["Owl", "Fox", "Eagle", "Deer", "Wolf", "Bear", "Lion", "Tiger", "Rabbit", "Dolphin"]
        displayName = "Anonymous " + animals[Math.floor(Math.random() * animals.length)]
      }

      // Create new post (would send to backend in real app)
      createNewPost(category, content, displayName)

      // Reset form
      forumPostForm.reset()

      // Show success message
      alert("Your post has been submitted anonymously!")
    })
  }

  // Function to create a new post
  function createNewPost(category, content, displayName) {
    // In a real app, this would send data to a backend
    // For demo purposes, we'll create and append a new post to the DOM

    const categorySection = document.querySelector(`.forum-category h3:contains('${category}')`)
    if (categorySection) {
      const postsContainer = categorySection.nextElementSibling

      const newPost = document.createElement("div")
      newPost.className = "forum-post"
      newPost.innerHTML = `
        <div class="post-header">
          <span class="anonymous-user">${displayName}</span>
          <span class="post-time">Just now</span>
        </div>
        <p class="post-content">${content}</p>
        <div class="post-footer">
          <span><i class="fas fa-heart"></i> 0 Support</span>
          <span><i class="fas fa-comment"></i> 0 Replies</span>
        </div>
      `

      postsContainer.prepend(newPost)
    }
  }
}

// Challenges initialization
function initChallenges() {
  const categoryTabs = document.querySelectorAll(".category-tab")
  const challengeCards = document.querySelectorAll(".challenge-card:not(.active)")
  const markCompleteBtn = document.querySelector(".task-actions .secondary-btn")
  const skipTodayBtn = document.querySelector(".task-actions .text-btn")

  // Category tabs
  if (categoryTabs) {
    categoryTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        categoryTabs.forEach((t) => t.classList.remove("active"))

        // Add active class to clicked tab
        tab.classList.add("active")

        // Filter challenges by category (would fetch from backend in real app)
        const category = tab.getAttribute("data-category")
        filterChallenges(category)
      })
    })
  }

  // Mark challenge complete
  if (markCompleteBtn) {
    markCompleteBtn.addEventListener("click", () => {
      // Update progress (would send to backend in real app)
      const progressBar = document.querySelector(".progress")
      const progressText = document.querySelector(".progress-text")

      if (progressBar && progressText) {
        // Increase progress by ~14% (1/7 of the challenge)
        const currentWidth = Number.parseInt(progressBar.style.width) || 42
        const newWidth = Math.min(currentWidth + 14, 100)

        progressBar.style.width = `${newWidth}%`
        progressText.textContent = `${newWidth}% Complete`

        // Update day counter
        const dayCounter = document.querySelector(".challenge-info p")
        if (dayCounter) {
          const currentDay = Number.parseInt(dayCounter.textContent.split(" ")[1])
          const totalDays = Number.parseInt(dayCounter.textContent.split(" ")[3])

          if (currentDay < totalDays) {
            dayCounter.textContent = `Day ${currentDay + 1} of ${totalDays}`
          }
        }

        // Update streak
        const streakCounter = document.querySelector(".challenge-streak span")
        if (streakCounter) {
          const currentStreak = Number.parseInt(streakCounter.textContent.split(" ")[0])
          streakCounter.innerHTML = `<i class="fas fa-fire"></i> ${currentStreak + 1} Day Streak!`
        }

        // Show success message
        alert("Great job! Task marked as complete.")

        // Disable buttons
        markCompleteBtn.disabled = true
        if (skipTodayBtn) skipTodayBtn.disabled = true
      }
    })
  }

  // Skip today's task
  if (skipTodayBtn) {
    skipTodayBtn.addEventListener("click", () => {
      // Update day counter (would send to backend in real app)
      const dayCounter = document.querySelector(".challenge-info p")
      if (dayCounter) {
        const currentDay = Number.parseInt(dayCounter.textContent.split(" ")[1])
        const totalDays = Number.parseInt(dayCounter.textContent.split(" ")[3])

        if (currentDay < totalDays) {
          dayCounter.textContent = `Day ${currentDay + 1} of ${totalDays}`
        }
      }

      // Reset streak
      const streakCounter = document.querySelector(".challenge-streak span")
      if (streakCounter) {
        streakCounter.innerHTML = `<i class="fas fa-fire"></i> 0 Day Streak!`
      }

      // Show message
      alert("Task skipped. You can try again tomorrow!")

      // Disable buttons
      if (markCompleteBtn) markCompleteBtn.disabled = true
      skipTodayBtn.disabled = true
    })
  }

  // Function to filter challenges by category
  function filterChallenges(category) {
    if (category === "all" || category === "popular") {
      challengeCards.forEach((card) => {
        card.style.display = "block"
      })
    } else {
      challengeCards.forEach((card) => {
        // Check if card matches category (would be data-attribute in real app)
        const cardCategory = card.querySelector(".challenge-info h4").textContent.toLowerCase()

        if (cardCategory.includes(category)) {
          card.style.display = "block"
        } else {
          card.style.display = "none"
        }
      })
    }
  }
}

// Events initialization
function initEvents() {
  const calendarDates = document.querySelectorAll(".calendar-dates span")
  const calendarNav = document.querySelectorAll(".calendar-nav")
  const eventFilterForm = document.getElementById("event-filter-form")

  // Calendar date selection
  if (calendarDates) {
    calendarDates.forEach((date) => {
      date.addEventListener("click", () => {
        // Remove current-day class from all dates
        calendarDates.forEach((d) => d.classList.remove("current-day"))

        // Add current-day class to clicked date
        date.classList.add("current-day")

        // Filter events by date (would fetch from backend in real app)
        const selectedDate = date.textContent
        filterEventsByDate(selectedDate)
      })
    })
  }

  // Calendar navigation
  if (calendarNav) {
    calendarNav.forEach((nav) => {
      nav.addEventListener("click", () => {
        // In a real app, this would update the calendar with prev/next month
        // For demo purposes, we'll just show an alert
        const direction = nav.querySelector("i").classList.contains("fa-chevron-left") ? "previous" : "next"
        alert(`This would navigate to the ${direction} month in a real application.`)
      })
    })
  }

  // Event filter form
  if (eventFilterForm) {
    eventFilterForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get filter values
      const eventType = Array.from(document.querySelectorAll("#event-type option:checked")).map(
        (option) => option.value,
      )
      const startDate = document.getElementById("event-start-date").value
      const endDate = document.getElementById("event-end-date").value
      const eventTopic = Array.from(document.querySelectorAll("#event-topic option:checked")).map(
        (option) => option.value,
      )

      // Filter events (would fetch from backend in real app)
      alert(
        `Events would be filtered by: Types: ${eventType.join(", ")}, Date Range: ${startDate} to ${endDate}, Topics: ${eventTopic.join(", ")}`,
      )
    })
  }

  // Function to filter events by date
  function filterEventsByDate(date) {
    // In a real app, this would fetch filtered data from a backend
    // For demo purposes, we'll just show an alert
    alert(`Events for June ${date} would be displayed here.`)
  }
}

// Smooth scrolling
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")

      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        // Close mobile menu if open
        const navLinks = document.querySelector(".nav-links")
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          navLinks.style.display = ""

          const icon = document.querySelector(".mobile-menu-btn i")
          icon.classList.remove("fa-times")
          icon.classList.add("fa-bars")
        }

        // Scroll to target with offset for header
        const headerOffset = 80 // Adjust this value based on your header height
        const elementPosition = targetElement.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".feature-card, .connection-card, .challenge-card, .resource-card, .service-card, .event-card, .info-card, .self-care-card",
  )

  // Initial check for elements in viewport
  checkElementsInViewport()

  // Check on scroll
  window.addEventListener("scroll", checkElementsInViewport)

  function checkElementsInViewport() {
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top
      const elementVisible = 150

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add("fade-in")
      }
    })
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const mainText = "Your Mental Wellness Journey Starts Here"
  const subText = "A safe space for students to connect, share, and prioritize mental health."

  const mainTypingElement = document.getElementById("typing-text")
  const subTypingElement = document.getElementById("sub-typing-text")

  let index1 = 0,
    index2 = 0

  function typeMainText() {
    if (index1 < mainText.length) {
      mainTypingElement.textContent = mainText.substring(0, index1 + 1)
      index1++
      setTimeout(typeMainText, 120) // Adjust speed if needed
    } else {
      setTimeout(typeSubText, 100) // Delay before second line starts
    }
  }

  function typeSubText() {
    if (index2 < subText.length) {
      subTypingElement.textContent = subText.substring(0, index2 + 1)
      index2++
      setTimeout(typeSubText, 50) // Faster typing for second line
    }
  }

  typeMainText()
})

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll("body *") // Select all elements inside <body>

  animatedElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.05}s` // Adds a slight delay for a cascade effect
    element.classList.add("animated", "animate")
  })
})

// Add mouse movement tracking for background
function initMouseFollowingBackground() {
  const gradientSpheres = document.querySelectorAll(".gradient-sphere")

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth
    const mouseY = e.clientY / window.innerHeight

    gradientSpheres.forEach((sphere, index) => {
      // Different movement amount for each sphere
      const moveX = (mouseX - 0.5) * (index + 1) * 50
      const moveY = (mouseY - 0.5) * (index + 1) * 50

      // Apply transform with a slight delay for more natural movement
      setTimeout(() => {
        if (index === 0) {
          sphere.style.transform = `translate(${moveX}px, ${moveY}px)`
        } else if (index === 1) {
          sphere.style.transform = `translate(${-moveX}px, ${-moveY}px)`
        } else if (index === 2) {
          sphere.style.transform = `translate(${moveX / 2}px, ${moveY / 2}px) translate(-50%, -50%)`
        }
      }, index * 50)
    })
  })
}

mobileMenuBtn.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevent clicks from affecting other buttons
  navLinks.classList.toggle("active");

  // Update icon
  const icon = mobileMenuBtn.querySelector("i");
  if (navLinks.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
  } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
  }
});

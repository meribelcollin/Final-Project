Meribel Collin
Final Project
CS 1080 - Intro to Web Dev

Read Me:

My project is a website comprised of multiple pages that share information about Ruckus, the women’s ultimate frisbee team at UVM. It demonstrates structured HTML/CSS design, interactive JavaScript functionality, and data handling with localStorage.

The home page is an overview of the team with a highlight reel link and a sidebar shows upcoming events. Theme toggle uses DOM manipulation and event listeners to switch between light and dark modes.

The roster page has a table with information on every player.

The coaches page introduces the coaches and shares some fun facts and photos. The layout uses flexbox cards and the DOM manipulation updates styles dynamically when theme changes.

The tournamnts page is a list of our tournaments for the 2025-2026 season. The list items get darker when you hover over them.

The interest form page collects name, UVM email, and comments. JavaScript validates that the email ends with @uvm.edu, prevents default submission, and gives clear feedback messages. Submissions are stored as JSON objects in localStorage and retrieved on page load and then logged to the console. DOM manipulation updates the feedback message and resets the form.
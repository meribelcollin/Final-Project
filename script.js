const form = document.getElementById('uvmForm');
const feedbackMsg = document.getElementById('feedbackMsg');
const validDomain = "uvm.edu";

// event listener for form submission
form.addEventListener('submit', function(event) {
  // prevent default action
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const comments = document.getElementById('comments').value.trim();

  // ensure UVM email
  if (!email.endsWith("@" + validDomain)) {
    feedbackMsg.textContent = "❌ Please use a valid UVM email address.";
    feedbackMsg.style.color = "red";
    return;
  }

  // store data in localStorage as JSON
  const formData = {
    name: name,
    email: email,
    comments: comments,
    timestamp: new Date().toISOString()
  };

  // retrieve existing submissions or initialize
  let submissions = JSON.parse(localStorage.getItem("uvmSubmissions")) || [];
  submissions.push(formData);
  localStorage.setItem("uvmSubmissions", JSON.stringify(submissions));

  // post feedback to user
  feedbackMsg.textContent = "Thank you, " + name + "! Your submission has been recieved.";
  feedbackMsg.style.color = "#00563f";

  // clear form
  form.reset();
});

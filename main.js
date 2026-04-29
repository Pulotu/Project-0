const AUTH_KEY = "clearmark_auth";

const loginForm = document.getElementById("loginForm");
const dealForm = document.getElementById("dealForm");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || password.length < 8) {
      document.getElementById("loginMsg").textContent = "Please provide valid credentials.";
      return;
    }

    localStorage.setItem(AUTH_KEY, JSON.stringify({ email, loggedInAt: Date.now() }));
    window.location.href = "submit-deal.html";
  });
}

if (dealForm) {
  const auth = localStorage.getItem(AUTH_KEY);
  if (!auth) {
    window.location.href = "login.html";
  }

  dealForm.addEventListener("submit", (event) => {
    event.preventDefault();
    document.getElementById("dealMsg").textContent = "Thanks! Your deal was submitted for review.";
    dealForm.reset();
  });
}

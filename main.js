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

  const SUBMISSIONS_KEY = "clearmark_deal_submissions";

  dealForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(dealForm);
    const submission = {
      company: (formData.get("company") || "").toString().trim(),
      contact: (formData.get("contact") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      address: (formData.get("address") || "").toString().trim(),
      timeline: (formData.get("timeline") || "").toString().trim(),
      dealType: (formData.get("dealType") || "").toString().trim(),
      amount: Number(formData.get("amount") || 0),
      summary: (formData.get("summary") || "").toString().trim(),
      submittedAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem(SUBMISSIONS_KEY) || "[]");
    existing.unshift(submission);
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(existing));

    document.getElementById("dealMsg").textContent =
      "Thanks! Your deal was submitted. We’ll respond with rapid feasibility feedback when inputs are complete.";
    dealForm.reset();
  });
}

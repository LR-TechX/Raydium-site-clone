document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("swapForm");
  const output = document.getElementById("output");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // Get user input
    const fromToken = document.getElementById("fromToken").value;
    const toToken = document.getElementById("toToken").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (fromToken === toToken) {
      output.textContent = "You cannot swap the same token.";
      return;
    }

    if (amount <= 0 || isNaN(amount)) {
      output.textContent = "Please enter a valid amount.";
      return;
    }

    try {
      // Send data to backend
      const response = await fetch("http://localhost:3000/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromToken, toToken, amount }),
      });

      const data = await response.json();

      if (response.ok) {
        output.innerHTML = `
          Successfully swapped ${amount} ${fromToken} to ${data.convertedAmount.toFixed(
          2
        )} ${toToken} (Rate: ${data.rate})
        `;
      } else {
        output.textContent = `Error: ${data.error}`;
      }
    } catch (error) {
      output.textContent = "An error occurred. Please try again later.";
      console.error("Error:", error);
    }
  });
});

// Handle Dropdown Hover
const dropdown = document.querySelector(".group");
dropdown.addEventListener("mouseover", () => {
  const menu = dropdown.querySelector("ul");
  menu.classList.remove("hidden");
});
dropdown.addEventListener("mouseout", () => {
  const menu = dropdown.querySelector("ul");
  menu.classList.add("hidden");
});

// Chart.js: Token Performance
const ctx = document.getElementById("tokenChart").getContext("2d");
const tokenChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{
      label: "ETH to SOL",
      data: [10, 12, 8, 14, 16, 12],
      borderColor: "rgba(59, 130, 246, 1)",
      backgroundColor: "rgba(59, 130, 246, 0.2)",
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    }
  }
});

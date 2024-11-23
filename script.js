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

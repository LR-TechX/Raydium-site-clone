// Toggle Chart Visibility
document.getElementById("toggleChart").addEventListener("click", function () {
  const chartContainer = document.getElementById("chartContainer");
  chartContainer.classList.toggle("hidden");
});

// Chart.js Initialization (Placeholder Data)
const ctx = document.getElementById("swapChart").getContext("2d");
new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Price (SOL/RAY)",
        data: [20, 25, 30, 28, 35, 40],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  },
});

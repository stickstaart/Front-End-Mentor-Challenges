const outcomeDisplay = document.querySelector(".display-outcome");
const numberBtn = Array.from(document.querySelectorAll(".number"));

console.log(numberBtn);

numberBtn.map((number) => {
  number.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "RESET":
        outcomeDisplay.innerText = "";
        break;
      case "DEL":
        if (outcomeDisplay.innerText) {
          outcomeDisplay.innerText = outcomeDisplay.innerText.slice(0, -1);
        }
        break;
      case "=":
        try {
          outcomeDisplay.innerText = eval(outcomeDisplay.innerText);
        } catch {
          outcomeDisplay.innerText = "ERROR!";
        }

        break;
      default:
        outcomeDisplay.innerText += e.target.innerText;
    }
  });
});

// YOUTUBE VID https://www.youtube.com/watch?v=QS6Y0ezhyCs 10.05 min

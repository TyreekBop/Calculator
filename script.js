const buttonsE1 = document.querySelectorAll("button");

const inputFieldE1 = document.getElementById("result");
for (let i = 0; i < buttonsE1.length; i++) {
    buttonsE1[i].addEventListener("click", () => {
        const buttonValue = buttonsE1[i].textContent.trim();
        console.log(buttonValue);
        if (buttonValue === "C") {
            clearResult();
        } else if (buttonValue === "=") {
            calculateResult();
        } else {
            appendValue(buttonValue);
        }
    });
}
    
function clearResult() {
    inputFieldE1.value = "";
}

function appendValue(buttonValue) { 
    inputFieldE1.value += buttonValue;
    //   inputFieldE1.value = inputFieldE1.value + buttonValue;
}

function calculateResult() {
    // Map sequences to lyrics
    const lyricsMap = {
        "140+3": [
            "At sa bawat minuto, ako'y iyong nandito.",
            "Pinili mo'y iba habang ako'y narito.",
            "Iba ang nais kapiling sa huling sandali,",
            "Tinatanggap ko na.",
            "kahit di ako'y yung nagwagi.",
        ]
    };

    if (lyricsMap[inputFieldE1.value]) {
        displayLyricsWithDelay(lyricsMap[inputFieldE1.value]);
    } else {
        try {
            // Otherwise, evaluate the input as a mathematical expression
            inputFieldE1.value = eval(inputFieldE1.value);
        } catch (e) {
            // Handle invalid input
            inputFieldE1.value = "Error";
        }
    }
}

function displayLyricsWithSync(lyrics) {
    inputFieldE1.value = "";

    lyrics.forEach((line, index) => {
        setTimeout(() => {
            inputFieldE1.value = line.text;
        }, line.delay * 1000);
        
        // Clear after displaying each line
        setTimeout(() => {
            if (index < lyrics.length - 1) inputFieldE1.value = "";
        }, (line.delay + 2) * 1000);
    });
}

function displayLyricsWithDelay(lyrics) {
    let index = 0;
    inputFieldE1.value = "";

    function showNextLine() {
        if (index < lyrics.length) {
            inputFieldE1.value = lyrics[index];
            index++;
            setTimeout(() => {
                inputFieldE1.value = "";
                setTimeout(showNextLine, 1000);
            }, 2000);
        }
    }

    showNextLine();
}




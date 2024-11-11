let optionsButtons = document.querySelectorAll('.option-button');
let advancedOptionButton = document.querySelectorAll('.adv-option-button');
let fontName = document.getElementById('fontName');
let fontSizeRef = document.getElementById('fontSize');
let writingArea = document.getElementById('text-input');
let linkButton = document.getElementById('createLink');
let unlinkButton = document.getElementById('unlink');
let alignButtons = document.querySelectorAll('.align');
let spacingButtons = document.querySelectorAll('.spacing');
let formatButtons = document.querySelectorAll('.format');
let scriptButtons = document.querySelectorAll('.script');

// Font options
let fontList = [
    "serif", 
    "sans-serif", 
    "script", 
    "monospaced",
    "display",
    "cursive",
    "Arial",
    "Times New Roman",
    "Verdana",
    "Georgia",
    "Courier New",
];

// Initialize editor with font options and highlighters
const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);

    fontList.forEach((font) => {
        let option = document.createElement('option');
        option.value = font;
        option.innerHTML = font;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = `Size ${i}`;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
};

// Execute document commands
const modifyText = (command, defaultUi = false, value = null) => {
    document.execCommand(command, defaultUi, value);
};

// Apply actions for basic option buttons
optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
        modifyText(button.id);
    });
});

// Apply actions for advanced option buttons
advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
        modifyText(button.id, false, button.value);
    });
});

// Link button functionality
linkButton.addEventListener("click", () => {
    let userLink = prompt("Enter a URL:");
    if (/http/i.test(userLink)) {
        modifyText('createLink', false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText('createLink', false, userLink);
    }
});

// Unlink button functionality
unlinkButton.addEventListener("click", () => {
    modifyText("unlink");
});

// Highlighter to mark active buttons
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener("click", () => {
            if (needsRemoval) {
                let alreadyActive = button.classList.contains("active");
                highlighterRemover(className);
                if (!alreadyActive) {
                    button.classList.add("active");
                } else {
                    button.classList.remove("active");
                }
            } else {
                button.classList.toggle("active");
            }
        });
    });
};

// Remove active highlights
const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove("active");
    });
};

// Run initializer on window load
window.onload = initializer;

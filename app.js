const buttons = [
    {
        label: "7",
        value: "7",
        class: "bg-gray-100 hover:bg-gray-200"
    },
    {
        label: "8",
        value: "8",
        class: "bg-gray-100 hover:bg-gray-200"
    },
    {
        label: "9",
        value: "9",
        class: "bg-gray-100 hover:bg-gray-200"
    },
    {
        label: "4",
        value: "4",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "5",
        value: "5",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "6",
        value: "6",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "1",
        value: "1",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "2",
        value: "2",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "3",
        value: "3",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "0",
        value: "0",
        class: "col-span-2 bg-gray-100 hover:bg-gray-200"
    }, {
        label: ".",
        value: ".",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "C",
        value: "clear",
        class: "col-span-2 bg-gray-300 hover:bg-gray-400"
    }, {
        label: "⌫",
        value: "delete",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "sin",
        value: "sin",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "cos",
        value: "cos",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "tan",
        value: "tan",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "asin",
        value: "asin",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "acos",
        value: "acos",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "atan",
        value: "atan",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "log",
        value: "log10",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "ln",
        value: "log",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "π",
        value: "π",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "!",
        value: "factorial",
        class: "bg-gray-100 hover:bg-gray-200"
    }, {
        label: "(",
        value: "(",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: ")",
        value: ")",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "^",
        value: "^",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "√",
        value: "√",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "÷",
        value: "/",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "×",
        value: "*",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "–",
        value: "-",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "+",
        value: "+",
        class: "bg-gray-300 hover:bg-gray-400"
    }, {
        label: "=",
        value: "calculate",
        class: "col-span-4 bg-gray-300 hover:bg-gray-400"
    },
];

const calculatorButtons = document.getElementById("calculator-buttons");
const resultElement = document.getElementById("result");

buttons.forEach(button => {
    const buttonElement = document.createElement("button");
    buttonElement.textContent = button.label;
    buttonElement.className = `p-2 rounded-md text-lg font-bold text-center ${
        button.class
    }`;
    buttonElement.addEventListener("click", () => handleClick(button.value));
    calculatorButtons.appendChild(buttonElement);
});

function handleClick(value) {

    if (value === "clear") {
        resultElement.value = "";
    } else if (value === "delete") {
        resultElement.value = resultElement.value.slice(0, -1);
    } else if (value === "calculate") {
        calculateResult();
    } else if (value === "sin" || value === "cos" || value === "tan" || value === "asin" || value === "acos" || value === "atan" || value === "log10" || value === "log") {
        resultElement.value += `${value}(`;
    } else if (value === "factorial") {
        resultElement.value += "!";
    } else if (value === "√") {
        resultElement.value += "√(";
        // resultElement.setSelectionRange(resultElement.value.length - 1, resultElement.value.length - 1); yae sir say pochna ku mae charaha tha k value bracket mae aie
    } else {
        resultElement.value += value;
    }
}

function calculateResult() {
    let result = resultElement.value;
    if (! result) {
        resultElement.value = "Error";
    } else {
        try {
            result = evaluateExpression(result);
            resultElement.value = result;
        } catch (error) {
            resultElement.value = "Error: Invalid Expression";
        }
    }
}

function evaluateExpression(expression) {
    expression = expression.replace(/sin\(/g, "Math.sin(");
    expression = expression.replace(/cos\(/g, "Math.cos(");
    expression = expression.replace(/tan\(/g, "Math.tan(");
    expression = expression.replace(/asin\(/g, "Math.asin(");
    expression = expression.replace(/acos\(/g, "Math.acos(");
    expression = expression.replace(/atan\(/g, "Math.atan(");
    expression = expression.replace(/log10\(/g, "Math.log10(");
    expression = expression.replace(/log\(/g, "Math.log(");
    expression = expression.replace(/√\(/g, "Math.sqrt(");
    expression = expression.replace(/π/g, "Math.PI");
    expression = expression.replace(/(!\d+)/g, match => {
        const num = parseInt(match.substring(1));
        let result = 1;
        for (let i = 1; i <= num; i++) {
            result *= i;
        }
        return result;
    });

    return eval(expression);
}

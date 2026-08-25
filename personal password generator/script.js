function generatePassword() {

    const length =
        parseInt(
            document.getElementById("length").value
        );

    const message =
        document.getElementById("message");

    if (isNaN(length) || length < 4) {

        message.innerText =
            "Password length should be at least 4.";

        return;
    }

    const lower =
        "abcdefghijklmnopqrstuvwxyz";

    const upper =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const digits =
        "0123456789";

    const symbols =
        "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allChars =
        lower + upper + digits + symbols;

    let password = "";

    // At least one from every category
    password += randomCharacter(lower);
    password += randomCharacter(upper);
    password += randomCharacter(digits);
    password += randomCharacter(symbols);

    // Remaining characters
    for (
        let i = 4;
        i < length;
        i++
    ) {

        password +=
            randomCharacter(allChars);
    }

    // Shuffle password
    password =
        password
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");

    document.getElementById("password").value =
        password;

    message.innerText =
        "Password generated successfully!";
}


function randomCharacter(characters) {

    const index =
        Math.floor(
            Math.random() * characters.length
        );

    return characters[index];
}


function copyPassword() {

    const password =
        document.getElementById("password").value;

    const message =
        document.getElementById("message");

    if (!password) {

        message.innerText =
            "Generate a password first.";

        return;
    }

    navigator.clipboard.writeText(password)
        .then(function() {

            message.innerText =
                "Password copied to clipboard!";

        })
        .catch(function() {

            message.innerText =
                "Unable to copy password.";

        });
}
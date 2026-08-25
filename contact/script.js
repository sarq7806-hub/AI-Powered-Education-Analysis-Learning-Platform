document
    .getElementById("contactForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const name =
                document.getElementById("name")
                    .value;

            const message =
                document.getElementById("message")
                    .value;

            const success =
                document.getElementById(
                    "successMessage"
                );

            success.innerText =
                "Thank you, " +
                name +
                "! Your message has been received.";

            success.style.color = "green";

            document
                .getElementById("contactForm")
                .reset();
        }
    );
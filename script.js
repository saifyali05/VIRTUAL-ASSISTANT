const btn = document.querySelector('#btn');
const content = document.querySelector('#content');
const voice = document.querySelector('#voice');
const askAgainBtn = document.querySelector('#askAgain');
const exitBtn = document.querySelector('#exitBtn');
let isExited = false;



function speak(text) {
    const textSpeak = new SpeechSynthesisUtterance(text);
    textSpeak.rate = 1;
    textSpeak.pitch = 1;
    textSpeak.volume = 1;
    textSpeak.lang = 'en-IN';
     textSpeak.onend = () => {
        askAgainBtn.style.display = "flex";
    };
     textSpeak.onend = () => {
        if (!isExited) {
            askAgainBtn.style.display = "flex";
            exitBtn.style.display = "flex";
        }
    };
    window.speechSynthesis.speak(textSpeak);
    


}

function wishMe() {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning Sir , how may i help you");
    } else if (hour >= 12 && hour < 16) {
        speak("Good Afternoon Sir , how may i help you");
    } else {
        speak("Good Evening Sir , how may i help you");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

recognition.onend = () => {
    btn.style.display = "flex";
    voice.style.display = "none";
};

btn.addEventListener('click', () => {
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});
askAgainBtn.addEventListener('click', () => {
    askAgainBtn.style.display = "none";
    recognition.start();
});
exitBtn.addEventListener('click', () => {
    isExited = true;

    recognition.onend = null;  
    recognition.stop();       
    window.speechSynthesis.cancel();

    askAgainBtn.style.display = "none";
    btn.style.display = "none";
    voice.style.display = "none";
    exitBtn.style.display = "none";

    const bye = new SpeechSynthesisUtterance("Thank you for using me");
    bye.lang = "en-IN";
    window.speechSynthesis.speak(bye);
});



function takeCommand(message) {

    if (message.includes("hello") || message.includes("hi") || message.includes("yo")) {
        wishMe();

    } else if (message.includes("who are you") || message.includes("hu r u")) {
        speak("I am THALA, a virtual assistant created by Saif");

    } else if (message.includes("how are you")) {
        speak("I am good, how may I help you?");

    } else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://www.youtube.com", "_blank");

    } else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://www.google.com", "_blank");

    } else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://www.facebook.com", "_blank");

    } else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://www.instagram.com", "_blank");

    } else if (message.includes("open calculator")) {
        speak("Opening Calculator...");
        window.open("calculator://");

    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com", "_blank");

    } else if (message.includes("time")) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);

    } else if (message.includes("date")) {
        const date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);

    } else {
        // Smart search fallback
        let searchQuery = message.replace(/who is|what is|who are|what are|define|tell me about|search|google/gi, "").trim();

        speak("This is what I found on the internet regarding " + searchQuery);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
    }
}

        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The time is " + time);
    } else if (message.includes("date")) {
        const date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    else {
    // Remove common question words
    let searchQuery = message.replace(/who is|what is|who are|what are|define|tell me about|search|google/gi, "").trim();

    // Speak response
    speak("This is what I found on the internet regarding " + searchQuery);

    // Open Google search
    window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
}


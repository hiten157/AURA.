let content = document.getElementById("content");
let voice = document.getElementById("voice");
let btn = document.getElementById("Btn");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function WishMe() {
    let day = new Date();
    let hour = day.getHours();
    if (hour >= 0 && hour < 12) {
        speak("Good Morning");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

window.addEventListener("load", () => {
    WishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript.trim().toLowerCase();
    content.innerText = transcript;
    takeCommand(transcript);
};

// Handle errors
recognition.onerror = (event) => {
    console.error("Speech recognition error detected: " + event.error);
    content.innerText = "Error occurred in recognition: " + event.error;
};

btn.addEventListener("click", () => {
    content.innerText = "Listening... (say 'stop' to cancel)";
    recognition.start();
    btn.style.display = "none";
    voice.style.display = "block";
});

function takeCommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    const commands = {
        "hello": "Hello! What can I help you with?",
        "your name": "My Name is Aura",
        "who are you": "I am a virtual assistant created by Akhil sir.",
        "open youtube": () => window.open("https://www.youtube.com/", "_blank"),
        "open facebook": () => window.open("https://www.facebook.com/", "_blank"),
        "open instagram": () => window.open("https://www.instagram.com/", "_blank"),
        "open twitter": () => window.open("https://www.twitter.com/", "_blank"),
        "open whatsapp": () => window.open("https://www.whatsapp.com/", "_blank"),
        "open github": () => window.open("https://www.github.com/", "_blank"),
        "open calculator": () => window.open("calculator://"),
        "are you deaf": "No, I am not, but maybe you are mad for asking such a silly question.",
        "what's going on": "Nothing special, just thinking, why are you here?",
        "i am here to ask you": "Then start asking me questions; if I can answer, I will; otherwise, I'll search the internet for you.",
        "time": () => speak(new Date().toLocaleTimeString()),
        "date": () => speak(new Date().toLocaleDateString()),
    };

    const response = commands[message] || (() => {
        const searchMessage = message.replace(/(Aura|Aora|Hey)/, "").trim();
        speak(`This is what I found on the internet regarding ${searchMessage}`);
        window.open(`https://www.bing.com/search?pglt=513&q=${searchMessage}`);
    });

    if (typeof response === "string") {
        speak(response);
    } else if (typeof response === "function") {
        response();
    }
}

let content = document.getElementById("content");
let voice = document.getElementById("voice")
let btn = document.getElementById("Btn")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-GB"
    window.speechSynthesis.speak(text_speak)
}

function WishMe() {
    let day = new Date()
    let hour = day.getHours()
    if (hour >= 0 && hour <= 12) {
        speak("Good Morning");
    }
    else if (hour >= 12 && hour <= 16) {
        speak("Good Afternoon");
    } else {
        speak("Good Evening");
    }
}

window.addEventListener("load", ()=>{
    WishMe();
})

let speachRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speachRecognition();
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click", () => {
    content.innerText = "Listening...";
    recognition.start();
    btn.style.display = "none"
    voice.style.display = "block"
});


function takeCommand(message) {

    btn.style.display = "flex"
    voice.style.display = "none"

    if (message.includes("hello")) {
        speak("Hello! What can I help you with?");
        recognition.stop();
    }else if(message.includes("your name")){
        speak("My Name is Aura")
    } 
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant created by Akhil sir.");
        recognition.stop();
    } else if (message.includes("open youtube")) {
        speak("opening youtube")
        window.open("https://www.youtube.com/", "_blank")
    } else if (message.includes("open facebook",)) {
        speak("opening facebook")
        window.open("https://www.facebook.com/", "_blank")
    } else if (message.includes("open instagram")) {
        speak("opening instagram")
        window.open("https://www.instagram.com/ ", "_blank")
    } else if (message.includes("open twitter")) {
        speak("opening twitter")
        window.open("https://www.twitter.com/", "_blank")
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp")
        window.open("https://www.whatsapp.com/", "_blank")
    }else if (message.includes("open github")){
        speak("opening github")
        window.open("https://www.github.com/", "_blank")
    } else if (message.includes("open calculator")) {
        speak("Opening calculator")
        window.open("calculator://")
    }else if (message.includes("are you deaf")){
        speak("no, I am not but might be you are mad, who is asking me such silly question")
    }else if(message.includes("what's going on")){
        speak("nothing special just thinking, why are you here")
    }else if(message.includes("I am here to ask you ")){
        speak("then start asking me question if I will be able to answer it I will otherwise I will provide you by searching on internet")
    }
    
    else if (message.includes("Time") || message.includes("time")) {
        let time = new Date().toLocaleString(undefined, {hour: "numeric", minute: "numeric"})
        speak(time)
    }else if (message.includes("Date") || message.includes("date")) {
        let date = new Date().toLocaleString(undefined, {day: "numeric", month: "short"})
        speak(date)
    }
     else{
        let finaltext = "this is What I found on internet regarding" + message.replace("Aura", "") || message.replace("Aora", "") || message.replace("Hey", "")
        speak(finaltext)
        window.open(`https://www.bing.com/search?pglt=513&q=${message.replace("Aura", "") || message.replace("Aora", "") || message.replace("Hey", "")}`)
    }
}

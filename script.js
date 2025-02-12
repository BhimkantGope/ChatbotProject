// const chatInput = document.querySelector(".chat-input textarea");
// const sendChatBtn = document.querySelector(".chat-input span");
// const chatbox = document.querySelector(".chatbox");
// const chatbotToggler = document.querySelector(".chatbot-toggler");
// const chatbotCloseBtn = document.querySelector(".close-btn");

// let userMessage;
// const API_KEY = "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";
// const inputInitHeight = chatInput.scrollHeight;

// const createChatLi = (message, className) => {
//     // Create a chat <li> element with passed message and className
//     const chatLi = document.createElement("li");
//     chatLi.classList.add("chat", className);
//     let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
//     chatLi.innerHTML = chatContent;
//     chatLi.querySelector("p").textContent = message;
//     return chatLi;
// }

// const generateResponse = (incomingChatLi) => {
//     // API REFERENCE (chat GPT)
//     const API_URL = "https://api.openai.com/v1/chat/completions";
//     // const requestElement = incomingChatLi.querySelector("p");
//     const messageElement = incomingChatLi.querySelector("p");


//     const requestOptions = {
//         method: "POST",
//         headers: {
//             // Accept: "application/json",
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4",
//             messages: [{role: "user", content: userMessage}],
//         })
//     }

//     // Send POST request API, get response
//     // fetch(API_URL, requestOptions).then((res) => res.json()).then(data => {
//     //     messageElement.textContent = data.choices[0].message.content;
//     // }).catch((error) => {
//     //     messageElement.classList.add("error");
//     //     messageElement.textContent = "Oops! Something went wrong. Please try again.";
//     // }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));

//     fetch(API_URL, requestOptions).then((res) => res.json()).then(data => {
//         if (data.choices && data.choices[0] && data.choices[0].message) {
//             messageElement.textContent = data.choices[0].message.content;
//         } else {
//             throw new Error("Invalid API response");
//         }
//     }).catch((error) => {
//         messageElement.classList.add("error");
//         messageElement.textContent = "Oops! Something went wrong. Please try again.";
//         console.error(error); // Log the actual error for debugging
//     });    
// }
// const handleChat = () => {
//     userMessage = chatInput.value.trim();
//     if(!userMessage) return;
//     chatInput.value = "";
//     chatInput.style.height = `${inputInitHeight}px`;

//     // Append the user's message to the chatbox
//     chatbox.appendChild(createChatLi(userMessage, "outgoing"));
//     chatbox.scrollTo(0, chatbox.scrollHeight);

//     setTimeout(() => {
//         // Display "Thinking..." message while waiting for the respose
//         const incomingChatLi = createChatLi("Thinking...", "incoming");
//         chatbox.appendChild(incomingChatLi);
//         chatbox.scrollTo(0, chatbox.scrollHeight);
//         generateResponse(incomingChatLi);
//     }, 600);
// }

// chatInput.addEventListener("input", () => {
//     // Adjust the height of the input textarea based on its content
//     chatInput.style.height = `${inputInitHeight}px`;
//     chatInput.style.height = `${chatInput.scrollHeight}px`;
// });

// chatInput.addEventListener("keydown", (e) => {
//     // If Enter key is pressed  without Shift key and the window
//     // width is greater than 800px , handle the chat
//     if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
//         e.preventDefault();
//         handleChat();
//     }
// })
// sendChatBtn.addEventListener("click", handleChat);
// chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
// chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));




const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    const chatContent = className === "outgoing" 
        ? `<p></p>` 
        : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const API_URL = "/api/chat"; // Replace with your backend endpoint
    const messageElement = incomingChatLi.querySelector("p");

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
    }).then(res => res.json()).then(data => {
        if (data.response) {
            messageElement.textContent = data.response;
        } else {
            throw new Error("Invalid response from server");
        }
    }).catch(error => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
        console.error(error);
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

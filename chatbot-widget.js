// Enhanced Chatbot Widget for Sopaana Health Clinic
(function() {
    // Create floating button
    const chatBtn = document.createElement('div');
    chatBtn.id = 'chatbot-btn';
    chatBtn.innerHTML = '<i class="fas fa-comments"></i>';
    document.body.appendChild(chatBtn);

    // Create chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';
    chatWindow.innerHTML = `
        <div class="chatbot-header">
            <span><i class="fas fa-heartbeat"></i> Sopaana Assistant</span>
            <button id="chatbot-close">&times;</button>
        </div>
        <div class="chatbot-messages"></div>
        <form id="chatbot-form">
            <input type="text" id="chatbot-input" placeholder="Ask me anything about our services..." autocomplete="off" required />
            <button type="submit"><i class="fas fa-paper-plane"></i></button>
        </form>
    `;
    document.body.appendChild(chatWindow);

    // Enhanced Styles
    const style = document.createElement('style');
    style.textContent = `
        #chatbot-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            box-shadow: 0 4px 20px rgba(37, 99, 235, 0.3);
            cursor: pointer;
            z-index: 9999;
            transition: all 0.3s ease;
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        #chatbot-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(37, 99, 235, 0.4);
        }
        
        #chatbot-window {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 380px;
            max-width: 95vw;
            background: white;
            border-radius: 20px;
            box-shadow: 0 12px 40px rgba(0,0,0,0.15);
            display: none;
            flex-direction: column;
            z-index: 10000;
            overflow: hidden;
            border: 1px solid #e5e7eb;
        }
        
        .chatbot-header {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            padding: 1.2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .chatbot-header i {
            margin-right: 0.5rem;
            color: #fbbf24;
        }
        
        .chatbot-messages {
            padding: 1.2rem;
            height: 350px;
            overflow-y: auto;
            background: #f8fafc;
            font-size: 1rem;
            scroll-behavior: smooth;
        }
        
        .chatbot-message {
            margin-bottom: 1.2rem;
            display: flex;
            animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .chatbot-message.user {
            justify-content: flex-end;
        }
        
        .chatbot-message.bot {
            justify-content: flex-start;
        }
        
        .chatbot-bubble {
            padding: 0.8rem 1.2rem;
            border-radius: 18px;
            max-width: 85%;
            word-break: break-word;
            line-height: 1.5;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .chatbot-message.user .chatbot-bubble {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            border-bottom-right-radius: 6px;
        }
        
        .chatbot-message.bot .chatbot-bubble {
            background: white;
            color: #374151;
            border-bottom-left-radius: 6px;
            border: 1px solid #e5e7eb;
        }
        
        .chatbot-intents {
            display: flex;
            flex-wrap: wrap;
            gap: 0.6rem;
            margin-bottom: 1rem;
        }
        
        .chatbot-intent-btn {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 25px;
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            box-shadow: 0 2px 8px rgba(37, 99, 235, 0.2);
        }
        
        .chatbot-intent-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        
        .chatbot-quick-actions {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            flex-wrap: wrap;
        }
        
        .quick-action-btn {
            background: #f3f4f6;
            color: #374151;
            border: 1px solid #d1d5db;
            border-radius: 15px;
            padding: 0.4rem 0.8rem;
            font-size: 0.8rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        
        .quick-action-btn:hover {
            background: #e5e7eb;
            color: #1f2937;
        }
        
        #chatbot-form {
            display: flex;
            border-top: 1px solid #e5e7eb;
            background: #fff;
            padding: 0.5rem;
        }
        
        #chatbot-input {
            flex: 1;
            border: 1px solid #d1d5db;
            border-radius: 20px;
            padding: 0.8rem 1rem;
            font-size: 1rem;
            outline: none;
            transition: border-color 0.3s ease;
        }
        
        #chatbot-input:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        
        #chatbot-form button {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            margin-left: 0.5rem;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        #chatbot-form button:hover {
            transform: scale(1.1);
        }
        
        .typing-indicator {
            display: flex;
            gap: 0.3rem;
            padding: 0.5rem;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #9ca3af;
            animation: typing 1.4s infinite ease-in-out;
        }
        
        .typing-dot:nth-child(1) { animation-delay: -0.32s; }
        .typing-dot:nth-child(2) { animation-delay: -0.16s; }
        
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
            40% { transform: scale(1); opacity: 1; }
        }
        
        @media (max-width: 480px) {
            #chatbot-window {
                width: 98vw;
                right: 1vw;
                bottom: 80px;
                height: 70vh;
            }
            .chatbot-messages {
                height: calc(70vh - 140px);
            }
        }
    `;
    document.head.appendChild(style);

    // Show/hide chat window
    chatBtn.onclick = () => {
        chatWindow.style.display = 'flex';
        chatBtn.style.display = 'none';
        input.focus();
    };
    
    chatWindow.querySelector('#chatbot-close').onclick = () => {
        chatWindow.style.display = 'none';
        chatBtn.style.display = 'flex';
    };

    // Chat logic
    const messagesDiv = chatWindow.querySelector('.chatbot-messages');
    const form = chatWindow.querySelector('#chatbot-form');
    const input = chatWindow.querySelector('#chatbot-input');
    let history = [];
    let isTyping = false;

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-message ${sender}`;
        const bubble = document.createElement('div');
        bubble.className = 'chatbot-bubble';
        bubble.textContent = text;
        msgDiv.appendChild(bubble);
        messagesDiv.appendChild(msgDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function showTypingIndicator() {
        if (isTyping) return;
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot typing-indicator';
        typingDiv.innerHTML = `
            <div class="chatbot-bubble">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        messagesDiv.appendChild(typingDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function hideTypingIndicator() {
        isTyping = false;
        const typingIndicator = messagesDiv.querySelector('.typing-indicator');
        if (typingIndicator) {
            messagesDiv.removeChild(typingIndicator);
        }
    }

    // Enhanced intent buttons with more options
    function addIntentButtons() {
        const intents = [
            { label: '🦷 Dental Care', value: 'Tell me about your dental services and pricing.' },
            { label: '🧘 Yoga Therapy', value: 'What yoga therapy programs do you offer?' },
            { label: '👨‍⚕️ General Physician', value: 'Tell me about your general physician services.' },
            { label: '📅 Book Appointment', value: 'I want to book an appointment. How do I do that?' },
            { label: '💰 Pricing', value: 'What are your service prices and payment options?' },
            { label: '📍 Location & Hours', value: 'Where are you located and what are your working hours?' },
            { label: '❓ General FAQ', value: 'What are some common questions patients ask?' }
        ];
        
        const btnContainer = document.createElement('div');
        btnContainer.className = 'chatbot-intents';
        
        intents.forEach(intent => {
            const btn = document.createElement('button');
            btn.className = 'chatbot-intent-btn';
            btn.textContent = intent.label;
            btn.onclick = (e) => {
                e.preventDefault();
                input.value = intent.value;
                form.dispatchEvent(new Event('submit'));
            };
            btnContainer.appendChild(btn);
        });
        
        messagesDiv.appendChild(btnContainer);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Add quick action buttons after bot responses
    function addQuickActions() {
        const quickActions = [
            { label: 'Book Now', action: 'Book an appointment now' },
            { label: 'Call Us', action: 'Call +91 99999 99999' },
            { label: 'Yoga Page', action: 'Take me to the yoga page' },
            { label: 'Location', action: 'Where are you located?' },
            { label: 'Emergency', action: 'Emergency contact information' }
        ];
        
        const actionContainer = document.createElement('div');
        actionContainer.className = 'chatbot-quick-actions';
        
        quickActions.forEach(action => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = action.label;
            btn.onclick = (e) => {
                e.preventDefault();
                if (action.label === 'Call Us') {
                    window.open('tel:+91999999999');
                } else if (action.label === 'Yoga Page') {
                    window.open('yoga.html', '_blank');
                } else {
                    input.value = action.action;
                    form.dispatchEvent(new Event('submit'));
                }
            };
            actionContainer.appendChild(btn);
        });
        
        messagesDiv.appendChild(actionContainer);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    // Enhanced welcome message
    function showWelcome() {
        addMessage('👋 Hello! I\'m your Sopaana Assistant. I\'m here to help you with any questions about our healthcare services, appointments, or general inquiries. How can I assist you today?', 'bot');
        addIntentButtons();
    }

    // Enhanced backend communication with better error handling
    async function tryBackend(userMsg) {
        showTypingIndicator();
        
        try {
            const res = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg, history })
            });
            
            hideTypingIndicator();
            
            if (!res.ok) throw new Error('Backend not available');
            
            const data = await res.json();
            if (data.reply) {
                addMessage(data.reply, 'bot');
                history.push({ role: 'assistant', content: data.reply });
                addQuickActions();
            } else {
                addMessage('I apologize, but I\'m having trouble processing your request right now. Please try again or call us at +91 99999 99999 for immediate assistance.', 'bot');
            }
        } catch (err) {
            hideTypingIndicator();
            addMessage('I\'m currently experiencing technical difficulties. Please call us at +91 99999 99999 for immediate assistance, or try again in a few moments. Thank you for your patience!', 'bot');
        }
    }

    // Enhanced form submission
    form.onsubmit = async (e) => {
        e.preventDefault();
        const userMsg = input.value.trim();
        if (!userMsg) return;
        
        addMessage(userMsg, 'user');
        history.push({ role: 'user', content: userMsg });
        input.value = '';
        
        await tryBackend(userMsg);
    };

    // Enter key support
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });

    // Show welcome message on open
    showWelcome();
})(); 
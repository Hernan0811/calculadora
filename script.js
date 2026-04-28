let currentInput = "";
let history = "";

const output = document.getElementById("calc-output");
const historyDisplay = document.getElementById("calc-history");
let chatIntervalId = null; // Variable global para controlar el chat

// Objeto de Audio para el sonido de glitch
// Asegúrate de tener un archivo de sonido (ej. 'glitch_sound.mp3') en una carpeta 'assets/sounds'
// o ajusta la ruta según donde lo coloques.
const glitchSound = new Audio('assets/sounds/glitch_sound.mp3');
glitchSound.volume = 0.7; // Ajusta el volumen si es necesario
glitchSound.preload = 'auto'; // Precarga el sonido para que esté listo


function appendCalc(char) {
    if (currentInput === "0") currentInput = "";
    currentInput += char;
    updateDisplay();
}

function clearCalc() {
    currentInput = "0";
    history = "";
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === "") currentInput = "0";
    updateDisplay();
}

function updateDisplay() {
    output.innerText = currentInput;
    historyDisplay.innerText = history;
}

function calculate() {
    // EL TRUCO: Si la suma es 3+2
    if (currentInput === "3+2") {
        revealJessica();
        return;
    }

    try {
        history = currentInput;
        currentInput = eval(currentInput).toString();
    } catch (e) {
        currentInput = "Error";
    }
    updateDisplay();
}

function revealJessica() {
    const secretPage = document.getElementById("secret-page");
    document.getElementById("calculator-screen").classList.add("hidden");
    secretPage.classList.remove("hidden");
    
    document.getElementById("whatsapp-btn").classList.remove("hidden");

    // Reproducir el sonido de glitch
    glitchSound.play();

    // Aplicar efecto de distorsión visual al cargar
    secretPage.classList.add("glitch-reveal");
    
    // Cambiar color de fondo del body para la transición
    document.body.style.backgroundColor = "#000";

    // Quitar la clase del efecto después de que termine la animación (0.5s)
    setTimeout(() => {
        secretPage.classList.remove("glitch-reveal");
        typeWriterEffect(); // Iniciar el efecto de máquina de escribir
        startVisitorCounter(); // Iniciar el contador de visitas
        initAutoCarousel(); // Iniciar el carrusel automático
        initParticles(); // Iniciar el efecto de polvo de estrellas
        initLiveChat(); // Iniciar el chat en vivo
    }, 500);

    // Programar la notificación de reserva a los 10 segundos
    setTimeout(showBookingNotification, 10000);
}

// Función para mostrar la notificación de reserva "en vivo"
function showBookingNotification() {
    const toast = document.getElementById('notification-toast');
    if (!toast) return;

    toast.classList.remove('hidden');

    // Ocultar automáticamente después de 6 segundos de exposición
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.classList.remove('fade-out');
        }, 500);
    }, 6000);
}

// Función para animar el contador de visitas VIP
function startVisitorCounter() {
    const countElement = document.getElementById('visit-count');
    if (!countElement) return;

    let count = 14250; // Punto de partida ficticio (popularidad previa)
    const target = count + Math.floor(Math.random() * 120) + 30; // Objetivo de la sesión actual

    const updateCount = () => {
        if (count < target) {
            count += Math.floor(Math.random() * 4) + 1; // Incrementos aleatorios para naturalidad
            countElement.innerText = count.toLocaleString();
            setTimeout(updateCount, 30);
        } else {
            countElement.innerText = target.toLocaleString();
        }
    };
    updateCount();
}

// Función para el efecto de máquina de escribir
function typeWriterEffect() {
    const descriptionElement = document.getElementById('jessica-description');
    if (!descriptionElement) return;

    const fullText = descriptionElement.textContent;
    descriptionElement.textContent = ''; // Limpiar el texto inicial
    let i = 0;

    function type() {
        if (i < fullText.length) {
            descriptionElement.textContent += fullText.charAt(i);
            i++;
            setTimeout(type, 50); // Velocidad de escritura (50ms por letra)
        }
    }
    type();
}

// Función para inicializar y controlar el carrusel automático
function initAutoCarousel() {
    const carouselTrack = document.getElementById('photo-carousel-track');
    if (!carouselTrack) return;

    const carouselItems = carouselTrack.querySelectorAll('.photo-item');
    if (carouselItems.length === 0) return;

    let currentIndex = 0;
    const slideInterval = 5000; // 5 segundos por imagen

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        
        // CORRECCIÓN: Usamos scrollTo en el contenedor en lugar de scrollIntoView
        const itemWidth = carouselItems[0].offsetWidth;
        carouselTrack.scrollTo({
            left: currentIndex * itemWidth,
            behavior: 'smooth'
        });
    }

    // Iniciar el carrusel automático
    setInterval(showNextSlide, slideInterval);
}

// Lógica del Chat en Vivo con mensajes infinitos
function initLiveChat() {
    const chatContainer = document.getElementById('live-chat-messages');
    if (!chatContainer) return;

    const positiveMessages = [
        "¡Jessica es increíble! La mejor experiencia en Bogotá.",
        "Totalmente recomendada, su discreción es impecable.",
        "Una verdadera dama, su compañía es un placer.",
        "¡Volveré pronto! Cada momento con Jessica es mágico.",
        "Profesionalismo y encanto, una combinación perfecta.",
        "El Combo Premium es un sueño hecho realidad.",
        "Su carisma es inigualable, te hace sentir especial.",
        "¡5 estrellas! No hay nadie como ella.",
        "Una experiencia que vale cada centavo.",
        "Simplemente espectacular, superó mis expectativas.",
        "Cada encuentro es una obra de arte, pura pasión.",
        "La mejor inversión en placer y compañía.",
        "Un oasis de elegancia en la ciudad.",
        "Su sonrisa ilumina cualquier habitación.",
        "Una conexión profunda que va más allá de lo físico."
    ];

    const negativeMessages = [
        "Esperaba más, el servicio fue un poco lento.",
        "No fue lo que prometía, un poco decepcionado.",
        "El lugar no era tan discreto como pensé.",
        "Podría mejorar la comunicación, a veces no respondía.",
        "El precio es un poco alto para lo que ofrece.",
        "No me sentí tan conectado como esperaba.",
        "Hubo un pequeño malentendido con el horario.",
        "No es para todos, quizás mis expectativas eran diferentes.",
        "La experiencia fue regular, nada del otro mundo.",
        "Necesita pulir algunos detalles del servicio.",
        "La espera fue un poco larga, pero valió la pena.",
        "El ambiente podría ser más íntimo.",
        "No hubo esa chispa que busco, pero fue correcto.",
        "Demasiado popular, difícil conseguir una cita.",
        "Me gustaría más opciones de planes personalizados."
    ];

    const usernames = ["ClienteVIP", "AnonimoBOG", "ExploradorNocturno", "CaballeroDiscreto", "AmanteDelLujo", "BogotaNights", "ElConocedor", "MisterX", "ViajeroExigente", "Disfrutador", "SeñorElegante", "NochePerfecta", "BuscadorDePlacer", "ConocedorDeBogota", "AmanteDeLaBelleza"];
    const userColors = ["#ff00ff", "#00ffff", "#ff9f0a", "#3a86ff", "#ff006e", "#8338ec", "#fb5607", "#ffbe0b", "#2ecc71", "#e74c3c", "#d4af37"];
    const donationAmounts = [20000, 50000, 100000, 200000, 500000];

    function addChatMessage() {
        const rand = Math.random();
        const heartIcon = '<svg class="chat-icon" viewBox="0 0 24 24" fill="#ff0055"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
        const champagneIcon = '<svg class="chat-icon" viewBox="0 0 24 24" fill="#ffd700"><path d="M11 20H6V22H18V20H13V15.93C15.82 15.46 18 13 18 10V3H6V10C6 13 8.18 15.46 11 15.93V20M8 5H16V10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10V5Z"/></svg>';

        const username = usernames[Math.floor(Math.random() * usernames.length)];
        const randomColor = userColors[Math.floor(Math.random() * userColors.length)];
        const timestamp = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
        const messageElement = document.createElement('div');

        // 20% de probabilidad de que sea una donación
        if (rand > 0.8) {
            const amount = donationAmounts[Math.floor(Math.random() * donationAmounts.length)];
            const formattedAmount = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount);
            
            messageElement.className = 'chat-message donation';
            messageElement.innerHTML = `
                ${champagneIcon} 
                <span class="username" style="color: ${randomColor}">${username}</span> 
                ha donado <span class="amount">${formattedAmount}</span>
                <span class="timestamp">${timestamp}</span>
            `;
        } else {
            // Mensaje normal
            const isPositive = rand > 0.3; // 70% positivos de la base restante
            const messageList = isPositive ? positiveMessages : negativeMessages;
            const message = messageList[Math.floor(Math.random() * messageList.length)];
            const typeClass = isPositive ? 'positive' : 'negative';

            messageElement.className = `chat-message ${typeClass}`;
            messageElement.innerHTML = `
                ${heartIcon}
                <span class="username" style="color: ${randomColor}">${username}:</span>
                <span>${message}</span>
                <span class="timestamp">${timestamp}</span>
            `;
        }

        chatContainer.appendChild(messageElement);

        // Auto-scroll al final para que siempre se vea el último mensaje
        chatContainer.scrollTop = chatContainer.scrollHeight;

        // Mantener solo los últimos 50 mensajes para no saturar el navegador
        if (chatContainer.children.length > 50) {
            chatContainer.removeChild(chatContainer.children[0]);
        }
    }

    // Generar mensajes cada 3 segundos (3000ms)
    if (chatIntervalId) clearInterval(chatIntervalId);
    chatIntervalId = setInterval(addChatMessage, 3000);
}

// Función para crear el efecto de partículas (Star Dust)
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    
    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Crear partículas iniciales
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random() * 0.8 + 0.2,
            velX: (Math.random() - 0.5) * 0.3
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#d4af37'; // Color dorado de Jessica Lorena

        particles.forEach(p => {
            ctx.globalAlpha = p.opacity;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            p.y += p.speed;
            p.x += p.velX;

            // Reposicionar partículas que salen por abajo
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Cerrar la página secreta y volver a la calculadora
function hideSecret() {
    document.getElementById("secret-page").classList.add("hidden");
    document.getElementById("calculator-screen").classList.remove("hidden");
    document.body.style.backgroundColor = ""; // Reset body color
    clearCalc(); // Limpiar la calculadora por seguridad
}

// Lógica para la confirmación de edad
function confirmAge() {
    const ageGate = document.getElementById('age-gate');
    ageGate.style.opacity = '0';
    setTimeout(() => ageGate.classList.add('hidden'), 500);
}

// Lógica del formulario de contacto
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Evita el envío tradicional del formulario

            formFeedback.textContent = 'Enviando mensaje...';
            formFeedback.className = 'form-feedback'; // Reinicia la clase para limpiar estados anteriores

            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value,
            };

            try {
                // IMPORTANTE: Para enviar el correo sin revelar la dirección de Jessica Lorena,
                // necesitas un SERVIDOR (backend) que reciba estos datos y envíe el email.
                // El código de abajo es un ejemplo de cómo tu JavaScript enviaría los datos
                // a un endpoint en tu servidor.
                //
                // Ejemplo de cómo se vería la llamada a tu backend (descomentar y adaptar):
                /*
                const response = await fetch('/send-email', { // Reemplaza '/send-email' con la URL de tu endpoint
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                const data = await response.json();
                if (data.success) { // Tu backend debería responder con { success: true } o { success: false, error: "..." }
                    formFeedback.textContent = '¡Mensaje enviado con éxito! Jessica Lorena se pondrá en contacto pronto.';
                    formFeedback.classList.add('success');
                    contactForm.reset(); // Limpia el formulario tras el éxito
                } else {
                    formFeedback.textContent = data.error || 'Error al enviar el mensaje. Por favor, inténtalo de nuevo más tarde.';
                    formFeedback.classList.add('error');
                }
                */

                // SIMULACIÓN (eliminar cuando tengas un backend real):
                await new Promise(resolve => setTimeout(resolve, 1500)); // Simula un retraso de red
                formFeedback.textContent = '¡Mensaje enviado con éxito! Jessica Lorena se pondrá en contacto pronto.';
                formFeedback.classList.add('success');
                contactForm.reset(); // Limpia el formulario

            } catch (error) {
                console.error('Error de conexión o del servidor:', error);
                formFeedback.textContent = 'Error de conexión. Por favor, verifica tu internet o inténtalo más tarde.';
                formFeedback.classList.add('error');
            }
        });
    }
});

const serviceDetails = {
    express: {
        title: "Cita Fugaz",
        items: ["Bienvenida con copa de cortesía", "Ducha compartida relajante", "Masaje sensitivo localizado", "Sesión de pasión intensa", "Discreción absoluta"]
    },
    premium: {
        title: "Deseo Extendido",
        items: ["Conversación cautivadora inicial", "Masaje tántrico de cuerpo completo", "Música ambiental a tu elección", "Múltiples sesiones de intimidad", "Atención a fantasías específicas", "Tiempo sin prisas ni relojes"]
    },
    vip: {
        title: "Idilio Nocturno",
        items: ["Cena romántica (opcional)", "Acompañamiento a eventos", "Noche completa de mimos y pasión", "Desayuno incluido", "Masajes de relajación profunda", "La experiencia más exclusiva de Bogotá"]
    }
};

function openServiceDetails(planId) {
    const plan = serviceDetails[planId];
    document.getElementById('detail-title').innerText = plan.title;
    const list = document.getElementById('experience-list');
    list.innerHTML = plan.items.map(item => `<li><svg class="chat-icon" viewBox="0 0 24 24" fill="#ff0055"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> ${item}</li>`).join('');
    document.getElementById('service-modal').classList.remove('hidden');
}

function closeServiceModal() { document.getElementById('service-modal').classList.add('hidden'); }
function openPaymentModal() { 
    closeServiceModal();
    document.getElementById('payment-modal').classList.remove('hidden'); 
}
function closePaymentModal() { document.getElementById('payment-modal').classList.add('hidden'); }

function processSimulatedPayment(method) {
    alert(`Procesando pago seguro vía ${method}...\n\nRedirigiendo a la pasarela de encriptación bancaria de Jessica Lorena.`);
    closePaymentModal();
}
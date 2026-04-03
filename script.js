let intervalo; // Variable para controlar el cronómetro

function calcularCumple() {
    // Detener cualquier cronómetro previo si el usuario cambia la fecha
    if (intervalo) clearInterval(intervalo);

    const nombre = document.getElementById('nombre').value.trim();
    const fechaInput = document.getElementById('fechaNacimiento').value;
    const resultadoDiv = document.getElementById('resultado');

    if (!nombre || !fechaInput) {
        resultadoDiv.innerHTML = "<p style='color:yellow;'>⚠️ ERROR: INGRESA TU NOMBRE Y FECHA.</p>";
        return;
    }

    // Función que se ejecuta cada segundo
    intervalo = setInterval(() => {
        // 1. HORA ACTUAL VENEZUELA (UTC-4)
        const ahoraLocal = new Date();
        const offsetVzla = -4; 
        const ahoraVzla = new Date(ahoraLocal.getTime() + (ahoraLocal.getTimezoneOffset() * 60000) + (offsetVzla * 3600000));

        // 2. CONFIGURAR PRÓXIMO CUMPLE
        const nacimiento = new Date(fechaInput + "T00:00:00");
        let proximo = new Date(ahoraVzla.getFullYear(), nacimiento.getMonth(), nacimiento.getDate(), 0, 0, 0);

        if (ahoraVzla > proximo) {
            proximo.setFullYear(ahoraVzla.getFullYear() + 1);
        }

        // 3. DIFERENCIA TOTAL
        let diffMs = proximo - ahoraVzla;
        
        if (diffMs <= 0) {
            resultadoDiv.innerHTML = `<h1 class="congrats-title">¡FELIZ CUMPLEAÑOS ${nombre.toUpperCase()}! 🎂</h1>`;
            clearInterval(intervalo);
            return;
        }

        // Cálculos
        const msPorHora = 1000 * 60 * 60;
        const msPorDia = msPorHora * 24;
        const msPorMin = 1000 * 60;

        let diasTotales = Math.floor(diffMs / msPorDia);
        let horas = Math.floor((diffMs % msPorDia) / msPorHora);
        let minutos = Math.floor((diffMs % msPorHora) / msPorMin);
        let segundos = Math.floor((diffMs % msPorMin) / 1000);

        // Edad
        const edadSiguiente = proximo.getFullYear() - nacimiento.getFullYear();

        // 4. RENDERIZAR (Diseño de Ansiedad)
        resultadoDiv.innerHTML = `
            <p>EL TIEMPO SE AGOTA PARA TUS <span style="color:red;">${edadSiguiente} AÑOS</span>:</p>
            <div class="time-blocks">
                <div class="time-block">
                    <span class="time-value">${diasTotales}</span>
                    <span class="time-label">Días</span>
                </div>
                <div class="time-block">
                    <span class="time-value">${horas}</span>
                    <span class="time-label">Hrs</span>
                </div>
                <div class="time-block">
                    <span class="time-value">${minutos}</span>
                    <span class="time-label">Min</span>
                </div>
                <div class="time-block">
                    <span class="time-value">${segundos}</span>
                    <span class="time-label">Seg</span>
                </div>
            </div>
            ${edadSiguiente === 18 ? '<div class="adult-message">⚠️ ADVERTENCIA: ADULTEZ INMINENTE.</div>' : ''}
            <img src="imagen.webp" alt="EL TIEMPO VUELA" class="birthday-image">
        `;
    }, 1000); // 1000 milisegundos = 1 segundo
}
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('multiplicativoForm');
    const inputP = document.getElementById('P');
    const inputK = document.getElementById('k');
    const inputX0 = document.getElementById('X0');
    const inputDecimales = document.getElementById('decimales');
    const resultados = document.getElementById('resultados');
    const mensajeDegeneracion = document.getElementById('mensajeDegeneracion');
    const btnFormula1 = document.getElementById('formula1');
    const btnFormula2 = document.getElementById('formula2');
    const calculoM = document.getElementById('calculoM');
    let a; // Variable para 'a'
    let m; // Variable para 'm'

    // Calculo de g y m cuando cambia el valor de P
    inputP.addEventListener('input', function() {
        const P = parseInt(inputP.value);
        const calculoG = document.getElementById('calculoG');

        if (!isNaN(P) && P > 0) {
            const g = (Math.log(P) / Math.log(2)) + 2;
            m = Math.pow(2, Math.floor(g));
            calculoG.textContent = `g = (Ln(${P})/Ln(2)) + 2 = ${g.toFixed(2)}`;
            calculoM.textContent = `m = 2^g = 2^${Math.floor(g)} = ${m}`;
        } else {
            calculoG.textContent = 'g = (Ln(P)/Ln(2)) + 2';
            calculoM.textContent = 'm = 2^g';
        }
    });

    // Cálculo de a cuando cambia el valor de k
    function calcularA() {
        const k = parseInt(inputK.value);
        const calculoA = document.getElementById('calculoA');

        if (!isNaN(k) && k > 0) {
            if (btnFormula1.classList.contains('active')) {
                a = 3 + 8 * k;
                calculoA.textContent = `a = 3 + 8 * ${k} = ${a}`;
            } else if (btnFormula2.classList.contains('active')) {
                a = 5 + 8 * k;
                calculoA.textContent = `a = 5 + 8 * ${k} = ${a}`;
            }
        } else {
            calculoA.textContent = 'a = 3 + 8k o a = 5 + 8k';
        }
    }

    // Eventos para botones de fórmula
    btnFormula1.addEventListener('click', function() {
        btnFormula1.classList.add('active');
        btnFormula2.classList.remove('active');
        calcularA();
    });

    btnFormula2.addEventListener('click', function() {
        btnFormula2.classList.add('active');
        btnFormula1.classList.remove('active');
        calcularA();
    });

    // Generar números aleatorios cuando se envíe el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        resultados.innerHTML = ''; // Limpiar resultados previos
        mensajeDegeneracion.textContent = ''; // Limpiar mensaje de degeneración

        const X0 = parseInt(inputX0.value);
        const decimales = parseInt(inputDecimales.value);
        const limite = m; // Límite de números a generar

        if (isNaN(X0) || X0 <= 0 || isNaN(decimales) || decimales <= 0) {
            mensajeDegeneracion.textContent = 'Por favor, ingresa valores válidos.';
            return;
        }

        let X = X0;
        let generados = new Map(); // Mapa para detectar degeneración
        let degeneracionDetectada = false;
        let posicionDegeneracion = -1;
        let riPrimeraDegeneracion = '';
        let iPrimeraDegeneracion = -1;

        for (let i = 1; i <= limite; i++) {
            let nuevoX = (a * X) % m;
            let ri = (nuevoX / (m - 1)).toFixed(decimales);

            // Detección de degeneración
            if (generados.has(ri)) {
                if (posicionDegeneracion === -1) {
                    posicionDegeneracion = i;
                    iPrimeraDegeneracion = generados.get(ri);
                    riPrimeraDegeneracion = ri;
                    mensajeDegeneracion.innerHTML = `La secuencia se degenera desde la posición ${i}, i=${iPrimeraDegeneracion}; ri=${riPrimeraDegeneracion} igual a i=${i}; ri=${ri}`;
                    mensajeDegeneracion.style.color = 'red';
                }
            } else {
                generados.set(ri, i);
            }

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${i}</td>
                <td>${a} * ${X} % ${m}</td>
                <td>${nuevoX}</td>
                <td>${ri}</td>
            `;
            resultados.appendChild(fila);

            // Actualizar X para la siguiente iteración
            X = nuevoX;
        }

        // Si no se detecta degeneración
        if (posicionDegeneracion === -1) {
            mensajeDegeneracion.textContent = 'La secuencia no se degenera.';
        }
    });
});
// Alghorithm: Lineal Congruential Generator
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('linealForm');
    const inputK = document.getElementById('k');
    const inputG = document.getElementById('g');
    const inputC = document.getElementById('c');
    const resultados = document.getElementById('resultados');
    const mensajeDegeneracion = document.getElementById('mensajeDegeneracion');

    // Calcula 'a' cuando cambia el valor de 'k'
    inputK.addEventListener('input', function() {
        const k = parseInt(inputK.value);
        const calculoA = document.getElementById('calculoA');

        if (!isNaN(k)) {
            const a = 1 + 4 * k;
            calculoA.textContent = `a = 1 + 4 * ${k} = ${a}`;
        } else {
            calculoA.textContent = 'a = 1 + 4 * k = (resultado)';
        }
    });

    // Calcula 'm' cuando cambia el valor de 'g'
    inputG.addEventListener('input', function() {
        const g = parseInt(inputG.value);
        const calculoM = document.getElementById('calculoM');

        if (!isNaN(g)) {
            const m = Math.pow(2, g);
            calculoM.textContent = `m = 2^${g} = ${m}`;
        } else {
            calculoM.textContent = 'm = 2^g = (resultado)';
        }
    });

    // Valida si 'c' es un número primo
    inputC.addEventListener('input', function() {
        const c = parseInt(inputC.value);
        const feedback = inputC.nextElementSibling;

        if (isNaN(c) || c < 2 || !esPrimo(c)) {
            inputC.classList.add('is-invalid');
            feedback.textContent = 'Por favor ingresa un número primo.';
        } else {
            inputC.classList.remove('is-invalid');
            feedback.textContent = 'Por favor ingresa un número entero positivo.';
        }
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        resultados.innerHTML = ''; // Limpiar resultados anteriores
        mensajeDegeneracion.textContent = '';

        const X0 = parseInt(document.getElementById('X0').value);
        const k = parseInt(inputK.value);
        const g = parseInt(inputG.value);
        const c = parseInt(inputC.value);
        const decimales = parseInt(document.getElementById('decimales').value);

        if (isNaN(X0) || isNaN(k) || isNaN(g) || isNaN(c) || isNaN(decimales) || inputC.classList.contains('is-invalid')) {
            alert('Por favor, ingresa todos los campos correctamente.');
            return;
        }

        const a = 1 + 4 * k;
        const m = Math.pow(2, g);
        let xi = X0;

        for (let i = 1; i <= m; i++) { // Limite de iteraciones
            const operacion = `(${a} * ${xi} + ${c}) mod(${m})`;
            const resultadoOperacion = (a * xi + c) % m; // Calcula el resultado de la operación
            const ri = (resultadoOperacion / (m - 1)).toFixed(decimales); // Calcula ri

            // Crear fila en la tabla
            const fila = document.createElement('tr');
            fila.innerHTML = `<td>${i}</td><td>${operacion}</td><td>${resultadoOperacion}</td><td>${ri}</td>`;
            resultados.appendChild(fila);

            // Actualizar xi para la siguiente iteración
            xi = resultadoOperacion;
        }
    });

    function esPrimo(numero) {
        if (numero <= 1) return false;
        for (let i = 2; i <= Math.sqrt(numero); i++) {
            if (numero % i === 0) return false;
        }
        return true;
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('linealForm');
    const inputK = document.getElementById('k');
    const inputP = document.getElementById('P');
    const inputC = document.getElementById('c');
    const inputX0 = document.getElementById('X0');
    const resultados = document.getElementById('resultados');
    const mensajeDegeneracion = document.getElementById('mensajeDegeneracion');
    const mensajeError = document.getElementById('mensajeError'); // Referencia al mensaje de error

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

    // Calcula 'g' cuando cambia el valor de 'P'
    inputP.addEventListener('input', function() {
        const P = parseInt(inputP.value);
        const calculoG = document.getElementById('calculoG');

        if (!isNaN(P) && P > 0) {
            const g = Math.floor((Math.log(P) / Math.log(2)));
            calculoG.textContent = `g = (Ln(${P})/Ln(2)) = ${g}`;

            // Calcula 'm' con el nuevo valor de 'g'
            const calculoM = document.getElementById('calculoM');
            const m = Math.pow(2, g);
            calculoM.textContent = `m = 2^${g} = ${m}`;
        } else {
            calculoG.textContent = 'g = (Ln(P)/Ln(2)) + 2';
            document.getElementById('calculoM').textContent = 'm = 2^g = (resultado)';
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
        mensajeError.style.display = 'none'; // Ocultar mensaje de error

        const X0 = parseInt(inputX0.value);
        const P = parseInt(inputP.value);
        const k = parseInt(inputK.value);
        const c = parseInt(inputC.value);
        const decimales = parseInt(document.getElementById('decimales').value);

        if (isNaN(X0) || isNaN(P) || isNaN(k) || isNaN(c) || isNaN(decimales) || inputC.classList.contains('is-invalid')) {
            mensajeError.textContent = 'Por favor, ingresa todos los campos correctamente.';
            mensajeError.style.display = 'block'; // Mostrar mensaje de error
            return;
        }

        const g = Math.floor((Math.log(P) / Math.log(2)));
        const a = 1 + 4 * k;
        const m = Math.pow(2, g);
        let xi = X0;
        const limite = P + 1; // Límite ajustado a P + 1

        for (let i = 0; i < limite; i++) { // Cambiar límite de iteraciones
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
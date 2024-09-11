document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('linealForm');
    const inputP = document.getElementById('P');
    const inputX0 = document.getElementById('X0');
    const inputk = document.getElementById('k'); // Corregido de 'inputK' a 'inputk'
    const inputC = document.getElementById('c');
    const inputDecimales = document.getElementById('decimales');
    const resultados = document.getElementById('resultados');
    const mensajeDegeneracion = document.getElementById('mensajeDegeneracion');
    const calculoG = document.getElementById('calculoG');
    const calculoM = document.getElementById('calculoM');
    const calculoA = document.getElementById('calculoA'); // Añadido para mostrar el cálculo de 'a'

    // Calcula 'g' y 'm' cuando cambia el valor de 'P'
    inputP.addEventListener('input', function() {
        const P = parseInt(inputP.value);
        if (!isNaN(P) && P > 0) {
            const g = (Math.log(P) / Math.log(2));
            const m = Math.pow(2, Math.floor(g));
            calculoG.textContent = `g = (Ln(${P})/Ln(2)) = ${g.toFixed(2)}`;
            calculoM.textContent = `m = 2^${Math.floor(g)} = ${m}`;
        } else {
            calculoG.textContent = 'g = (Ln(P)/Ln(2))';
            calculoM.textContent = 'm = 2^g = (resultado)';
        }
    });

    // Calcula 'a' cuando cambia el valor de 'k'
    inputk.addEventListener('input', function() { // Corregido de 'inputK' a 'inputk'
        const k = parseInt(inputk.value);
        if (!isNaN(k) && k > 0) {
            const a = 1 + 4 * k;
            calculoA.textContent = `a = 1 + 4 * ${k} = ${a}`;
        } else {
            calculoA.textContent = 'a = 1 + 4 * k';
        }
    });

    // Valida si 'c' es un número entero positivo y primo
    inputC.addEventListener('input', function() {
        const c = parseInt(inputC.value);
        const formGroup = inputC.closest('.form-group'); // Encuentra el contenedor más cercano con la clase 'form-group'
        const feedback = formGroup.querySelector('.invalid-feedback'); // Selecciona el feedback dentro del contenedor
    
        if (isNaN(c) || c <= 0) {
            inputC.classList.add('is-invalid');
            feedback.textContent = 'Por favor ingresa un número entero positivo.';
        } else if (!esPrimo(c)) {
            inputC.classList.add('is-invalid');
            feedback.textContent = 'El número debe ser primo.';
        } else {
            inputC.classList.remove('is-invalid');
            feedback.textContent = '';
        }
    });
    

    // Maneja el envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        resultados.innerHTML = ''; // Limpiar resultados anteriores
        mensajeDegeneracion.textContent = '';

        const X0 = parseInt(inputX0.value);
        const P = parseInt(inputP.value);
        const c = parseInt(inputC.value);
        const decimales = parseInt(inputDecimales.value);

        if (isNaN(X0) || isNaN(P) || isNaN(c) || isNaN(decimales) || inputC.classList.contains('is-invalid')) {
            alert('Por favor, ingresa todos los campos correctamente.');
            return;
        }

        const g = (Math.log(P) / Math.log(2));
        const m = Math.pow(2, Math.floor(g));
        const a = 1 + 4 * parseInt(inputk.value); // Corrección para usar el valor de 'k'
        
        let xi = X0;

        for (let i = 1; i <= m; i++) { // Limite de iteraciones
            const resultadoOperacion = (a * xi + c) % m; // Calcula el resultado de la operación
            const ri = (resultadoOperacion / (m - 1)).toFixed(decimales); // Calcula ri

            // Crear fila en la tabla
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${i}</td>
                <td>${a} * ${xi} + ${c} = ${resultadoOperacion} mod ${m}</td>
                <td>${resultadoOperacion}</td>
                <td>${ri}</td>
            `;
            resultados.appendChild(fila);

            // Actualizar xi para la siguiente iteración
            xi = resultadoOperacion;
        }
    });

    // Función para verificar si un número es primo
    function esPrimo(numero) {
        if (numero <= 1) return false;
        if (numero <= 3) return true;
        if (numero % 2 === 0 || numero % 3 === 0) return false;
        for (let i = 5; i * i <= numero; i += 6) {
            if (numero % i === 0 || numero % (i + 2) === 0) return false;
        }
        return true;
    }
});

// Algorithm: Cuadrado Medio
document.getElementById('cuadradoMedioForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = '';
    
    const mensajeDegeneracion = document.getElementById('mensajeDegeneracion');
    mensajeDegeneracion.textContent = '';
    
    let semilla = document.getElementById('semilla').value;
    const limite = document.getElementById('limite').value;
    const decimales = document.getElementById('decimales').value;
    const n = semilla.length; // Número de dígitos de la semilla
    const generados = new Map(); // Mapa para detectar la primera ocurrencia de cada ri
    let posicionDegeneracion = -1; // Variable para la posición de degeneración
    let i = 1; // Contador para la posición
    let riPrimeraDegeneracion = ''; // Para almacenar el ri cuando se detecta degeneración
    let iPrimeraDegeneracion = -1; // Para almacenar la posición de la primera degeneración

    while (i <= limite) {
        let operacion = (semilla ** 2).toString();

        if (operacion.length % 2 !== 0 && n % 2 === 0) {
            operacion = operacion.padStart(operacion.length + 1, '0');
        }
        
        const digitosMedios = Math.floor(operacion.length / 2) - Math.floor(n / 2);
        const xi = operacion.substring(digitosMedios, digitosMedios + n);
        
        // Ajustar el número de decimales en ri
        const ri = (parseInt(xi) / (10 ** n)).toFixed(decimales);
        
        if (generados.has(ri)) {
            if (posicionDegeneracion === -1) {
                posicionDegeneracion = i;
                iPrimeraDegeneracion = generados.get(ri); // Obtener la posición original donde se encontró el ri
                riPrimeraDegeneracion = ri; // Guardar el valor actual de ri en la posición de degeneración
                mensajeDegeneracion.innerHTML = `La secuencia se degenera desde la posición ${i}, i=${iPrimeraDegeneracion}; ri=${riPrimeraDegeneracion} igual a i=${i}; ri=${ri}`;
                mensajeDegeneracion.style.color = 'red';
            }
        } else {
            generados.set(ri, i);
        }
        
        const row = `<tr>
                        <td>${i}</td>
                        <td>${semilla}</td>
                        <td>${semilla}² = ${operacion}</td>
                        <td>${xi}</td>
                        <td>${ri}</td>
                    </tr>`;
        resultados.insertAdjacentHTML('beforeend', row);
        
        semilla = xi;
        i++;
    }
    
    if (posicionDegeneracion === -1) {
        mensajeDegeneracion.textContent = 'La secuencia no se degenera.';
    }
});

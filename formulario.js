document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            const form = new FormData(this);
            const response = fetch(this.action, {
                method: this.method,
                body: form,
                headers: {
                    'Accept': 'application/json'
                }
         })
         .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error en la respuesta del servidor');
            }
        })
        .then(data => {
            console.log('Formulario enviado con éxito:', data);
            alert('Formulario enviado con éxito');
            // Aquí puedes agregar lógica adicional para manejar la respuesta
        })
        .catch(error => {
            console.error('Error al enviar el formulario:', error);
        });    
      });
    }
});
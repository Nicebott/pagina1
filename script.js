document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Añadir un evento 'keyup' al elemento 'searchInput'
    searchInput.addEventListener('keyup', (event) => {
        // Verificar si la tecla presionada es 'Enter'
        if (event.key === 'Enter') {
            // Llamar a la función que realiza la búsqueda
            search();
        }
    });

    searchButton.addEventListener('click', search);

    function search() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const gameTitles = document.querySelectorAll('.game-title');
        const faqQuestions = document.querySelectorAll('.faq-item h2');

        for (let i = 0; i < gameTitles.length; i++) {
            const gameTitle = gameTitles[i];
            const gameTitleText = gameTitle.textContent.trim().toLowerCase();

            if (gameTitleText.includes(searchTerm)) {
                gameTitle.parentElement.style.display = 'block';
            } else {
                gameTitle.parentElement.style.display = 'none';
            }
        }

        for (let i = 0; i < faqQuestions.length; i++) {
            const faqQuestion = faqQuestions[i];
            const faqQuestionText = faqQuestion.textContent.trim().toLowerCase();

            if (faqQuestionText.includes(searchTerm)) {
                faqQuestion.parentElement.style.display = 'block';
            } else {
                faqQuestion.parentElement.style.display = 'none';
            }
        }
    }
});
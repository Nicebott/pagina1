const resultsPerPage = 10;
let currentPage = 1;
const data = [
    {nrc: 10002, subject: "Principios De Administración (ADM-1120)", professor: "Blas Acevedo", schedule: "09AM a 12M", province: "Santo Domingo", modality: "Presencial", rating: 9},
    {nrc: 10009, subject: "Principios De Administración (ADM-1120)", professor: "Richard Garcia Amaro", schedule: "7PM a 10PM", province: "Santo Domingo", modality: "Presencial", rating: 7},
    {nrc: 10013, subject: "Principios De Administración (ADM-1120)", professor: "Elizabeth Trinidad Garcia", schedule: "3PM a 6PM", province: "Santo Domingo", modality: "Presencial", rating: 10},
    {nrc: 10014, subject: "Principios De Administración (ADM-1120)", professor: "Henry Medina Jones", schedule: "10AM a 1PM", province: "Santo Domingo", modality: "Presencial", rating: 4.5},
    {nrc: 10015, subject: "Principios De Administración (ADM-1120)", professor: "Carmen Herrera", schedule: "2PM a 3PM", province: "Santo Domingo", modality: "Virtual", rating: null},
    {nrc: 20300, subject: "Física Básica (FIS-0180)", professor: "Norma Febrillet Rodriguez", schedule: "MI 10AM a 1PM", province: "Santo Domingo", modality: "Presencial", rating: 10}
    // Agregar más datos aquí
];

let filteredData = [...data];

function displayResults(page) {
    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    const results = filteredData.slice(start, end);
    
    const resultsTable = document.getElementById('results');
    resultsTable.innerHTML = '';

    results.forEach(result => {
        const row = document.createElement('tr');
        
        const nrcCell = document.createElement('td');
        nrcCell.textContent = result.nrc;
        row.appendChild(nrcCell);
        
        const subjectCell = document.createElement('td');
        subjectCell.textContent = result.subject;
        row.appendChild(subjectCell);

        const professorCell = document.createElement('td');
        professorCell.textContent = result.professor;
        row.appendChild(professorCell);

        const scheduleCell = document.createElement('td');
        scheduleCell.textContent = result.schedule;
        row.appendChild(scheduleCell);
        
        const modalityCell = document.createElement('td');
        modalityCell.classList.add('modalidad');
        modalityCell.textContent = result.modality;
        row.appendChild(modalityCell);

        const ratingCell = document.createElement('td');
        if (result.rating !== null) {
            ratingCell.textContent = result.rating + "/10";
            ratingCell.classList.add(result.rating > 7 ? 'high-rating' : 'low-rating');
        } else {
            ratingCell.textContent = "N/A";
        }
        row.appendChild(ratingCell);
        
        resultsTable.appendChild(row);
    });
}

function updatePagination() {
    const pageNumbers = document.getElementById('page-numbers');
    pageNumbers.textContent = `Página ${currentPage} de ${Math.ceil(filteredData.length / resultsPerPage)}`;
}

function nextPage() {
    if (currentPage * resultsPerPage < filteredData.length) {
        currentPage++;
        displayResults(currentPage);
        updatePagination();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        displayResults(currentPage);
        updatePagination();
    }
}

function search() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    filteredData = data.filter(item => item.subject.toLowerCase().includes(searchTerm) || item.professor.toLowerCase().includes(searchTerm) || item.subject.toLowerCase().replace(/[\s-()]/g, '').includes(searchTerm));
    currentPage = 1;
    displayResults(currentPage);
    updatePagination();
}

function filterByProvince() {
    const selectedProvince = document.getElementById('province').value;
    if (selectedProvince) {
        filteredData = data.filter(item => item.province === selectedProvince);
    } else {
        filteredData = [...data];
    }
    currentPage = 1;
    displayResults(currentPage);
    updatePagination();
}

// Agregar el evento de tecla Enter
document.getElementById('search').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

// Inicializar la primera página
displayResults(currentPage);
updatePagination();
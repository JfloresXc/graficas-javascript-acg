const buttonData = document.getElementById("buttonData");
const containerCanva = document.querySelector(".container-canva");

const backgroundColor = [
	"rgba(255, 99, 132, 0.2)",
	"rgba(54, 162, 235, 0.2)",
	"rgba(255, 206, 86, 0.2)",
	"rgba(75, 192, 192, 0.2)",
	"rgba(153, 102, 255, 0.2)",
	"rgba(255, 159, 64, 0.2)",
];

const borderColor = [
	"rgba(255, 99, 132, 1)",
	"rgba(54, 162, 235, 1)",
	"rgba(255, 206, 86, 1)",
	"rgba(75, 192, 192, 1)",
	"rgba(153, 102, 255, 1)",
	"rgba(255, 159, 64, 1)",
];

const addCanva = ({
	labels = [],
	title = "Not title",
	data = [],
	canvasHTMLElement,
	type = "bar",
}) => {
	new Chart(
		{ canvas: canvasHTMLElement },
		{
			type,
			data: {
				labels,
				datasets: [
					{
						label: title,
						data,
						backgroundColor,
						borderColor,
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		}
	);
};

const addCanvaPie = ({
	title = "Not title",
	data = [],
	canvasHTMLElement,
	labels = [],
}) => {
	new Chart(
		{ canvas: canvasHTMLElement },
		{
			type: "pie",
			data: {
				labels,
				datasets: [
					{
						label: "Dataset 1",
						data,
						backgroundColor,
					},
				],
			},
			options: {
				responsive: true,
				plugins: {
					legend: {
						position: "top",
					},
					title: {
						display: true,
						text: title,
					},
				},
			},
		}
	);
};

let datos = [];

buttonData.addEventListener("click", () => {
	fetch("http://localhost:3003/data", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then(({ data = [] }) => {
			const edades = data.map((alumno) => alumno.edad);
			const labels = data.map(
				(alumno) =>
					`${alumno.nombres} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`
			);

			const element = document.createElement("canvas");
			element.setAttribute("id", "myChart");
			element.setAttribute("class", "grafico-barras");
			element.classList.add("grafico-barras__show");

			containerCanva.innerHTML = "";
			containerCanva.appendChild(element);

			const element2 = document.createElement("canvas");
			element2.setAttribute("id", "myChart2");
			element2.setAttribute("class", "grafico-barras");
			element2.classList.add("grafico-barras__show");

			containerCanva.appendChild(element2);

			addCanva({
				title: "Edades de Alumnos Ingenieria de Sistemas 2019-II",
				data: edades,
				labels,
				canvasHTMLElement: element,
			});

			addCanvaPie({
				title: "Edades de Alumnos Ingenieria de Sistemas 2019-II",
				data: edades,
				canvasHTMLElement: element2,
				labels,
			});
		});
});

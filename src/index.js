const express = require("express");
const path = require("path");
const XLSX = require("xlsx");
const app = express();

// Settings
app.set("PORT", process.env.PORT || 3003);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// XLSX
const getDataExcel = () => {
	const workbook = XLSX.readFile(path.join(__dirname, "data.xlsx"));
	const workbookSheets = workbook.SheetNames;
	const sheet = workbookSheets[0];
	const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
	return dataExcel;
};

console.log(getDataExcel());

// Routes
app.get("/data", (req, res) => {
	res.json({ data: getDataExcel() });
});

// Statics
app.use(express.static(path.join(__dirname, "public")));

// Listening
app.listen(app.get("PORT"), () => {
	console.log("Server on port " + app.get("PORT"));
});

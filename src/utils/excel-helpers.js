import * as FileSaver from 'file-saver';
import XLSX from 'xlsx';

const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const fileExtension = '.xlsx';

/**
 * Export data to Excel format.
 * @param {Object} param0 - Object containing data and fileName.
 * @param {Array} param0.data - Data to be exported.
 * @param {string} param0.fileName - Name of the exported file.
 */
export const exportToExcel = async ({ data, fileName }) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = { Sheets: { [fileName]: ws }, SheetNames: [fileName] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob_data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(blob_data, fileName + fileExtension)
}

/**
 * Import data from Excel file.
 * @param {Object} param0 - Object containing fileName.
 * @param {string} param0.fileName - Name of the Excel file to import.
 */
export const importFromExcel = async ({ fileName }) => {
    const ws = XLSX.utils.sheet_to_json(fileName);
    const wb = { Sheets: { 'data': ws }, SheetNames: ["data"] }
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob_data = new Blob([excelBuffer], { type: fileType })
    FileSaver.saveAs(blob_data, fileName + fileExtension)
}

/**
 * Process Excel file callback.
 * @param {Event} event - Event object containing the file data.
 * @returns {Array} Data extracted from the Excel file.
 */
export const processExcelCallback = async (event) => {
    const wb = XLSX.read(event.target.result);
    const sheets = wb.SheetNames;
    if (sheets.length > 0) {
        const data = XLSX.utils.sheet_to_json(wb.Sheets[sheets[0]])
        return data;
    }
}

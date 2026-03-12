import * as xlsx from 'xlsx';

console.log('has readFile:', 'readFile' in xlsx);
if ('readFile' in xlsx) {
    console.log('readFile type:', typeof (xlsx as any).readFile);
} else {
    // try importing default
    console.log('default has readFile:', 'readFile' in (xlsx as any).default);
}


const filedata = require('./data.json');
var fs = require('fs');

function saveDataFile () {
  fs.writeFile('data.json', JSON.stringify(filedata, null, 2), 'utf8', (err) => {
    if (err) throw err;
  });
}

function readNotes() {
  for (const value in filedata.notes) {
    console.log(`${value}: ${filedata.notes[value]}`);
  }
}

function createNotes() {
  filedata.notes[filedata.nextId] = process.argv[3];
  filedata.nextId += 1;
  saveDataFile();
}

function deleteNote(){
  for (const value in filedata.notes) {
    if (value === process.argv[3]) {
      delete filedata.notes[value];
      break;
    }
  }
  saveDataFile();
}

function updateNote() {
  for (const value in filedata.notes) {
    if (value === process.argv[3]) {
      filedata.notes[value] = process.argv[4];
    }
  }
  saveDataFile();
}


if (process.argv[2] === 'create') {
  createNotes();
} else if (process.argv[2] === 'read') {
  readNotes();
} else if (process.argv[2] === 'update') {
  updateNote();
} else if (process.argv[2] === 'delete') {
  deleteNote();
}

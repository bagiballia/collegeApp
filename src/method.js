const fs = require('fs');

const getStudent = function (fileName) {
  const studentData = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(studentData);
};

const studentsRegistration = function (studentsList, student, fileName) {
  studentsList.push(student);
  const data = JSON.stringify(studentsList);
  fs.writeFileSync(fileName, data, 'utf8');
  return 'Successfully Registered';
};

const outputText = function (data) {
  const [id, name, father, standard, mobile] = data;
  return `id: ${id}; name: ${name}; father: ${father}; standard: ${standard}; mobile: ${mobile}`;
};
const findIndex = function (filterBy) {
  const headerData = ['--id', '--name', '--father', '--standard', '--mobile'];
  return headerData.indexOf(filterBy);
};

const filter = function (array, filterBy) {
  const index = findIndex(filterBy[0]);
  const string = filterBy[1];
  const newArray = [];
  for (let i in array) {
    if (array[i][index] == string) {
      newArray.push(array[i]);
    }
  }
  return newArray;
};
const queryStudent = function (studentsList, data) {
  const result = filter(studentsList, data);
  if (result.length == 0) {
    return 'No Records Found';
  }
  let output = '';
  for (let i in result) {
    output = output + outputText(result[i]) + '\n';
  }
  return output;
};

const lookUp = function (array, string) {
  const index = array.lastIndexOf(string);
  return array[index + 1];
};

const parseData = function (data) {
  const name = lookUp(data, '--name');
  const father = lookUp(data, '--father');
  const standard = lookUp(data, '--standard');
  const mobile = lookUp(data, '--mobile');
  return [name, father, standard, mobile];
};

const getStudentId = function (studentsList) {
  if (studentsList.length == 0) {
    return 1;
  }
  const lastStudent = studentsList[studentsList.length - 1];
  const id = lastStudent[0];
  return id + 1;
};

const registerNewStudent = function (studentsList, data, fileName) {
  const studentData = parseData(data);
  const studentId = getStudentId(studentsList);
  studentData.unshift(studentId);
  const status = studentsRegistration(studentsList, studentData, fileName);
  return status + '\n' + outputText(studentData);
};

const doAction = function (cmdArgs, fileName, studentsList) {
  const [action, ...data] = cmdArgs;
  let output = 'Invalid Command';
  if (action == '--registered' && data.length > 7) {
    output = registerNewStudent(studentsList, data, fileName);
  }
  if (action == '--query') {
    output = queryStudent(studentsList, data);
  }
  return output;
};

module.exports = {
  getStudent,
  studentsRegistration,
  outputText,
  getStudentId,
  parseData,
  registerNewStudent,
  doAction,
  queryStudent,
};

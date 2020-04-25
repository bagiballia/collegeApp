const {doAction, getStudent} = require('./src/method.js');

const main = function () {
  const [, , cmdArgs] = process.argv;
  const fileName = 'students.json';
  const studentsList = getStudent(fileName);
  const output = doAction(cmdArgs, fileName, studentsList);
  console.log(output);
};

main();

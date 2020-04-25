const assert = require('assert');

const {
  getStudent,
  studentsRegistration,
  outputText,
  parseData,
  getStudentId,
  registerNewStudent,
  doAction,
  queryStudent,
} = require('../src/method.js');

describe('doAction', function () {
  it('Should act according to given action', function () {
    const data = [
      '--registered',
      '--name',
      'Aditi',
      '--father',
      'Dilip',
      '--standard',
      'b.tech',
      '--mobile',
      '7380573832',
    ];
    const studentsList = getStudent('./test/dummyData.json');
    const actual = doAction(data, './test/wDummyData.json', studentsList);
    const expected =
      'Successfully Registered\nid: 2; name: Aditi; father: Dilip; standard: b.tech; mobile: 7380573832';
    assert.strictEqual(actual, expected);
  });

  it('Should give the data of the given id', function () {
    const data = ['--query', '--id', 1];
    const studentsList = getStudent('./test/dummyData.json');
    const actual = doAction(data, './test/dummyData.json', studentsList);
    const expected =
      'id: 1; name: Shivi; father: Ajay; standard: bca; mobile: 7905177031\n';
    assert.strictEqual(actual, expected);
  });

  it('Should give No Records Found', function () {
    const data = ['--query', '--id', 2];
    const actual = doAction(data, './test/wDummyData.json', []);
    assert.strictEqual(actual, 'No Records Found');
  });
});

describe('getStudent', function () {
  it('Should give the student name within an Array', function () {
    const actual = getStudent('./test/dummyData.json');
    const expected = [[1, 'Shivi', 'Ajay', 'bca', '7905177031']];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('studentsRegistration', function () {
  it('Should successfully registered the student data', function () {
    const student = [1, 'aadii', 'dilip', '9', '7355214312'];
    const actual = studentsRegistration([], student, './test/wDummyData.json');
    const expected = 'Successfully Registered';
    assert.strictEqual(actual, expected);
  });
});

describe('outputText', function () {
  it('Should give the output text of a student', function () {
    const student = [1, 'Aditi Gupta', 'Dilip Gupta', 'b.tech', '7380573832'];
    const actual = outputText(student);
    const expected =
      'id: 1; name: Aditi Gupta; father: Dilip Gupta; standard: b.tech; mobile: 7380573832';
    assert.strictEqual(actual, expected);
  });
});

describe('parseData', function () {
  it('Should parse the data of the student', function () {
    const rawData = [
      '--name',
      'Aditi',
      '--father',
      'Dilip',
      '--standard',
      'b.tech',
      '--mobile',
      '7380573832',
    ];
    const actual = parseData(rawData);
    const expected = ['Aditi', 'Dilip', 'b.tech', '7380573832'];
    assert.deepStrictEqual(actual, expected);
  });
  it('Should parse the data of the student', function () {
    const rawData = [
      '--standard',
      'b.tech',
      '--name',
      'Aditi',
      '--mobile',
      '7380573832',
      '--father',
      'Dilip',
    ];
    const actual = parseData(rawData);
    const expected = ['Aditi', 'Dilip', 'b.tech', '7380573832'];
    assert.deepStrictEqual(actual, expected);
  });
  it('Should parse the data of the student', function () {
    const rawData = [
      '--father',
      'Dilip',
      '--name',
      'Aditi',
      '--mobile',
      '7380573832',
      '--standard',
      'b.tech',
    ];
    const actual = parseData(rawData);
    const expected = ['Aditi', 'Dilip', 'b.tech', '7380573832'];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('queryStudent', function () {
  it('Should give the data of the given id', function () {
    const studentList = [[1, 'aadii', 'Dilip', '9', '7355214312']];
    const actual = queryStudent(studentList, ['--id', 1]);
    const expected =
      'id: 1; name: aadii; father: Dilip; standard: 9; mobile: 7355214312\n';
    assert.strictEqual(actual, expected);
  });

  it('Should give no record found when the id is out of box', function () {
    const studentList = [[1, 'aadii', 'Dilip', '9', '7355214312']];
    const actual = queryStudent(studentList, ['--id', 2]);
    const expected = 'No Records Found';
    assert.strictEqual(actual, expected);
  });
});

describe('getStudentId', function () {
  it('Should return unique id to each student', function () {
    const studentsList = [[1, 'aadii', 'dilip', '9', '7355214312']];
    const actual = getStudentId(studentsList);
    assert.strictEqual(actual, 2);
  });

  it('Should add a unique id to each student', function () {
    const actual = getStudentId([]);
    assert.strictEqual(actual, 1);
  });
});

describe('registerNewStudent', function () {
  it('Should register new Students', function () {
    const data = [
      '--name',
      'Aditi',
      '--father',
      'Dilip',
      '--standard',
      'b.tech',
      '--mobile',
      '7380573832',
    ];
    const actual = registerNewStudent([], data, './test/wDummyData.json');
    const expected =
      'Successfully Registered\nid: 1; name: Aditi; father: Dilip; standard: b.tech; mobile: 7380573832';
    assert.strictEqual(actual, expected);
  });
});

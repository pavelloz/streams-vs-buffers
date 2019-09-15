#!/usr/bin/env node

const fs = require('fs');
const faker = require('faker');

// faker.seed(Math.random() * 10000); // To randomize data generation.
faker.seed(1337); // To test consistently on similar dataset (it will vary slightly because of randomizations in row logic).

const rowsNumber = 100000;

const f = faker;
const rows = [];

for (let i = 0; i < rowsNumber; i++) {
  const row = `
    ${f.name.lastName()}|
    ${f.name.lastName()}|
    ${Math.random() < 0.85 ? f.internet.email() : ''}|
    ${Math.random() < 0.45 ? f.internet.userName() : ''}|
    ${Math.random() < 0.75 ? f.phone.phoneNumber() : ''}|
    ${f.hacker.phrase()}|
    ${f.address.country()}|
    ${Math.random() < 0.65 ? f.address.city() : ''}|
    ${f.name.jobTitle()}|
    ${f.company.companyName()}|
    ${f.company.catchPhrase()}|
    ${Math.random() < 0.55 ? f.lorem.paragraphs(3) : ''}|
    ${Math.random() < 0.75 ? f.lorem.sentence() : ''}|
    ${Math.random() < 0.85 ? f.lorem.paragraph() : ''}|
    `.replace(/\n\s+/g, '');
  rows.push(row);
};

fs.writeFileSync(__dirname + '/data.csv', rows.join('\n'));

console.log('Data generated to data.csv');
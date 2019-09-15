#!/usr/bin/env node

const fs = require('fs');
const highland = require('highland');

const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log('Operation completed after: ', list.getEntries()[0].duration.toFixed(2), 'ms');
  performance.clearMarks();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });

performance.mark('Start');

const output = fs.createWriteStream(__dirname + '/outputStreams.csv');

const data = highland(fs.createReadStream(__dirname + '/data.csv', 'utf8'))
  .split()
  .map(row => row.split('|'))
  .filter(row => row[2])
  .filter(row => row[4])
  .map(row => {
    const formattedPhone = row[4].replace(/[\sx()-.]/g, '');
    row[4] = formattedPhone;
    const outputRow = row.join();
    return `${outputRow.slice(0, outputRow.length - 1)}\n`;
  })
  .pipe(output);

output.on('finish', () => {
  const used = process.memoryUsage().heapUsed / 1024 / 1024;

  console.log('Memory used: ', parseInt(used, 10), 'MB');

  performance.mark('End');
  performance.measure('Completed', 'Start', 'End');
});

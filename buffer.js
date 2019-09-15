#!/usr/bin/env node

const fs = require('fs');
const { performance, PerformanceObserver } = require('perf_hooks');

const obs = new PerformanceObserver((list, observer) => {
  console.log('Operation completed after: ', list.getEntries()[0].duration.toFixed(2), 'ms');
  performance.clearMarks();
  observer.disconnect();
});
obs.observe({ entryTypes: ['measure'], buffered: true });



performance.mark('Start');

const data = fs.readFileSync(__dirname + '/data.csv', 'utf8').split('\n');

// console.log('Rows before filtering:\t', data.length);

const output = data
  .map(d => d.split('|'))
  .filter(row => row[2])
  .filter(row => row[4])
  .map(row => {
    const formattedPhone = row[4].replace(/[\sx()-.]/g, '');
    row[4] = formattedPhone;
    return row;
  });

// console.log('Rows after filtering:\t', output.length);

fs.writeFileSync(__dirname + '/outputBuffer.csv', output.join('\n'));

performance.mark('End');

performance.measure('Completed', 'Start', 'End');

# Experiment

Do following operations on a given csv dataset:

1. Filter OUT people without email (field #3)
2. Filter OUT people without phone number (field #5)
3. Remove any spaces, x, (, ), - from phone number (field #5)

## Why?

Because we live in an era where FaaS (function as a service) like AWS Lambda is getting more and more powerful, but at the same time has its own limitations, like memory. Sometimes FaaS is ideal to do some operations and sometimes those operations involve big files (ie. log parsing, archiving). Knowing how to operate on those files in an efficient manner might make or break possibility of using the best tool for the job. 

## Input

* Faker seed: 1337
* Rows: 1000000
* Data size: 775264070 bytes (739MB)

## Buffers

1. Load everything to memory
2. Perform operations
3. Write to output file

Output size: 496410002 bytes (473MB)

| Execution time (ms) | Memory used (MB) |
| ------------------- | ---------------- |
| 7600                | 2086             |

## Streams

1. Stream file to highland
2. Perform operations
3. Pipe to the output file

Output size: 495772785 bytes (473MB)

| Execution time (ms) | Memory used (MB) |
| ------------------- | ---------------- |
| 5800                | 12               |

## Conclusion

It looks like when dealing with big files streams are more efficient, especially in the memory department.

## Notes

I didnt manage to find any difference between the output files even though file sizes are different.

## Reproduce

If you want to reproduce the experiment:

    npm ci                  # install dependencies

    npm run generate-data   # settings: 1m of rows, 1337 seed

    npm run experiment      # run experiments
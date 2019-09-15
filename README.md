# Experiment

Do following operations on a given csv dataset:

1. Filter OUT people without email (field #3)
2. Filter OUT people without phone number (field #5)
3. Remove any spaces, x, (, ), - from phone number (field #5)

## Input

* Faker seed: 1337
* Rows: 1000000
* Data size: 775264070 (739MB)

## Buffers

1. Load everything to memory
2. Perform operations
3. Write to output file

Output size: 496410002 (473MB)

| Execution time (ms) | Memory used (MB) |
| ------------------- | ---------------- |
| 7600                | 2086             |

## Streams

1. Stream file to highland
2. Perform operations
3. Pipe to the output file

Output size: 495772785 (473MB)

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
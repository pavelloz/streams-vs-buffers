# Experiment

Do following operations on a given csv dataset:

1) Filter OUT people without email (field #3)
2) Filter OUT people without phone number (field #5)
3) Remove any spaces, x, (, ), - from phone number (field #5)

## Buffers

1) Load everything to memory
2) Perform operations
3) Save to output file

## Streams

1) Stream file to highland
2) Perform operations
3) Pass through to the output file

## Results

Faker seed: 1337
Rows: 100000
Data size: 74MB

MD5 (data.csv) = af217391cd2b2eea9d0522eb12d80f74

### Buffers solution 1
Output size: 47MB
MD5 (outputBuffer.csv) = 560bb135928ed170fa5dd9c026a47641

import pandas as pd
import tensorflow as tf
import tfds


ds = tfds.load('tensorflow_dataset', split='train', shuffle_files=True)
inputs = []
targets = []
for data in ds.take(1):
    input, target = data["input"], data["target"]
    inputs.append(input)
    targets.append(targets)

name_dict = dict(inputs, targets)

df = pd.DataFrame(name_dict)

print(df)

header = ["inputs", "targets"]

df.to_csv('output.csv', columns=header, index=False)

csv = pd.read_csv("output.csv").values
with tf.io.TFRecordWriter("pegasus/data/testdata/test_pattern.tfrecords") as writer:
    for row in csv:
        inputs, targets = row[:-1], row[-1]
        example = tf.train.Example(
            features=tf.train.Features(
                feature={
                    "inputs": tf.train.Feature(bytes_list=tf.train.BytesList(value=[inputs[0].encode('utf-8')])),
                    "targets": tf.train.Feature(bytes_list=tf.train.BytesList(value=[targets.encode('utf-8')])),
                }
            )
        )
        writer.write(example.SerializeToString())
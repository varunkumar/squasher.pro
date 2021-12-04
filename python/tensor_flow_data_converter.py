import itertools
import os
import time

from absl import logging
from pegasus.data import infeed
from pegasus.params import all_params  # pylint: disable=unused-import
from pegasus.params import estimator_utils
from pegasus.params import registry
import tensorflow as tf
from pegasus.eval import text_eval
from pegasus.ops import public_parsing_ops
import csv

tf.enable_eager_execution()

tfds = open("tensor_flow_dataset", "w")



master = ""
model_dir = "./ckpt/pegasus_ckpt/cnn_dailymail"
use_tpu = False
iterations_per_loop = 1000
num_shards = 1
param_overrides = "vocab_filename=ckpt/pegasus_ckpt/c4.unigram.newline.10pct.96000.model,batch_size=1,beam_size=5,beam_alpha=0.6"


eval_dir = os.path.dirname(model_dir)
checkpoint_path = model_dir
checkpoint_path = tf.train.latest_checkpoint(checkpoint_path )
params = registry.get_params('cnn_dailymail_transformer')(param_overrides)
pattern = params.dev_pattern
input_fn = infeed.get_input_fn(params.parser, pattern,
                                     tf.estimator.ModeKeys.PREDICT)
parser, shapes = params.parser(mode=tf.estimator.ModeKeys.PREDICT)


estimator = estimator_utils.create_estimator(master, 
                                             model_dir,
                                             use_tpu,
                                             iterations_per_loop,
                                             num_shards, params)

_SPM_VOCAB = 'ckpt/pegasus_ckpt/c4.unigram.newline.10pct.96000.model'
encoder = public_parsing_ops.create_text_encoder("sentencepiece", 
                                                     _SPM_VOCAB)

file = open('feedback_dataset.csv')
csvreader = csv.reader(file)

def input_function(params, input_text, target):
    dataset = tf.data.Dataset.from_tensor_slices({"inputs":[input_text, input_text],"targets":[target, target]}).map(parser)
    dataset = dataset.unbatch()
    dataset = dataset.padded_batch(
        params["batch_size"],
        padded_shapes=shapes,
        drop_remainder=True)
    return dataset

rows = []
for row in csvreader:
        rows.append(row)
        input_text = row["content"]
        target = row["suggested_summary"]
        predictions = estimator.predict(
                input_fn=input_function, checkpoint_path=checkpoint_path)

        for i in predictions:
            print(text_eval.ids2str(encoder, i['outputs'], None))
            writer = tf.data.experimental.TFRecordWriter('mydata.tfrecord')
            writer.write(text_eval.ids2str(encoder, i['outputs'], None))
            break

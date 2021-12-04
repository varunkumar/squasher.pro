Download TFDS CLI

cd path/to/my/project/datasets/
tfds new summary_dataset  # Create `summary_dataset/summary_dataset.py`

cd summary_dataset/
tfds build  # Download and prepare the dataset to `~/tensorflow_datasets/`


Register in /pegasus/params/public_params.py using
@registry.register("new_params")
def my_param(param_overrides):
  return public_params.transformer_params(
      {
          "train_pattern": "tfds:new_tfds_dataset,train",
          "dev_pattern": "tfds:new_tfds_dataset,validation",
          "test_pattern": "tfrecord:new_dataset_files.tfrecord*",
          "max_input_len": 512,
          "max_output_len": 128,
          "train_steps": 10000,
          "learning_rate": 0.0001,
          "batch_size": 8,
      }, param_overrides)


To fine tune model with new dataset:

python3 pegasus/bin/train.py --params=summary_transformer \
--param_overrides=vocab_filename=ckpt/pegasus_ckpt/c4.unigram.newline.10pct.96000.model \
--train_init_checkpoint=ckpt/pegasus_ckpt/model.ckpt-1500000 \
--model_dir=ckpt/pegasus_ckpt/summary_transformer


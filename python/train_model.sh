python3 pegasus/bin/train.py --params=summary_feedback_transformer \
--param_overrides=vocab_filename=ckpt/pegasus_ckpt/c4.unigram.newline.10pct.96000.model \
--train_init_checkpoint=ckpt/pegasus_ckpt/model.ckpt-1500000 \ --model_dir=ckpt/pegasus_ckpt/summary_feedback
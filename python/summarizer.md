**The Summarization models used by Squasher.Pro**

Squasher.Pro is powered by
* OpenAi
* BERT
* GPT-2
* XLNet


**OpenAI**

A general artificial intelligence running based on the GPT-3 model. Visit : [OpenAI](https://openai.com/ "Open AI") to know more.

**BERT**

Uses extractive strategies are set up as binary classification problems that select the top N sentences that best represent the key points of the article. \
Extractive text summarization requires the model to “understand” the complete text, pick out the right keywords and assemble these keywords to make sense. \
In the case of BERT, the words in a sentence are masked and used to train models to predict the masked words. A similar strategy is then used for inference to summarize data.


**GPT-2**

Uses abstractive summarization is the technique of generating a summary of a text from its main ideas, not by copying verbatim most salient sentences from text. \
Abstractive summaries need to identify the key points and then add a generative element. \
It does this using transformer models (A transformer is a deep learning model that adopts the mechanism of self-attention, differentially weighting the significance of each part of the input data.)

Encoder-Decoder Architecture  (Recurrent Neural Networks (RNNs), i.e. Gated Recurrent Neural Network (GRU) or Long Short Term Memory (LSTM))

    -> Training:
		1) An Encoder Long Short Term Memory model (LSTM) reads the entire input sequence wherein, at each timestep, one word is fed into the encoder. It then processes the information at every timestep and captures the contextual information present in the input sequence.
		2) The decoder is also an LSTM network which reads the entire target sequence word-by-word and predicts the same sequence offset by one timestep. The decoder is trained to predict the next word in the sequence given the previous word.

	-> Inference:
		1) Encode the entire input sequence and initialize the decoder with internal states of the encoder
		2) The decoder then tries to predict the word of the next timestamp and the word with the highest probability is selected.


**XLNet**

XLNet is similar to BERT but uses autoregressive language modeling that can help overcome the problems with corruption of data by masking. It uses segment-level recurrence mechanism and a novel positional encoding scheme. It also uses transformer model , and so is a mix of bert and gpt.


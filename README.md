**Squasher.Pro**

A summarization suite that allows you to summarize mails, wikis, slackthreads, etc. into concise, easy to digest content so you can free yourself from information overload.

**Tools currently supported:** \
Slack threads \
Wiki \
DESFlow \
Outlook mails

**SLACK:** \
We have a slack bot that can receive a POST request that contains a payload which holds information about the message, the thread it belongs to, and the owner of the message.
We can use that to retrieve the other contents of the thread and define a conversation. This input is given to the models to create a summary, which is then sent to the thread as a message that is only visible to the user invoking the thread.

**CHROME EXTENSION** \
#enter chrome extension details here.

**OUTLOOK PLUGIN** \
#enter outlook plugin details here.


**TECHNICAL DETAILS**

We are using 4 different models for abstractive text summarization 
1) GPT3 
2) BERT 
3) GPT2 
4) XLNet 

Summarization strategies are typically categorized as extractive, abstractive or mixed.

BERT: \
Extractive strategies are set up as binary classification problems that select the top N sentences that best represent the key points of the article. \
Extractive text summarization requires the model to “understand” the complete text, pick out the right keywords and assemble these keywords to make sense. \
In the case of BERT, the words in a sentence are masked and used to train models to predict the masked words. A similar strategy is then used for inference to summarize data.

GPT models: \
Abstractive summarization is the technique of generating a summary of a text from its main ideas, not by copying verbatim most salient sentences from text. \
Abstractive summaries need to identify the key points and then add a generative element. \
It does this using transformer models (A transformer is a deep learning model that adopts the mechanism of self-attention, differentially weighting the significance of each part of the input data.) \
Encoder-Decoder Architecture  (Recurrent Neural Networks (RNNs), i.e. Gated Recurrent Neural Network (GRU) or Long Short Term Memory (LSTM)) \
	-> Training: \
		1) An Encoder Long Short Term Memory model (LSTM) reads the entire input sequence wherein, at each timestep, one word is fed into the encoder. It then processes the information at every timestep and captures the contextual information present in the input sequence. \
		2) The decoder is also an LSTM network which reads the entire target sequence word-by-word and predicts the same sequence offset by one timestep. The decoder is trained to predict the next word in the sequence given the previous word. 
	-> Inference: \
		1) Encode the entire input sequence and initialize the decoder with internal states of the encoder \
		2) The decoder then tries to predict the word of the next timestamp and the word with the highest probability is selected. 

XLNet \
XLNet is similar to BERT but uses autoregressive language modeling that can help overcome the problems with corruption of data by masking. It uses segment-level recurrence mechanism and a novel positional encoding scheme. It also uses transformer model , and so is a mix of bert and gpt.


**Dependencies to install**

pip install slackclient \
pip install python-dotenv \
pip install flask \
pip install slackeventsapi \
pip install openapi \
pip install torch \
pip install transformers==4.12.5 \
pip install bert-extractive-summarizer \
pip install spacy==2.0.12 \
pip install sentencepiece 


**To run ngrok** \
ngrok http 5000

Useful links \
https://api.slack.com/interactivity/shortcuts/using \
https://api.slack.com/messaging/retrieving#pulling_threads

**Further details** \
Slack: \
Create an app \
    -> Go to interactivity and shortcuts on the right \
    -> create a shortcuts \
    -> Need to add permissions under OAuth and permissions \
        -> commands \
        -> channels:history \
        -> chat:write \
        -> conversations.connect:read \
        -> groups:history \
        -> im:history \
        -> users.profile:read


A summarization suite that allows you to summarize mails, wikis, slackthreads, etc. into concise, easy to digest content so you can free yourself from information overload.

**Tools currently supported:** \
Slack threads \
Wiki \
DESFlow \
Outlook mails

**SLACK:** \
We have a slack bot that can receive a POST request that contains a payload which holds information about the message, the thread it belongs to, and the owner of the message.
We can use that to retrieve the other contents of the thread and define a conversation. This input is given to the models to create a summary, which is then sent to the thread as a message that is only visible to the user invoking the thread.

**CHROME EXTENSION** \
#enter chrome extension details here.

**OUTLOOK PLUGIN** \
#enter outlook plugin details here.


**TECHNICAL DETAILS**

We are using 4 different models for abstractive text summarization 
1) GPT3 
2) BERT 
3) GPT2 
4) XLNet 



**Dependencies to install**

pip install slackclient \
pip install python-dotenv \
pip install flask \
pip install slackeventsapi \
pip install openapi \
pip install torch \
pip install transformers==4.12.5 \
pip install bert-extractive-summarizer \
pip install spacy==2.0.12 \
pip install sentencepiece 


**To run ngrok** \
ngrok http 5000

Useful links \
https://api.slack.com/interactivity/shortcuts/using \
https://api.slack.com/messaging/retrieving#pulling_threads

**Further details** \
Slack: \
Create an app \
    -> Go to interactivity and shortcuts on the right \
    -> create a shortcuts \
    -> Need to add permissions under OAuth and permissions \
        -> commands \
        -> channels:history \
        -> chat:write \
        -> conversations.connect:read \
        -> groups:history \
        -> im:history 

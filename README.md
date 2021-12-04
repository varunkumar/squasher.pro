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

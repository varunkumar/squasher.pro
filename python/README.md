**SLACK:**

Squasher.Pro slackbot is designed as a message shortcut that can be used to summarize threads in groups where the slackbot is installed. \
The slackbot retrieves the entire conversation from the thread, and generates a summary out of it using the summarizer service. This summary is then written back to the thread but is only visible to the user invoking the shortcut.



Dependencies to install:

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




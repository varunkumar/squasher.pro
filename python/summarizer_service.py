from abc import ABC, abstractmethod
from typing import Counter
from summarizer import Summarizer,TransformerSummarizer
import random
import openai
import logging
from dataclasses import dataclass
import os
from dotenv import load_dotenv
from pathlib import Path

logging.basicConfig(filename="logs/summarizer_service.log",
                    format='%(asctime)s %(message)s',
                    filemode='w')
logger=logging.getLogger()
logger.setLevel(logging.DEBUG)
env_path = Path(".") / ".env"
load_dotenv(dotenv_path=env_path)
openai.api_key = os.environ['OPEN_API_KEY']

class Engine(ABC):

        @abstractmethod
        def summarize(self, content, summary_lines, header_message):
            pass



class Bert(Engine):

        def summarize(self, content, summary_lines, header_message = ""):
                logger.info("Summarization using bert model")
                logger.info("Input: %s" % content)
                bert_model = TransformerSummarizer()
                bert_summary = ''.join(bert_model(content, min_length=60))
                response = SummaryReport(bert_summary, "Bert", "")
                logger.info("Summary is: %s" % bert_summary)
                return response


class Gpt2(Engine):

        def summarize(self, content, summary_lines, header_message = ""):
                logger.info("Summarization using Gpt2 model")
                logger.info("Input: %s" % content)
                gpt2_model = TransformerSummarizer(transformer_type="GPT2",transformer_model_key="gpt2-medium")
                gpt2_summary = ''.join(gpt2_model(content, min_length=60))
                response = SummaryReport(gpt2_summary, "GPT2", "")
                logger.info("Summary is: %s" % gpt2_summary)
                return response

class XLNet(Engine):

        def summarize(self, content, summary_lines, header_message = ""):
                logger.info("Summarization using XLNet model")
                logger.info("Input: %s" % content)
                model = TransformerSummarizer(transformer_type="XLNet",transformer_model_key="xlnet-base-cased")
                xl_net_summary = ''.join(model(content, min_length=60))
                response = SummaryReport(xl_net_summary, "XLNet", "")
                logger.info("Summary is: %s" % xl_net_summary)
                return response

class OpenAi(Engine):

        def summarize(self, content, summary_lines, header_message = ""):
            data = f"""
                    {header_message}

                    {content}

                    Summarize the above text into {summary_lines} lines
                """
            logger.info("Requesting OpenAI for summarization of data %s" % data)
            response = openai.Completion.create(
                    engine="davinci-instruct-beta",
                    prompt=data,
                    temperature=0.7,
                    max_tokens=64,
                    top_p=1.0,
                    frequency_penalty=0.0,
                    presence_penalty=0.0,
            )
            summary = response.choices[0].text
            logger.info("Summary response is: %s"% summary)
            response = SummaryReport(summary, "OpenAI", "")
            return response



def get_engine(engine_name):
        if engine_name == "Bert":
            return Bert()
        elif engine_name == "Gpt2":
            return Gpt2()
        elif engine_name == "XLNet":
            return XLNet()
        elif engine_name == "OpenAi":
            return OpenAi()
        else:
            raise ValueError(engine_name + " does not exist")

def get_random_engine():
        print("Choosing a random engine")
        engine_id = random.choice([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 21, 13, 19, 102, 69, 11, 12, 15, 16, 17, 18, 19, 20])
        if engine_id % 4 == 0:
            return Bert()
        elif engine_id % 4 == 1:
            return Gpt2()
        elif engine_id % 4 == 2:
            return XLNet()
        elif engine_id % 4 == 3:
            return OpenAi()



def get_summary(content, summary_lines, header_message = "", engine_preference = ""):
        if not engine_preference:
            engine = get_random_engine()
            return engine.summarize(content, summary_lines, header_message)
        else:
            engine = get_engine(engine_preference)
            return engine.summarize(content, summary_lines, header_message)


def suggest_reply_to_conversation(content, suggestion):
        data = f"""
                    Below is a conversation:

                    {content}

                    {suggestion}
                """
        logger.info("Requesting OpenAI for suggest a reply for the conversation %s" % data)
        response = openai.Completion.create(
                    engine="davinci-instruct-beta",
                    prompt=data,
                    temperature=0.7,
                    max_tokens=64,
                    top_p=1.0,
                    frequency_penalty=0.0,
                    presence_penalty=0.0,
            )
        suggestion = response.choices[0].text
        logger.info("Suggested response is: %s" % suggestion)
        return suggestion


@dataclass
class SummaryReport:
        summary: str
        engine: str
        metrics: str

        def json_response(self) -> dict:
            return  {'summary': self.summary, 'engine': self.engine, 'metrics': self.metrics}

        def get_summary(self) -> str:
            return self.summary

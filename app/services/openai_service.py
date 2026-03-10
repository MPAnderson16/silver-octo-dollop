import os

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()  # load .env into os.environ


def get_openai_client() -> OpenAI:
    """Create and return a configured OpenAI client."""

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError(
            "OPENAI_API_KEY is not set. Add it to .env or your environment variables."
        )

    return OpenAI(api_key=api_key)


def create_chat_response(message: str, model: str = "gpt-4.1-mini") -> str:
    """Send a user message to OpenAI and return the text reply."""

    client = get_openai_client()
    response = client.responses.create(model=model, input=message)

    # The Responses API may return a list of output items; grab the text
    if hasattr(response, "output") and response.output:
        # response.output is typically a list of {"type": "output_text", "text": "..."}
        for item in response.output:
            if item.get("type") == "output_text" and item.get("text"):
                return item["text"]

    # Fallback to output_text or output_text field, depending on SDK version
    if hasattr(response, "output_text") and response.output_text:
        return response.output_text

    return ""

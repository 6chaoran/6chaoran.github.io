---
title: "DSPy, Meet Enterprise: Plugging in an Internal LLM Endpoint"
date: 2026-06-23
toc: true
toc_sticky: true
categories:
- guide
- LLM
excerpt: "DSPy is powerful, but many enterprise environments can’t call public LLM endpoints directly. This guide shows a minimal, practical way to plug an internal (non-standard) LLM service into DSPy by writing a custom `dspy.BaseLM` adapter."
--- 

## Motivation

Most hosted LLM APIs aren’t usable in enterprise settings. Common constraints include:

- **Self-hosted models** (on‑prem or private cloud)
- **Additional authentication** (SSO, API gateway, custom headers)
- **Network restrictions** that block outbound traffic to public endpoints

Frameworks like **DSPy** often assume you can call OpenAI/Anthropic-compatible APIs directly. DSPy’s guide on [connecting to a language model](https://dspy.ai/getting-started/installation/#connecting-to-a-language-model) explains the basics, but it doesn’t cover integrating a custom internal LLM service.

Below is a minimal “adapter” approach: implement a **custom LLM class** so DSPy can talk to your internal endpoint.

## Step 1 — Create a custom LLM class

Implement a subclass of `dspy.BaseLM` that:

- accepts a custom model identifier (e.g., `provider/model`)
- builds the request payload (prompt/messages, params, model name, etc.)
- attaches auth headers/tokens
- calls the internal HTTP endpoint
- parses the response into the format DSPy expects

```python
# uv add dspy==3.2.1

import dspy

class MyCustomLLM(dspy.BaseLM):
    forward_contract = "legacy"

    def __init__(self, model: str, **kwargs):
        super().__init__(model=model, **kwargs)

        # Example convention: "provider/model_id"
        self.provider, self.model_id = model.split("/")

        # Example compatibility patch:
        # some backends (e.g., "gpt-5.4" series) use max_completion_tokens
        kwargs["max_completion_tokens"] = kwargs.pop("max_tokens", 1000)

        self.kwargs = kwargs
```

## Step 2 — Implement `forward()` and `aforward()`

`forward()` is where the inference call happens. It should:

- accept a `prompt` or chat `messages` (plus DSPy generation settings via `**kwargs`)
- call your internal LLM service (HTTP/gRPC/etc.)
- return an OpenAI-style compatible response object (or whatever your DSPy version expects)

You will often also want an async version, `aforward()`, to maximize throughput when your backend supports concurrency.

---

```python
import dspy
import openai

class MyCustomLLM(dspy.BaseLM):
    forward_contract = "legacy"

    def __init__(self, model: str, **kwargs):
        super().__init__(model=model, **kwargs)
        self.provider, self.model_id = model.split("/")
        kwargs["max_completion_tokens"] = kwargs.pop("max_tokens", 1000)
        self.kwargs = kwargs

    def forward(
        self,
        prompt: str | None = None,
        messages: list[dict] | None = None,
        **kwargs
    ):
        messages = messages or [{"role": "user", "content": prompt}]

        # Example implementation using OpenAI client.
        # Replace this with your internal LLM backend logic.
        client = openai.OpenAI()
        response = client.chat.completions.create(
            model=self.model_id,
            messages=messages,
            **self.kwargs,
            **kwargs,
        )
        return response

    async def aforward(
        self,
        prompt: str | None = None,
        messages: list[dict] | None = None,
        **kwargs
    ):
        messages = messages or [{"role": "user", "content": prompt}]

        # Example implementation using AsyncOpenAI client.
        # Replace this with your internal LLM backend logic.
        aclient = openai.AsyncOpenAI()
        response = await aclient.chat.completions.create(
            model=self.model_id,
            messages=messages,
            **self.kwargs,
            **kwargs,
        )
        return response
```

I used `gpt-5.4-nano` as a stand-in to demonstrate how an adapter might handle backend-specific parameter differences. In this example, DSPy passes `max_tokens`, but the `gpt-5.4` series expects `max_completion_tokens`, so we translate it in `__init__`. When integrating your own internal LLM service, you may need additional parameter mapping and response normalization.

## Step 3 — Quick test in DSPy

Once the custom LLM class is set up, you can test it with a simple predictor:

```python
my_custom_llm = MyCustomLLM(model="my_llm/gpt-5.4-nano")
predictor = dspy.Predict("q -> a")

with dspy.context(lm=my_custom_llm):
    print(predictor(q="Why did the chicken cross the kitchen?"))

with dspy.context(lm=my_custom_llm):
    print(await predictor.aforward(q="Why did the chicken cross the kitchen?"))

# Prediction(
#   a="It was trying to get to the other side of the pantry."
# )
```

If you’ve made it this far, you now have a working pattern for connecting DSPy to a custom/internal LLM service: wrap your backend behind a `dspy.BaseLM` adapter and translate parameters + responses as needed.
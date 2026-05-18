---
title: 'AI thinks fast, but can it think slow?'
description: 'LLMs, System 1 vs 2, and why extra reasoning steps are still mimicry.'
pubDate: '18 May 2026'
---

While writing this post, my brain is mostly using System 2. I am very conscious, focused, and careful of what I am phrasing. This is natural since this is not an intuitive activity; thus, my brain cannot use the automatic mode of System 1. But what if I asked an AI (i.e., an LLM) to write this post; which system does it use?

## System 1 and System 2
In his book [^1], Daniel Kahneman provides a framework for understanding human judgment and decision-making. He proposes that our minds operate using two distinct, interacting modes of thought: System 1 and System 2. System 1 is our brain's automatic, intuitive, and unconscious mode, while System 2 is our deliberate, analytical, and conscious mode of reasoning.

Routine activities like walking, drinking, or even speaking are generally handled by System 1. It is fast, effortless, and relies on mental shortcuts and past experiences. On the other hand, crossing a busy street, learning to ride a bike, or writing an article requires an effortful, logical, and conscious mode. This is where System 2 comes in; it is responsible for self-control, critical thinking, and verifying or overriding the impulsive suggestions made by System 1. While we do not necessarily notice it, both systems work together to allow us to perform tasks in a correct and efficient way.

## AI uses System 1 only
Fundamentally, standard LLMs operate by generating words (or tokens) one by one (autoregressively). These models are fast at predicting the most likely next word based on patterns learned during training. Token generation runs continuously until an end-of-sentence token is predicted, indicating to the model to stop because the "end of the sentence" is reached.

In other words, when you ask an LLM a question, it "speaks" its first instinct based on mathematical probabilities until stopping is the most appropriate thing to do. I think you see where I am going with this. Standard LLMs, at best, mirror human System 1 thinking.

## "But my model thinks and reasons before it answers"...
Well, as discussed before, LLMs in their essence do not really "think" or "reason". To fix this, some workarounds were developed to "force" LLMs to act like they have System 2. One way to do this is to prevent the LLM from stopping very early and pushing it to generate more "intermediate" tokens. This is like slowing down its "thinking", making it "reason", and pushing it to answer more carefully (i.e., Chain of Thought prompting).

Another way is to connect models to each other and provide them with external tools (i.e., agentic systems). These systems spend more time answering and have more tools to ensure better outcomes. Of course, it is worth pointing out that while such approaches have enhanced LLM performance, they have their serious limitations.

## So what? LLMs neither "think" nor "reason"?
My short answer is yes: they do not "think" or "reason", and they lack the basis of having System 2. Even with the workarounds, I argue that LLMs, at their best, attempt to mimic or simulate our System 2 thinking poorly.

<br><br>
**Resources:** <br>

[^1]: Kahneman, D. (2011). [Thinking, fast and slow. Farrar, Straus and Giroux](https://www.goodreads.com/book/show/11468377-thinking-fast-and-slow).

---
title: "AI hallucinates, but don't blame the temperature"
description: 'Temperature tunes randomness, not truth — and turning it down does not cure hallucination.'
pubDate: '21 Jul 2026'
---

There is a popular fix passed around online: if a chatbot is "making things up", just lower its "temperature". The name helps the story. High temperature sounds like a fever, and a fever brings hallucinated dreams. Cool the model down and it comes back to its senses. It is a neat metaphor... but is it right?

## What "temperature" actually is
At every step, a language model does not simply pick a word. It produces a probability distribution over all possible next tokens: this word 40%, that word 12%, and so on. Temperature is a single parameter that reshapes that distribution before a token is drawn from it[^1].

A low temperature sharpens the distribution: the most likely token becomes almost certain, and the model plays it safe. A high temperature flattens it: unlikely tokens get a real chance, and the output feels more "creative", surprising, or random[^2]. So temperature does not decide *what is true*; it only decides *how adventurous the model is* when sampling from what it already believes is likely.

## Turn it down to zero, and...
If temperature were the cause, then setting it to zero should end the problem. At (or near) zero, sampling becomes greedy and deterministic: the model always takes its single most likely token. No randomness left.

And yet, it still hallucinates. It will confidently state a wrong date, invent a citation that never existed, or describe a function that no library ever shipped, all while being perfectly deterministic. Lowering the temperature can reduce some of the unexpectde, wild predictions, but the calm, confident errors remain. That is the tell: temperature was never the root cause.

## So why does it hallucinate?
Because the model was never optimizing for truth in the first place. It is trained to predict plausible continuations of text, not to verify facts. "Sounds right" and "is right" usually overlap, so the illusion holds, until they don't. When the model reaches the edge of what it actually "knows", it does not fall silent; it fills the gap with the most likely-looking words[^3].

It gets worse. The way we train and grade these models often rewards a confident guess over an honest "I don't know". If a benchmark gives zero points for abstaining and a chance of points for guessing, then guessing is the winning strategy, and the model learns to do exactly that[^4]. We are, in a sense, teaching it to bluff.

## Temperature is a scapegoat
Temperature changes the flavor of the randomness; it does not change the model's relationship to truth. A model at zero temperature can still be confidently, deterministically wrong. Hallucination is not a thermostat we forgot to turn down. It is baked into how these systems are built, trained, and judged. Blaming the temperature is comforting, because a parameter is easy to modify. The real fix is much harder.

<br><br>
**Resources:** <br>

[^1]: Hinton, G., Vinyals, O., & Dean, J. (2015). [Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531). arXiv.
[^2]: Holtzman, A., Buys, J., Du, L., Forbes, M., & Choi, Y. (2020). [The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751). ICLR.
[^3]: Ji, Z., et al. (2023). [Survey of Hallucination in Natural Language Generation](https://doi.org/10.1145/3571730). ACM Computing Surveys, 55(12).
[^4]: Kalai, A. T., Nachum, O., Vempala, S. S., & Zhang, E. (2025). [Why Language Models Hallucinate](https://arxiv.org/abs/2509.04664). arXiv.

# AnimeGenBot

https://twitter.com/animegenbot_

https://github.com/jpanuncialman/animegenbot

#Screenshot

![](/twitter.jpg)


## Description

The AnimeGenBot Twitter Bot generates anime titles and descriptions, commenting on the similar machine-like ouput of anime every season and the surrounding consumerist culture. Utilizing a Markov chain algorithm, the bot takes titles and descriptions fed through a scraper (https://github.com/jpanuncialman/mal-scraper) and constructs new ones


## Technologies

- Node.js
- Libraries: Twit, Cheerio for scraper, Cheerio (for https://github.com/jpanuncialman/mal-scraper)


## Challenges/Future Plans
- At the moment, not all descriptions contain gramatically sound sentences. Increasing the Markov factor leads to descriptions that are not random enough. I plan to either adjust the Markov algorithm or look at libraries for validating grammar and punctuation placement.
- Future plans include support for Japanese text and image generation.






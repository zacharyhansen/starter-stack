Some notes

- columns are nullable by default so please include not nulalble for those few columns that need it
- use "string" for any column that is likely to be indexed (unique id's etc.) otherwise "text" is the way
- Public migrations run first and there can only be relations in the org schemas to the public tables and not the other way around
- You must drop relation tables first in down migrations

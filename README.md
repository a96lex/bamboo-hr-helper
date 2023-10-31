# BambooHR automatic time entry

![output](img/output.png)

This tool alows you to automatically clock-in and out during the current paying period (current month).

**Note**: we can't clock in-out for past paying periods (bamboohr rules)

## How it works

This tool will get your time entry data for the current period and perform a number of checks on every day:

- is it a public holiday?
- is it a personal day off?
- is it on a weekend?
- is it later than today?
- are there any existing time entries?

If all of this checks are false, it means we can add a time entry.

The software generates random start and end hours using `Math.random`. This times:

- start between 9:00 and 10:59
- end between 17:00 and 18:59

If used across all month, the average hours per day are 8, even though any given day can oscillate between 6 and 10 hours. Feel free to edit the randomizer algorithm so random times match your desired schedule better.

## Usage

### requirements

You will need to have deno installed. Check [this page](https://deno.land/manual@v1.29.1/getting_started/installation) for instructions.

### clone the repo

```
git clone https://github.com/a96lex/bamboo-hr-helper.git
```

or

```
git clone git@github.com:a96lex/bamboo-hr-helper.git
```

### environment variables

Create and fill a `.env` file, following the given `.env.example` file

To find the `.env` variables:

- bamboo_url. This is the companie's subdomain in bambooHR, you can get it from the browser. `https://example.bamboohr.com`
- Go to BambooHR and open the network tab.
- perform a POST request (for example, add a time entry)
- check the request headers. There you will find the `Cookie`, `X-CSRF-TOKEN` and `User-Agent` headers. Put the values in your `.env`
- check the request body. In there you will find the `employeeID` field. Put the value in your `.env`

![browser](img/browser.png)

**Note**: I do not know when do this variables expire. If something does not work, you may need to get them again.

### Configuration options

There are no configurations available from `.env` besides auth or server variables. However, you can go into the code and easily change a couple of things:

#### Change wait time between requestrs

In `index.js` you can comment the calls to `wait`. This will make it so all requests happen at the same time, instead of waiting a random amount of time between requests. I do not recommend this as it may trigger some kind of security measure.

You can also edit the time between requests if you want to. It is now set to 20-30 seconds.

#### Do not add time entries for today

In `helpers.js`, in the `parseDates` function, we check if the current day is greater than today. This makes it so we add a time entry for today, even though the day is not finished. You can easily avoid this by changing the `>` to `>=`.

#### Change the randomizer algorithm

This schedule is centered on starting around 9 ± 0.5 hours and ending around 18 ± 0.25 hours. You can change this by editing the `getRandomTime` function in `helpers.js`. Feel free to ask if something is not clear.

### running the software

from the root of the project, run:

```
deno run --allow-net --allow-read --allow-env index.js
```

That's it, enjoy your new free time!

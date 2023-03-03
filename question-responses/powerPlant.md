# Hisui's New Power Plant

The Galaxy Team has decided that in order to advance the research on Pokemon and the Pokedex, Jubilife village needs a brand new power plant. Luckily, Professor Laventon has discovered that the Pokemon, Voltorb, is the best candidate to help power the village.

Voltorbs can cleanly and efficiently produce electricity. An average Voltorb is about 0.5m (1'08") tall and weighs 10.4 kg (22.8lbs). However, they are uncommon and are only found in the Sacred Plaza.

Objective: How many Voltorbs will you need to catch to fully power the village. Describe each step in your thought process.

## Response

I started by defining the variable we ultimately want to discover:

`voltorbsRequired` = number of Voltorbs required to fully run Jubilife Village

First I found the daily energy requirement of Jubilife Village. The population of Jubilife Village is [124 people](https://aminoapps.com/c/pokemon/page/blog/capital-city-of-pokemon-regions/Jzhd_ul5a3W4YG5KrKP81PP02oPRVd#:~:text=The%20Capital%20City%20of%20Sinnoh,in%20Sinnoh%20behind%20Hearthome%20City.). Given that this is an urban area, I found a [real-life report](https://www.psoklahoma.com/lib/docs/company/about/PSOFactSheet2022v1.pdf) from a power company detailing the energy usage for 1,200,000 people across residential, commercial, and industrial areas. The total energy consumed in a year was 19,350,597 megawatt-hours (MWh). 9,458,482.5 megawatt-hours (MWh). I then calculated the average _daily_ use for 1,000,000 people by dividing that by 365.

If: `a / b = x / y`
Then: `a = x * b / y`
S: `oneYearEnergyForMillion = 1,000,000 * 19,350,597 MWh / 1,200,000 (= 16,125,597.5 MWh)`

`energyRequiredPerDay` = average energy required by Jubilife Village in one day
`oneDayEnergyForMillion = 16,125,597.5 MWh / 365 days (= 44,179.4452 MWh)`

Next we need to calculate the percent that 124 represents out of 1,000,000 and apply that to oneDayEnergyForMillion.

`energyRequiredPerDay = 124 * oneDayEnergyForMillion / 1,000,000 (= 5.4783 MWh)`

Next, I need a variable to represent each Voltorb’s energy production. I considered calculating the power produced by a bolt of lightning given that Voltrobs discharge electricity, but ultimately scrapped that as one bolt of lightning seems like it would be much more powerful than one Voltorb.

Finally, I decided to compare them to electric eels. The species that produces the strongest shock, [Electrophorus voltai](https://www.independent.co.uk/news/science/electric-eel-species-found-amazon-most-powerful-ever-voltage-kill-a9100581.html), produces up to 860 volts per discharge, at a current of 1 amp, for about .02 seconds.

`Power (watts) = volts * amps`
`eelEnergyPerSecond (watt-seconds) = 860V * 1A * .02 (= 17.2Ws)`

While this eel's mass is about [19.9581 kg](https://www.nytimes.com/2019/09/10/science/new-electric-eel-shock.html), Voltorb's is only 10.4kg, so let's apply that ratio to their power output:

`voltorbPower = 10.4 * 860 / 19.9581 (= 448.14W)`

Eels produce 17.2Ws of energy, and they can do this many times per second. After finding a video of [a voltorb discharging electricity](https://www.youtube.com/watch?v=WxDRRW5C9NE) from the Pokemon animé, it seems their discharges last about 1.5 seconds. This means one Voltorb's energy per second is:

`voltorbEnergyPerSecond (watt-seconds) = voltorbPower * 1 (second) (= 448.14 Ws)`

Then, allowing them, say, a half second to recover (the eels only need a few milliseconds), we can get their hourly input as follows:

`voltorbEnergyPerHour (watt-hours) = voltorbEnergyPerSecond * 60 (seconds) / 2 (discharge + recovery time) * 60 (minutes) (= 806,652 Wh)`

Now, the Voltorbs can't be producing electricity 24/7. They need to sleep, so, assuming Jubilife Village experiences a 24-hour-day cycle, let’s subtract eight hours per day for sleep. It would also be inhumane to force them to dedicate all their waking hours to powering this village, so, despite their rarity, let’s give them eight hours of leisure time per day. This leaves each Voltorb with one eight-hour shift per day. With this in mind, if we want to determine the number of voltorbs required per shift, we create:

`energyRequiredPerShift = energyRequiredPerDay / 3 (= 1.82608 MWh)`
`voltorbEnergyPerShift = voltorbEnergyPerHour * 8 (hours) (= 6.453216 MWh)`

At this point, it's clear that a single Voltorb working a single shift generates more than enough power for the entire day. We don’t want to put all our eggs in one basket, though, so we'll capture one extra Voltorb to cover weekends and to fill in if the weekday Voltorb is sick. With that in mind, we get our answer:

**`voltorbsRequired = 2`**

A great result, given how rare they are!

### Record scratch

_Having said that,_ I do wonder if this problem were written with the assumption that Jubilife Village had, say, one million residents. Just in case, I'll re-calculate some of this and figure out how many Voltorbs that would require, too. We can still use some of the initial figures we had before.

`energyRequiredPerDay = oneDayEnergyForMillion (44,179.4452 MWh)`

Then we recalculate the needs per shift:

`energyRequiredPerShift = energyRequiredPerDay / 3 (= 14,726.4817 MWh)`
`voltorbEnergyPerShift = voltorbEnergyPerHour * 8 (hours) (= 6.453216 MWh)`
`voltorbsRequiredPerShift = energyRequiredPerShift / voltorbEnergyPerShift (= 2,282.0376 = 2,283 Voltorbs)`
`voltorbsRequiredPerDay = voltorbsRequiredPerShift * 3 (= 6,849 Voltorbs)`

We want to give them weekends off, though, so we'll additionally need just as many to cover weekends as well as to fill in if weekday Voltorbs get sick or something. Multiplying voltorbsRequiredPerDay by 2, we get our answer:

**`voltorbsRequired = 13,698 Voltorbs`**

Better get catching!

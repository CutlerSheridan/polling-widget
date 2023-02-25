# Polling Widget

## A real-time polling widget

#### TODO NEXT

#### TODO LATER

- after submitting, change answers to show as results with percentages

##### Features

- after submitting, disable submit option

##### Behavior

##### Style

- make it all look like Persona 5
- add credit

#### DONE

_0.2.0_

- implement real-time data watching for vote totals
- refactor and delete totalVotes field in database; replace with state that tracks total votes via a useEffect watching each answer's vote totals and recalculating total each change

_0.1.0_

- create component files for Poll and PollAnswer
- create firebaseController for database configuration and logic
- create firebase database and structure for question data
- make Poll component that pulls data from firebase and populates question and answer data
- make submit button increment appropriate answer's vote total
- make submit button increment poll's total votes amount

_0.0.0_

- Initial commit

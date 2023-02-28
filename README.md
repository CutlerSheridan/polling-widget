# Polling Widget

## A real-time polling widget

#### TODO NEXT

- make text outlines thicker

#### TODO LATER

##### Features

- after submitting, disable submit option
- add 'see results' button without voting

##### Behavior

- refactor DOM structure so choice and percent num are grouped and percent bar and num of votes are grouped

##### Style

- make choice highlighted and top answer bold or something to differentiate them; or just leave the checked radio by your choice and only style the top answer differently
- make it all look like Persona 5
- add credit

#### DONE

_0.3.3_

- fix letter style randomization so words don't break across lines
- spread the letters out a bit

_0.3.2_

- add random text styling for:
  - capitalization
  - color / outline / background
  - some bigger letters
  - tilt left or right

_0.3.1_

- make text white with black outline by default
- style submit button

_0.3.0_

- disable radio buttons upon voting
- add percent bar under choices
- make percent bar width widen to appropriate width upon voting
- make percent bar only visible after voting

_0.2.1_

- adjust some spacing
- add some borders
- replace default radio buttons with customs

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

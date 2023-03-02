# Polling Widget

## A real-time polling widget

Cast a vote and anyone else looking at the poll on their own device will immediately see your vote reflected. Persona 5 ransom-style letters are randomized and will look different every page load.

#### TODO NEXT

#### TODO LATER

##### Features

##### Behavior

##### Style

#### DONE

_1.0.1_

- fix % total so, if no votes present, reads 0%, not NaN%

_1.0.0_

- adjust Submit button alignment
- add credit

_0.4.3_

- restructure DOM so answer and respective percent num are grouped and percent bar and num of votes are grouped to allow for more control over horizontal alignment
- adjust totalVotes element size so poll container doesn't resize upon submission

_0.4.2_

- add white border-right to percent bars

_0.4.1_

- tilt See Results button
- make See Results font a stencil with red background
- make Submit button red with black outline when inactive
- make Submit say Submitted when submitted

_0.4.0_

- refactor hasBeenSubmitted into state of Poll to pass down into PollAnswer
- add 'see results' button without voting in place of total vote count in bottom right, then swap with total vote count upon clicking that or submitting a vote

_0.3.5_

- tilt boxes to make it feel more dynamic
- disable submit button before any option is clicked and after submitting answer
- prevent changing answer after submitting

_0.3.4_

- make some letters tilt to a lesser degree
- refactor letter style randomization to be more random
- change text stroke approach for more crisp, thicker outlines

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

# Guess The Celebrity (Design)

Software Design for Guess That Celebrity App. Includes Web & Mobile Wireframe Prototypes, User Stories, Rest API, Sequence Diagrams, and UML Class Diagram. Completed as a project for CIS350: Software Development

## Wireframe Prototypes
Figma: https://www.figma.com/file/ZP0m8ddk8AxmHcj4QiQcaB/hw1-CIS350

## Rest API Documentation
SwaggerHub Documentation: https://app.swaggerhub.com/apis/swaggerHW1/Guess-That-Celebrity/1.0

## User Stories & User Flow Diagrams

### Login
#### User Story
As a player, I want to enter a username and login so that my score will be saved after playing the quiz

#### User Flow Diagram
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/userflow_attemptquestion.PNG)

### Attempting A Question
#### User Story
As a player, I want to click on a celebrity name so that I can know if I guessed correctly

#### User Flow Diagram
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/userflow_attemptquestion.PNG)

### View Leaderboard
#### User Story
As a player, I want to click on the "View Leaderboard" button so that I can see the top 10 players

#### User Flow Diagram
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/userflow_displayleaders.PNG)

### Delete Account
#### User Story
As a player, I want to click the "Delete Account" button so that I can delete my account from the application

#### User Flow Diagram
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/userflow_deleteaccount.png)

## Sequence Diagrams

### Login
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/seqdiag_login.PNG)

### Attempting A Question
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/seqdiag_attemptq.PNG)

### View Leaderboard
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/seqdiag_displayleaderboard.PNG)

### Delete Account
![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/seqdiag_deleteaccount.PNG)

## UML Class Diagram

Note: k denotes the number of players

Note: Question and Player are the primary classes. Quiz Collection & Player Collection are to group players and questions as per the quiz requirements (e.g. question bank, leaderboard), so they are not represented in the sequence diagrams and documentation.

![](https://github.com/Vpatchycodes/guessthatcelebrity/blob/2d247d05e2a25eb8c9f7c8596a46fe55c31fcc35/design/files/class_diagram.png)

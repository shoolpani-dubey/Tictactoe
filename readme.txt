Assignment
----------

Your assignment, should you choose to accept it, is to implement an HTML5 UI
for a REST backend running a game of tic-tac-toe. You should use vanilla
Javascript for the task, no frameworks or component libraries should be used.

The look and feel of the game board as well as the interaction experience is
up to you.

The game board grid looks as follows

.-----------.
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
`-----------´

So, a board position

.-----------.
| X | O | - |
+---+---+---+
| - | X | - |
+---+---+---+
| - | O | X |
`-----------´

translates to

XO--X--OX
012345678

See the accompanying tictactoe.yaml for the REST API documentation in Swagger
format (https://swagger.io).


Game flow:
----------

- The HTML5 client (player) starts a game by making a POST request to /games.
  The POST request contains a representation of a game board, either empty
  (computer starts) or with the first move made (player starts).
  The player can choose either noughts or crosses.

- The backend responds with the ID of the started game.

- Client GETs the board state with the ID.

- Client PUTs the board state with a new move with the ID.

- Backend validates the move, makes it's own move and updates the game state.
  The updated game state is returned in the PUT response.

- And so on. The game is over once the computer or the player gets 3 noughts
  or crosses, horizontally, vertically or diagonally or there are no moves to
  be made.

How to run:

Build the Docker container.

	make build

Run the server.

	make run

Server is now running on Docker.

	http://127.0.0.1:5555/api/v1/games

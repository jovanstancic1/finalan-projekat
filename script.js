const gameBoard = document.getElementById('gameBoard');
        const apple = document.getElementById('apple');
        const scoreDisplay = document.getElementById('score');
        let snake = [{x: 200, y: 200}];
        let appleX, appleY;
        let dx = 0, dy = 0;
        let score = 0;
        const snakeSize = 20;
        const boardSize = 400;
        
        function startGame() {
            placeApple();
            document.addEventListener('keydown', changeDirection);
            setInterval(moveSnake, 100);
        }
        
        function placeApple() {
            appleX = Math.floor(Math.random() * (boardSize / snakeSize)) * snakeSize;
            appleY = Math.floor(Math.random() * (boardSize / snakeSize)) * snakeSize;
            apple.style.left = `${appleX}px`;
            apple.style.top = `${appleY}px`;
        }

        function moveSnake() {
            let headX = snake[0].x + dx;
            let headY = snake[0].y + dy;

            // Check collision with walls
            if (headX < 0 || headX >= boardSize || headY < 0 || headY >= boardSize) {
                gameOver();
                return;
            }

            // Check collision with itself
            for (let i = 1; i < snake.length; i++) {
                if (headX === snake[i].x && headY === snake[i].y) {
                    gameOver();
                    return;
                }
            }

            // Check collision with apple
            if (headX === appleX && headY === appleY) {
                score++;
                scoreDisplay.textContent = score;
                snake.unshift({x: headX, y: headY}); // Grow snake
                placeApple(); // Place new apple
            } else {
                // Move snake
                snake.pop(); // Remove tail
                snake.unshift({x: headX, y: headY}); // Add new head
            }

            // Update snake position on the board
            updateSnake();
        }

        function updateSnake() {
            // Remove previous snake parts from the board
            const snakeParts = document.querySelectorAll('.snakePart');
            snakeParts.forEach(part => part.remove());

            // Add new snake parts to the board
            snake.forEach(part => {
                const snakePart = document.createElement('div');
                snakePart.className = 'snakePart';
                snakePart.style.left = `${part.x}px`;
                snakePart.style.top = `${part.y}px`;
                gameBoard.appendChild(snakePart);
            });
        }

        function changeDirection(event) {
            switch (event.key) {
                case 'ArrowUp':
                    if (dy === 0) {
                        dx = 0;
                        dy = -snakeSize;
                    }
                    break;
                case 'ArrowDown':
                    if (dy === 0) {
                        dx = 0;
                        dy = snakeSize;
                    }
                    break;
                case 'ArrowLeft':
                    if (dx === 0) {
                        dx = -snakeSize;
                        dy = 0;
                    }
                    break;
                case 'ArrowRight':
                    if (dx === 0) {
                        dx = snakeSize;
                        dy = 0;
                    }
                    break;
                default:
                    break;
            }
        }

        function gameOver() {
            alert(`Game Over! Your score: ${score}`);
            resetGame();
        }

        function resetGame() {
            snake = [{x: 200, y: 200}];
            dx = 0;
            dy = 0;
            score = 0;
            scoreDisplay.textContent = score;
            updateSnake();
            placeApple();
        }

        // Start the game when the page loads
        startGame();
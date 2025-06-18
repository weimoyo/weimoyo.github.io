// 解决Chrome兼容性的游戏逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 游戏配置
    const config = {
        boardSize: 20,
        initialSpeed: 150,
        speedIncrement: 10
    };
    
    // 游戏状态
    const state = {
        score: 0,
        speed: 1,
        snakeLength: 3,
        direction: 'right',
        nextDirection: 'right',
        snake: [],
        food: null,
        gameInterval: null,
        isPaused: true,
        isGameOver: false
    };
    
    // DOM 元素
    const elements = {
        gameBoard: document.getElementById('game-board'),
        score: document.getElementById('score'),
        speed: document.getElementById('speed'),
        length: document.getElementById('length'),
        startBtn: document.getElementById('start-btn'),
        pauseBtn: document.getElementById('pause-btn'),
        gameOver: document.getElementById('game-over'),
        finalScore: document.getElementById('final-score'),
        restartBtn: document.getElementById('restart-btn')
    };
    
    // 初始化游戏
    function initGame() {
        createBoard();
        resetGame();
        setupEventListeners();
    }
    
    // 创建游戏棋盘
    function createBoard() {
        elements.gameBoard.innerHTML = '';
        const totalCells = config.boardSize * config.boardSize;
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            elements.gameBoard.appendChild(cell);
        }
    }
    
    // 重置游戏状态
    function resetGame() {
        clearInterval(state.gameInterval);
        
        // 重置状态
        state.score = 0;
        state.speed = 1;
        state.snakeLength = 3;
        state.direction = 'right';
        state.nextDirection = 'right';
        state.isPaused = true;
        state.isGameOver = false;
        
        // 更新UI
        updateUI();
        elements.gameOver.style.display = 'none';
        
        // 初始化蛇
        const startX = Math.floor(config.boardSize / 4);
        const startY = Math.floor(config.boardSize / 2);
        state.snake = [
            {x: startX, y: startY},
            {x: startX - 1, y: startY},
            {x: startX - 2, y: startY}
        ];
        
        // 生成食物
        generateFood();
        
        // 渲染初始状态
        render();
        
        // 更新按钮状态
        elements.startBtn.textContent = '开始游戏';
        elements.pauseBtn.disabled = true;
    }
    
    // 生成食物
    function generateFood() {
        // 创建一个所有可能位置的数组
        const allPositions = [];
        for (let x = 0; x < config.boardSize; x++) {
            for (let y = 0; y < config.boardSize; y++) {
                allPositions.push({x, y});
            }
        }
        
        // 过滤掉蛇占据的位置
        const availablePositions = allPositions.filter(pos => 
            !state.snake.some(segment => segment.x === pos.x && segment.y === pos.y)
        );
        
        // 随机选择一个位置
        if (availablePositions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            state.food = availablePositions[randomIndex];
        }
    }
    
    // 渲染游戏
    function render() {
        // 清除棋盘
        document.querySelectorAll('.cell').forEach(cell => {
            cell.className = 'cell';
        });
        
        // 渲染蛇
        state.snake.forEach((segment, index) => {
            const cellIndex = segment.y * config.boardSize + segment.x;
            const cell = document.querySelector(`.cell[data-index="${cellIndex}"]`);
            if (cell) {
                cell.classList.add('snake');
                if (index === 0) {
                    cell.classList.add('snake-head');
                }
            }
        });
        
        // 渲染食物
        if (state.food) {
            const foodIndex = state.food.y * config.boardSize + state.food.x;
            const foodCell = document.querySelector(`.cell[data-index="${foodIndex}"]`);
            if (foodCell) {
                foodCell.classList.add('food');
            }
        }
    }
    
    // 更新游戏状态
    function update() {
        if (state.isPaused || state.isGameOver) return;
        
        // 更新方向
        state.direction = state.nextDirection;
        
        // 计算新蛇头位置
        const head = {...state.snake[0]};
        switch (state.direction) {
            case 'up': head.y--; break;
            case 'down': head.y++; break;
            case 'left': head.x--; break;
            case 'right': head.x++; break;
        }
        
        // 检查游戏结束条件
        if (
            head.x < 0 || 
            head.x >= config.boardSize || 
            head.y < 0 || 
            head.y >= config.boardSize ||
            state.snake.some((segment, index) => index > 0 && segment.x === head.x && segment.y === head.y)
        ) {
            endGame();
            return;
        }
        
        // 添加新蛇头
        state.snake.unshift(head);
        
        // 检查是否吃到食物
        if (state.food && head.x === state.food.x && head.y === state.food.y) {
            // 增加分数和长度
            state.score += 10;
            state.snakeLength++;
            
            // 每10分提高速度
            if (state.score > 0 && state.score % 50 === 0) {
                state.speed++;
                updateGameSpeed();
            }
            
            // 生成新食物
            generateFood();
        } else {
            // 如果没吃到食物，移除蛇尾
            state.snake.pop();
        }
        
        // 更新UI
        updateUI();
        
        // 渲染新状态
        render();
    }
    
    // 更新游戏速度
    function updateGameSpeed() {
        clearInterval(state.gameInterval);
        const speed = Math.max(50, config.initialSpeed - (state.speed * config.speedIncrement));
        state.gameInterval = setInterval(update, speed);
    }
    
    // 更新UI
    function updateUI() {
        elements.score.textContent = state.score;
        elements.speed.textContent = state.speed;
        elements.length.textContent = state.snakeLength;
    }
    
    // 开始游戏
    function startGame() {
        if (state.isGameOver) {
            resetGame();
        }
        
        state.isPaused = false;
        elements.startBtn.textContent = '重新开始';
        elements.pauseBtn.disabled = false;
        elements.pauseBtn.textContent = '暂停';
        
        updateGameSpeed();
    }
    
    // 暂停游戏
    function togglePause() {
        state.isPaused = !state.isPaused;
        elements.pauseBtn.textContent = state.isPaused ? '继续' : '暂停';
        
        if (!state.isPaused) {
            updateGameSpeed();
        } else {
            clearInterval(state.gameInterval);
        }
    }
    
    // 结束游戏
    function endGame() {
        state.isGameOver = true;
        clearInterval(state.gameInterval);
        
        elements.finalScore.textContent = state.score;
        elements.gameOver.style.display = 'block';
    }
    
    // 设置事件监听
    function setupEventListeners() {
        // 键盘控制
        document.addEventListener('keydown', e => {
            // 定义游戏控制键
            const controlKeys = [
                'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
                'w', 'W', 's', 'S', 'a', 'A', 'd', 'D'
            ];
            
            // 如果是游戏控制键，阻止默认行为
            if (controlKeys.includes(e.key)) {
                e.preventDefault();
                
                if (state.isPaused && !state.isGameOver) return;
                
                switch(e.key) {
                    case 'ArrowUp':
                    case 'w':
                    case 'W':
                        if (state.direction !== 'down') state.nextDirection = 'up';
                        break;
                    case 'ArrowDown':
                    case 's':
                    case 'S':
                        if (state.direction !== 'up') state.nextDirection = 'down';
                        break;
                    case 'ArrowLeft':
                    case 'a':
                    case 'A':
                        if (state.direction !== 'right') state.nextDirection = 'left';
                        break;
                    case 'ArrowRight':
                    case 'd':
                    case 'D':
                        if (state.direction !== 'left') state.nextDirection = 'right';
                        break;
                }
            }
        });
        
        // 按钮事件
        elements.startBtn.addEventListener('click', () => {
            if (state.isPaused || state.isGameOver) {
                startGame();
            } else {
                resetGame();
            }
        });
        
        elements.pauseBtn.addEventListener('click', togglePause);
        elements.restartBtn.addEventListener('click', resetGame);
    }
    
    // 确保DOM加载完成后初始化游戏
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
    } else {
        initGame();
    }
});
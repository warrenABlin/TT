const gameContainer = document.querySelector('.game-container');
const cardValues = [
    '1', '1', '2', '2', 
    '3', '3', '4', '4', 
    '5', '5', '6', '6', 
    '7', '7', '8', '8'
];
let flippedCards = [];
let matchedCards = [];

// 將卡片隨機打亂
cardValues.sort(() => 0.5 - Math.random());

// 建立卡片元素並添加到遊戲容器中
cardValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="front"></div>
        <div class="back" style="background-image: url('images/${value}.jpg');"></div>
    `;
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameContainer.appendChild(card);
});

// 音樂元素
const backgroundMusic = document.getElementById('background-music');

// 當使用者點擊頁面時，播放背景音樂
document.body.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            console.log('音樂開始播放');
        }).catch((error) => {
            console.error('播放音樂時發生錯誤: ', error);
        });
    }
});

// 翻牌邏輯
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 1000);
        }
    }
}

// 檢查是否匹配
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        matchedCards.push(card1, card2);
        card1.querySelector('.back').style.backgroundColor = 'lightgreen';
        card2.querySelector('.back').style.backgroundColor = 'lightgreen';
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
    }
    flippedCards = [];
    checkWin();
}

// 檢查是否獲勝
function checkWin() {
    if (matchedCards.length === cardValues.length) {
        alert('恭喜你，全部配對成功！');
    }
}

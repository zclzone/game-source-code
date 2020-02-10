<template>
  <div class="game">
    <div class="map">
      <div class="food"
           :style="`
            width:${food.width}px;
            height:${food.height}px;
            background:${food.color};
            position:absolute;
            left:${food.x * food.width}px;
            top:${food.y * food.height}px;`">
      </div>
      <div class="snake"
           v-for="(item,index) in snake.body"
           :key="index"
           :style="`
            width:${snake.width}px;
            height:${snake.height}px;
            background:${item.color};
            position:absolute;
            left:${item.x * snake.width}px;
            top:${item.y * snake.height}px;`">
      </div>

      <div class="msg">{{msg}}</div>
    </div>
    <div class="player">
      <div class="info">
        <button class="start"
                v-if="!isStart"
                @click="gameStart">开始游戏
        </button>
        <span v-else>{{player}}</span>
      </div>
      <div class="control">
        <button class="top"
                @click="goTop">↑</button>
        <button class="bottom"
                @click="goBottom">↓</button>
        <button class="left"
                @click="goLeft">←</button>
        <button class="right"
                @click="goRight">→</button>
      </div>
      <div class="score">
        <span>{{score}}分</span>
      </div>
    </div>
  </div>
</template>

<script>
import Tool from '../lib/js/tool.js'
export default {
  data () {
    return {
      foodDiv: null,
      map: null,
      player: '',
      isStart: false,
      gmTimer: null,
      score: 0,
      msg: '',
      food: {
        color: '',
        width: 20,
        height: 20,
        x: 0,
        y: 0
      },
      snake: {
        width: 20,
        height: 20,
        direction: '',
        body: []
      }
    }
  },
  methods: {
    gameStart () {
      if (this.isStart) return;
      if (!this.player) {
        this.player = prompt('大侠，请问尊姓大名：');
      }
      if (!this.player) return;
      this.map.classList.remove('fail');
      this.isStart = true;
      this.score = 0;
      this.snake.direction = 'right';
      this.snake.body = [
        { x: 3, y: 2, color: 'red' },
        { x: 2, y: 2, color: 'blue' },
        { x: 1, y: 2, color: 'blue' }
      ];
      this.randomFood();
      this.gmTimer = setInterval(() => {
        this.snakeMove();
        //获得食物
        if (
          this.snake.body[0].x == this.food.x &&
          this.snake.body[0].y == this.food.y
        ) {
          this.getFood(this.food);
        }
        //碰墙，游戏失败
        if (
          this.snake.body[0].x == -1 ||
          this.snake.body[0].x == this.map.offsetWidth / this.snake.width ||
          this.snake.body[0].y == -1 ||
          this.snake.body[0].y == this.map.offsetHeight / this.snake.height
        ) {
          this.gameOver();
          this.msg = 'Game Over!!';
        }
        if (this.score >= 52) {
          this.score = 52;
          this.gameOver();
          this.msg = '挑战成功！！';
        }
      }, 300);
    },
    randomFood () {
      this.food.x = Tool.getRandom(0, this.map.offsetWidth / this.food.width - 1);
      this.food.y = Tool.getRandom(0, this.map.offsetHeight / this.food.height - 1);
      let r = Tool.getRandom(0, 255);
      let g = Tool.getRandom(0, 255);
      let b = Tool.getRandom(0, 255);
      this.food.color = `rgb(${r},${g},${b})`;
    },
    snakeMove () {
      for (let i = this.snake.body.length - 1; i > 0; i--) {
        this.snake.body[i].x = this.snake.body[i - 1].x;
        this.snake.body[i].y = this.snake.body[i - 1].y;
      }
      //蛇头的位置  根据方向决定
      switch (this.snake.direction) {
        case 'right':
          this.snake.body[0].x += 1;
          break;
        case 'left':
          this.snake.body[0].x -= 1;
          break;
        case 'top':
          this.snake.body[0].y -= 1;
          break;
        case 'bottom':
          this.snake.body[0].y += 1;
          break;
      }
    },
    getFood (food) {
      this.snake.body.push({
        x: food.x,
        y: food.y,
        color: food.color
      });
      this.score += 1;
      if (this.score >= 10) this.score += 1;
      if (this.score >= 30) this.score += 2;

      this.randomFood();
    },
    gameOver () {
      this.snake.body.splice(0, 1);
      clearInterval(this.gmTimer);
      this.map.classList.add('fail');
      this.isStart = false;
    },
    goLeft () {
      if (this.snake.direction == 'right') return;
      this.snake.direction = 'left';
    },
    goTop () {
      if (this.snake.direction == 'bottom') return;
      this.snake.direction = 'top';
    },
    goRight () {
      if (this.snake.direction == 'left') return;
      this.snake.direction = 'right';
    },
    goBottom () {
      if (this.snake.direction == 'top') return;
      this.snake.direction = 'bottom';
    },
  },
  mounted () {
    this.map = document.querySelector('.map');
    this.foodDiv = document.querySelector('.food');
    //注册方向按键事件
    window.onkeydown = (e) => {
      switch (e.keyCode) {
        case 37:
          this.goLeft();
          break;
        case 38:
          this.goTop();
          break;
        case 39:
          this.goRight();
          break;
        case 40:
          this.goBottom();
          break;
      }
    };
  },
}
</script>

<style lang="scss" scoped>
.game {
  width: 800px;
  height: 200px;
  box-sizing: border-box;
  margin: 50px auto;
}

.map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  box-sizing: border-box;
  background: #ccc;
  position: relative;
  .food {
    position: absolute;
  }
}

.fail {
  border: 1px solid red;
  z-index: 99;
}

.msg {
  height: 35px;
  width: 20%;
  line-height: 35px;
  border-radius: 5px;
  text-align: center;
  background: #84cdef;
  display: none;
}

.fail .msg {
  display: block;
  position: absolute;
  /* left: 50%;
  top: 50%;
  margin-left: -75px;
  margin-top: -17px; */
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 99;
}

.player {
  width: 800px;
  height: 200px;
  background: #84cdef;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}

.player div {
  display: inline-block;
  vertical-align: middle;
}

.info {
  width: 200px;
  line-height: 200px;
  text-align: center;
  font-size: 50px;
  border-right: 2px solid #ccc;
}
.control {
  width: 400px;
  height: 200px;
  position: relative;
  border-right: 2px solid #ccc;
}

.control button {
  border: none;
  font-size: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: absolute;
}

.control button:hover {
  background: #eed626;
}

.control .top {
  top: 20px;
  left: 0;
  right: 0;
  margin: auto;
}

.control .bottom {
  bottom: 20px;
  left: 0;
  right: 0;
  margin: auto;
}

.control .left {
  left: 50px;
  top: 0;
  bottom: 0;
  margin: auto;
}

.control .right {
  right: 50px;
  top: 0;
  bottom: 0;
  margin: auto;
}

.score {
  font-size: 50px;
  line-height: 200px;
  text-align: center;
}
</style>



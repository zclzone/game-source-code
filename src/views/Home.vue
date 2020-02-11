<template>
  <div class="box">
    <div class="view" v-show="view === 1">
      <h3>情人节到了，我为你准备了一份大礼<br /><br />想不想要？</h3>
      <br />
      <button class="no" @click="no1 = '别开玩笑了'">{{no1}}</button><button class="yes" @click="view = 3">我要</button>
    </div>

    <div class="view" v-show="view === 3">
      <h3>首先~<br /><br />说一句夸奖我的话</h3>
      <br />
      <span class="word" @click="select1">无聊</span>
      <span class="word" @click="select2">打屎你</span>
      <span :class="{word:true,selected:isSelected}" @click="isSelected = !isSelected">你真帅</span>
      <br />
      <br />
      <br />
      <button class="no" @click="no3 = '别开玩笑了'">{{no3}}</button>
      <button class="yes" @click="btn4">我是认真的</button>
    </div>
    <div class="view" v-show="view === 4">
      <h3>嘴真甜~
        <br />
        <br />
        那么，请开始寻找你的礼物吧
      </h3>
      <br />
      <button class="yes" @click="start">开始</button>
    </div>

    <div class="view" v-show="view === 5">
      <div v-show="gift === 1 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 2 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 3 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 4 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 5 || gift === 0" class="gift" @click="right">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 6 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 7 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 8 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 9 || gift === 0" class="gift" @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div class="gift">
        <div class="rel-heart hide">
        </div>
      </div>
      <h3 v-if="isFind" v-html="msg" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      view: 1,
      no1: '我不要',
      no2: '拒绝',
      no3: '不玩了',
      no4: '不玩了',
      isSelected: false,
      gift: 0,
      timer: null,
      isFind: false,
      msg: ''
    }
  },
  methods: {
    select1 () {
      this.isSelected = false
      alert('不许骂我~~')
    },
    select2 () {
      this.isSelected = false
      alert('不许打我~~')
    },
    btn4 () {
      if (!this.isSelected) {
        alert('哼哼！休想糊弄我，必须夸我')
      } else {
        this.view = 4
      }
    },
    start () {
      this.view = 5
      this.timer = setInterval(() => {
        this.gift++
        if (this.gift === 9) {
          this.gift = 1
        }
      }, 300)
    },
    selectWrong () {
      this.msg = '错了，小笨蛋'
      this.isFind = true
      setTimeout(() => {
        this.msg = ''
        this.isFind = false
      }, 1000);
    },
    right () {
      document.querySelector('.rel-heart').classList.remove('hide')
      this.gift = 0
      this.isFind = true
      this.msg = '终于找到了，小笨蛋 <br/><br/> 恭喜获得爱心一份~<br/>'
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss">
.hide {
  visibility: hidden;
}
.box {
  margin: 0 auto;
  box-sizing: border-box;
  // background: rgba(pink, 0.3);
  background: linear-gradient(to bottom left, #feecef, pink);
  height: 100vh;
  width: 100%;
  max-width: 420px;
  max-height: 920px;
  padding: 15px;
  padding-top: 200px;
  text-align: center;
  .view {
    transition: all 0.6s;
    position: relative;
    h3 {
      font-size: 16px;
      font-weight: 400;
      background: linear-gradient(to right, red, blue);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
    }
    button {
      margin-right: 20px;
      font-size: 16px;
      height: 40px;
      width: 120px;
      color: red;
      border-radius: 16px;
      background: linear-gradient(45deg, pink, skyblue);
      border: none;
      outline: none;
      transition: all 0.6s;
      &:hover {
        background: linear-gradient(45deg, skyblue, pink);
        color: blue;
      }
      &:active {
        color: blue;
      }
    }
    button.yes {
      color: blue;
      &:hover {
        background: linear-gradient(45deg, skyblue, pink);
        color: red;
      }
      &:active {
        color: red;
      }
    }
    .word {
      display: inline-block;
      padding: 5px 10px;
      color: gray;
      margin: 0 15px;
      border-radius: 5px;
      border: 1px solid pink;
      &.selected {
        background: skyblue;
        color: red;
        border: none;
        border: 1px solid skyblue;
      }
    }
    .gift {
      position: absolute;
      .heart {
        width: 16px;
        height: 15px;
        margin: 0 auto;
        position: relative;
        &::before,
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 8px;
          height: 12px;
          background-color: red;
          border-top-left-radius: 50% 4px;
          border-top-right-radius: 50% 4px;
          left: 2px;
          top: 0;
          transform: rotate(-45deg);
        }
        &::after {
          transform: rotate(45deg);
          left: 5px;
        }
      }
      .rel-heart {
        width: 64px;
        height: 60px;
        margin: 0 auto;
        position: relative;
        &::before,
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 32px;
          height: 48px;
          background-color: red;
          border-top-left-radius: 50% 16px;
          border-top-right-radius: 50% 16px;
          left: 4px;
          top: 0;
          transform: rotate(-45deg);
        }
        &::after {
          transform: rotate(45deg);
          left: 15px;
        }
      }
      &:nth-child(1) {
        left: 0;
        right: 0;
        margin: auto;
        top: 70px;
      }
      &:nth-child(2) {
        left: 70px;
        top: 40px;
      }

      &:nth-child(3) {
        left: 15px;
        top: 100px;
      }

      &:nth-child(4) {
        left: 60px;
        top: 180px;
      }

      &:nth-child(5) {
        left: 0;
        right: 0;
        margin: auto;
        top: 260px;
      }
      &:nth-child(6) {
        right: 60px;
        top: 180px;
      }
      &:nth-child(7) {
        right: 15px;
        top: 100px;
      }

      &:nth-child(8) {
        right: 70px;
        top: 40px;
      }
      &:nth-child(9) {
        left: 0;
        right: 0;
        margin: auto;
        top: 70px;
      }
      &:nth-child(10) {
        left: 0;
        right: 0;
        top: 145px;
        margin: auto;
      }
    }
  }
}
</style>

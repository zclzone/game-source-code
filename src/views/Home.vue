<template>
  <div class="box">
    <div class="view"
         v-show="view === 1">
      <h3>我给你送来了一份大礼</h3>
      <button class="no"
              @click="no1 = '别开玩笑了'">{{no1}}</button><button class="yes"
              @click="view = 2">我要</button>
    </div>
    <div class="view"
         v-show="view === 2">
      <h3>嘿嘿~我就知道你很想要</h3>
      <p>不过~你必须先完成后面的任务才行哦</p>
      <button class="no"
              @click="no2 = '别开玩笑了'">{{no2}}</button>
      <button class="yes"
              @click="view = 3">我接受</button>
    </div>
    <div class="view"
         v-show="view === 3">
      <h3>首先~说一句夸奖我的话</h3>
      <br />
      <input type="radio"
             name="word"
             @click.prevent="select1">无聊
      <input type="radio"
             name="word"
             @click.prevent="select2">打屎你
      <input type="radio"
             name="word"
             @click="isSelected = true">你真帅
      <br />
      <br />
      <button class="no"
              @click="no3 = '别开玩笑了'">{{no3}}</button>
      <button class="yes"
              @click="btn4">我是认真的</button>
    </div>
    <div class="view"
         v-show="view === 4">
      <h3>果然还是有雪亮的眼睛的</h3>
      <p>接下来，请寻找你的礼物吧，它可能存在于任何一个角落</p>
      <button class="no"
              @click="no4 = '别开玩笑了'">{{no4}}</button>
      <button class="yes"
              @click="start">请开始吧</button>
    </div>

    <div class="view"
         v-show="view === 5">
      <div v-show="gift === 1"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 2"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 3"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 4"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 5"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 6"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 7"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 8"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div v-show="gift === 9"
           class="gift"
           @click="selectWrong">
        <div class="heart">
        </div>
      </div>
      <div class="gift"
           @click="right">
        <div class="rel-heart hide">
        </div>
      </div>
      <p v-if="isFind">{{msg}}</p>
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
      alert('不许骂我~~')
    },
    select2 () {
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
      this.msg = '错了，笨蛋'
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
      this.msg = '总算找到了，真笨'
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="scss">
.box {
  width: 320px;
  height: 300px;
  border: 1px dashed #f47378;
  margin: 100px auto;
  position: relative;
  .hide {
    visibility: hidden;
  }
  .view {
    margin: 50px auto;
    text-align: center;
    button {
      margin-right: 20px;
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
        width: 32px;
        height: 30px;
        margin: 0 auto;
        position: relative;
        &::before,
        &::after {
          position: absolute;
          display: block;
          content: "";
          width: 16px;
          height: 24px;
          background-color: red;
          border-top-left-radius: 50% 8px;
          border-top-right-radius: 50% 8px;
          left: 4px;
          top: 0;
          transform: rotate(-45deg);
        }
        &::after {
          transform: rotate(45deg);
          left: 10px;
        }
      }
      &:nth-child(1) {
        left: 150px;
        top: 80px;
      }
      &:nth-child(2) {
        left: 75px;
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
        left: 150px;
        bottom: 20px;
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
        right: 75px;
        top: 40px;
      }
      &:nth-child(9) {
        left: 150px;
        top: 80px;
      }
      &:nth-child(10) {
        left: 150px;
        top: 150px;
      }
    }
  }
}
</style>

<template>
  <div class="sudoku">
    <div class="num-box"
         v-for="(item,index) in nums"
         :key="index">
      <div class="num"
           @click="click(item.num,index)">{{item.num}}</div>
    </div>
  </div>
</template>


<script>
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      nums: [
        { num: 1 },
        { num: 2 },
        { num: 3 },
        { num: 4 },
        { num: 5 },
        { num: 6 },
        { num: 7 },
        { num: 8 },
        { num: 9 }
      ],
      curIndex: 0,
      clickStatus: false,
      timer: null
    }
  },
  methods: {
    click (n, i) {
      if (!this.clickStatus) {
        this.clickStatus = true
        this.curIndex = i
        document.querySelector(`.num-box:nth-child(${i + 1})`).classList.add('selected')
      } else {
        switch (this.curIndex) {
          case 0:
          case 3:
          case 6:
            if (i - this.curIndex != 1 && Math.abs(i - this.curIndex) != 3) {
              this.clickStatus = false
              document.querySelector(`.num-box:nth-child(${this.curIndex + 1})`).classList.remove('selected')
              return
            }
            break
          case 1:
          case 4:
          case 7:
            if (Math.abs(this.curIndex - i) != 1 && Math.abs(this.curIndex - i) != 3) {
              this.clickStatus = false
              document.querySelector(`.num-box:nth-child(${this.curIndex + 1})`).classList.remove('selected')
              return
            }
            break
          case 2:
          case 5:
          case 8:
            if (i - this.curIndex != -1 && Math.abs(i - this.curIndex) != 3) {
              this.clickStatus = false
              document.querySelector(`.num-box:nth-child(${this.curIndex + 1})`).classList.remove('selected')
              return
            }
            break
        }
        let temp = this.nums[this.curIndex].num
        this.nums[this.curIndex].num = n
        this.nums[i].num = temp
        this.clickStatus = false
        document.querySelector(`.num-box:nth-child(${i + 1})`).classList.add('selected')
        setTimeout(() => {
          document.querySelector(`.num-box:nth-child(${i + 1})`).classList.remove('selected')
          document.querySelector(`.num-box:nth-child(${this.curIndex + 1})`).classList.remove('selected')
          this.check()
        }, 100)
      }
    },
    check () {
      if (
        (this.nums[0].num + this.nums[1].num + this.nums[2].num) === 15 &&
        (this.nums[3].num + this.nums[4].num + this.nums[5].num) === 15 &&
        (this.nums[6].num + this.nums[7].num + this.nums[8].num) === 15 &&
        (this.nums[0].num + this.nums[3].num + this.nums[6].num) === 15 &&
        (this.nums[1].num + this.nums[4].num + this.nums[7].num) === 15 &&
        (this.nums[2].num + this.nums[5].num + this.nums[8].num) === 15 &&
        (this.nums[0].num + this.nums[4].num + this.nums[8].num) === 15 &&
        (this.nums[2].num + this.nums[4].num + this.nums[6].num) === 15
      ) {
        for (let i = 0; i < document.querySelectorAll('.num-box').length; i++) {
          document.querySelectorAll('.num-box')[i].classList.add('selected')
        }
      }
    }
  },
}
</script>


<style lang="scss">
.sudoku {
  width: 300px;
  height: 300px;
  margin: 50px auto;
  padding: 5px;
  border: 1px solid #ccc;
  .num-box {
    display: inline-block;
    text-align: center;
    width: 90px;
    height: 90px;
    margin: 5px;
    background: #666;
    border-radius: 50%;
    border: 1px solid #ccc;
    box-sizing: border-box;
    .num {
      height: 90px;
      line-height: 90px;
      color: black;
      font-weight: 600;
      font-size: 30px;
    }
  }
  .selected {
    background: #ff7f27;
    box-shadow: 0 0 5px red;
  }
}
</style>


<template>
  <div>
    <ul>
      <li v-for="item in 85"
          :key="item"
          @click="addWall(item)">
        <span class="hex">
          <span :class="['hexIn',walls.indexOf(item) >= 0 ? 'wall' : '',item === target ? 'target' : '']"></span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      walls: [],//墙
      target: 0,
      verge: [],  //边缘数字
      subVerge: [] //次边缘数字
    }
  },
  methods: {
    //获取随机整数
    getRandomNum (min, max) {
      let Range = max - min
      var Rand = Math.random()
      let num = min + Math.round(Rand * Range)
      return num
    },
    //初始化墙
    initWalls () {
      let startWallCount = this.getRandomNum(3, 7)
      this.target = 39
      this.walls = []
      this.verge = []
      let loads = []
      // let i = 11, len = 77
      let i = 1, len = 85
      for (; i <= len; i++) {
        loads.push(i)
      }
      //初始化边缘数字
      for (i = 0; i < len; i++) {
        let n = loads[i]
        if (n % 17 === 0 || (n - 10) % 17 === 0 || (n - 9) % 17 === 0 || (n - 1) % 17 === 0 || n < 10 || n > 77) {
          this.verge.push(n)
        }
      }
      //随机生成3到7面墙
      for (i = 0; i < startWallCount; i++) {
        let num = this.getRandomNum(11, 76)
        let index = loads.indexOf(num)
        while (index < 0 || num === this.target) {
          num = this.getRandomNum(11, 76)
          index = loads.indexOf(num)
        }
        this.walls.push(num)
        loads.splice(index, 1)
        if (loads.length < 1) {
          break
        }
      }
    },
    addWall (num) {
      if (this.walls.indexOf(num) >= 0 || num === this.target) {
        return
      }
      this.walls.push(num)
      setTimeout(() => {
        this.target = this.getNextPosition(num)
        if (this.target === 0) {
          alert('挑战成功')
          this.initWalls()
        }
        if (this.verge.indexOf(this.target) >= 0) {
          alert('挑战失败')
          this.initWalls()
        }
      }, 200)
    },
    getNextPosition (num) {
      if (this.walls.indexOf(num) < 0) {
        this.walls.push(num)
      }
      let positionNum = this.target

      let planPositions = [
        { position: positionNum - 9, score: 100, isvalid: true },
        { position: positionNum - 8, score: 100, isvalid: true },
        { position: positionNum - 1, score: 100, isvalid: true },
        { position: positionNum + 1, score: 100, isvalid: true },
        { position: positionNum + 8, score: 100, isvalid: true },
        { position: positionNum + 9, score: 100, isvalid: true }
      ]

      // 如果周围有边缘数字且不是墙则直接返回边缘数字
      for (const item of planPositions) {
        if (this.verge.indexOf(item.position) >= 0 && this.walls.indexOf(item.position) < 0) {
          return item.position
        }
      }

      // 如果点击周边2格内，则初始化6个计划路线的分数，分数高的优先
      switch (num) {
        case positionNum - 18:
          planPositions[0].score = 101
          planPositions[1].score = 104
          planPositions[2].score = 103
          planPositions[3].score = 103
          planPositions[4].score = 104
          planPositions[5].score = 102
          break;
        case positionNum - 17:
          planPositions[0].score = 101
          planPositions[1].score = 101
          planPositions[2].score = 104
          planPositions[3].score = 104
          planPositions[4].score = 103
          planPositions[5].score = 103
          break;
        case positionNum - 16:
          planPositions[0].score = 104
          planPositions[1].score = 101
          planPositions[2].score = 103
          planPositions[3].score = 104
          planPositions[4].score = 102
          planPositions[5].score = 103
          break;
        case positionNum - 10:
          planPositions[0].score = 101
          planPositions[1].score = 104
          planPositions[2].score = 101
          planPositions[3].score = 102
          planPositions[4].score = 104
          planPositions[5].score = 102
          break;
        case positionNum - 9:
          planPositions[0].isvalid = false
          planPositions[0].score = 0
          planPositions[1].score = 104
          planPositions[2].score = 104
          planPositions[3].score = 103
          planPositions[4].score = 103
          planPositions[5].score = 102
          break;
        case positionNum - 8:
          planPositions[0].score = 104
          planPositions[1].isvalid = false
          planPositions[1].score = 0
          planPositions[2].score = 103
          planPositions[3].score = 104
          planPositions[4].score = 102
          planPositions[5].score = 103
          break;
        case positionNum - 7:
          planPositions[0].score = 104
          planPositions[1].score = 101
          planPositions[2].score = 103
          planPositions[3].score = 101
          planPositions[4].score = 102
          planPositions[5].score = 103
          break;
        case positionNum - 2:
          planPositions[0].score = 104
          planPositions[1].score = 103
          planPositions[2].score = 101
          planPositions[3].score = 101
          planPositions[4].score = 104
          planPositions[5].score = 103
          break;
        case positionNum - 1:
          planPositions[0].score = 104
          planPositions[1].score = 103
          planPositions[2].isvalid = false
          planPositions[2].score = 0
          planPositions[3].score = 102
          planPositions[4].score = 104
          planPositions[5].score = 103
          break;
        case positionNum + 1:
          planPositions[0].score = 103
          planPositions[1].score = 104
          planPositions[2].score = 102
          planPositions[3].isvalid = false
          planPositions[3].score = 0
          planPositions[4].score = 103
          planPositions[5].score = 104
          break;
        case positionNum + 2:
          planPositions[0].score = 103
          planPositions[1].score = 104
          planPositions[2].score = 101
          planPositions[3].score = 101
          planPositions[4].score = 103
          planPositions[5].score = 104
          break;
        case positionNum + 7:
          planPositions[0].score = 104
          planPositions[1].score = 102
          planPositions[2].score = 101
          planPositions[3].score = 103
          planPositions[4].score = 101
          planPositions[5].score = 104
          break;
        case positionNum + 8:
          planPositions[0].score = 103
          planPositions[1].score = 102
          planPositions[2].score = 104
          planPositions[3].score = 103
          planPositions[4].isvalid = false
          planPositions[4].score = 0
          planPositions[5].score = 104
          break;
        case positionNum + 9:
          planPositions[0].score = 102
          planPositions[1].score = 103
          planPositions[2].score = 103
          planPositions[3].score = 104
          planPositions[4].score = 104
          planPositions[5].isvalid = false
          planPositions[5].score = 0
          break;
        case positionNum + 10:
          planPositions[0].score = 102
          planPositions[1].score = 104
          planPositions[2].score = 102
          planPositions[3].score = 101
          planPositions[4].score = 104
          planPositions[5].score = 101
          break;
        case positionNum + 16:
          planPositions[0].score = 103
          planPositions[1].score = 102
          planPositions[2].score = 104
          planPositions[3].score = 103
          planPositions[4].score = 101
          planPositions[5].score = 104
          break;
        case positionNum + 17:
          planPositions[0].score = 102
          planPositions[1].score = 102
          planPositions[2].score = 104
          planPositions[3].score = 104
          planPositions[4].score = 101
          planPositions[5].score = 101
          break;
        case positionNum + 18:
          planPositions[0].score = 102
          planPositions[1].score = 103
          planPositions[2].score = 103
          planPositions[3].score = 104
          planPositions[4].score = 104
          planPositions[5].score = 101
          break;
        default:
          planPositions[0].score = 100
          planPositions[1].score = 100
          planPositions[2].score = 100
          planPositions[3].score = 100
          planPositions[4].score = 100
          planPositions[5].score = 100
          break;
      }


      //定义组别，左上、右上、左下、右下、上、下、左、右，根据每组中含有的墙数给初始分数做加减
      let groupA, groupB, groupC, groupD, groupTop, groupBottom, groupLeft, groupRight
      groupA = [positionNum - 18, positionNum - 17, positionNum - 10, positionNum - 9, positionNum - 2, positionNum - 1]
      groupB = [positionNum - 17, positionNum - 16, positionNum - 8, positionNum - 7, positionNum + 1, positionNum + 2]
      groupC = [positionNum - 2, positionNum - 1, positionNum + 7, positionNum + 8, positionNum + 16, positionNum + 17]
      groupD = [positionNum + 1, positionNum + 2, positionNum + 9, positionNum + 10, positionNum + 17, positionNum + 18]
      groupTop = [positionNum - 18, positionNum - 17, positionNum - 16, positionNum - 10, positionNum - 9,
      positionNum - 8, positionNum - 7, positionNum - 2, positionNum - 1, positionNum + 1, positionNum + 2]
      groupBottom = [positionNum - 2, positionNum - 1, positionNum + 1, positionNum + 2, positionNum + 7,
      positionNum + 8, positionNum + 9, positionNum + 10, positionNum + 16, positionNum + 17, positionNum + 18]
      groupLeft = [positionNum - 18, positionNum - 17, positionNum - 10, positionNum - 9, positionNum - 2, positionNum - 1,
      positionNum + 7, positionNum + 8, positionNum + 16, positionNum + 17]
      groupRight = [positionNum - 17, positionNum - 16, positionNum - 8, positionNum - 7, positionNum + 1, positionNum + 2,
      positionNum + 9, positionNum + 10, positionNum + 17, positionNum + 18]

      let wallCountOfGroupA = this.getWallCount(groupA)
      let wallCountOfGroupB = this.getWallCount(groupB)
      let wallCountOfGroupC = this.getWallCount(groupC)
      let wallCountOfGroupD = this.getWallCount(groupD)
      let wallCountOfGroupTop = this.getWallCount(groupTop)
      let wallCountOfGroupBottom = this.getWallCount(groupBottom)
      let wallCountOfGroupLeft = this.getWallCount(groupLeft)
      let wallCountOfGroupRight = this.getWallCount(groupRight)

      let wallMost = 0
      wallMost = wallCountOfGroupA >= wallCountOfGroupB ? wallCountOfGroupA : wallCountOfGroupB
      wallMost = wallMost >= wallCountOfGroupC ? wallMost : wallCountOfGroupC
      wallMost = wallMost >= wallCountOfGroupD ? wallMost : wallCountOfGroupD
      switch (wallMost) {
        case wallCountOfGroupA:
          planPositions[0].score -= 1
          planPositions[1].score -= 1
          planPositions[2].score -= 1
          break;
        case wallCountOfGroupB:
          planPositions[0].score -= 1
          planPositions[1].score -= 1
          planPositions[3].score -= 1
          break;
        case wallCountOfGroupC:
          planPositions[2].score -= 1
          planPositions[4].score -= 1
          planPositions[5].score -= 1
          break;
        case wallCountOfGroupD:
          planPositions[3].score -= 1
          planPositions[4].score -= 1
          planPositions[5].score -= 1
          break;
        default:
          break;
      }

      let wallMin = 0
      wallMin = wallCountOfGroupA < wallCountOfGroupB ? wallCountOfGroupA : wallCountOfGroupB
      wallMin = wallMin < wallCountOfGroupC ? wallMost : wallCountOfGroupC
      wallMin = wallMin < wallCountOfGroupD ? wallMost : wallCountOfGroupD
      switch (wallMin) {
        case wallCountOfGroupA:
          planPositions[0].score += 1
          planPositions[1].score += 1
          planPositions[2].score += 1
          break;
        case wallCountOfGroupB:
          planPositions[0].score += 1
          planPositions[1].score += 1
          planPositions[3].score += 1
          break;
        case wallCountOfGroupC:
          planPositions[2].score += 1
          planPositions[4].score += 1
          planPositions[5].score += 1
          break;
        case wallCountOfGroupD:
          planPositions[3].score += 1
          planPositions[4].score += 1
          planPositions[5].score += 1
          break;
        default:
          break;
      }

      if (wallCountOfGroupTop > wallCountOfGroupBottom) {
        planPositions[4].score += 1
        planPositions[5].score += 1
      } else if (wallCountOfGroupTop < wallCountOfGroupBottom) {
        planPositions[0].score += 1
        planPositions[1].score += 1
      }

      if (wallCountOfGroupLeft > wallCountOfGroupRight) {
        planPositions[1].score += 1
        planPositions[3].score += 1
        planPositions[5].score += 1
      } else if (wallCountOfGroupLeft < wallCountOfGroupRight) {
        planPositions[0].score += 1
        planPositions[2].score += 1
        planPositions[4].score += 1
      }

      let maxScore = 0
      for (const item of planPositions) {
        if (this.walls.indexOf(item.position) >= 0) {
          item.score = 0
          item.isvalid = false
        }
        if (item.isvalid && item.score > maxScore) {
          positionNum = item.position
          maxScore = item.score
        }
      }

      if (maxScore > 0) {
        return positionNum
      } else {
        return 0
      }
    },
    getPlanPositions (n) {
      return [n - 9, n - 8, n - 1, n + 1, n + 8, n + 9]
    },
    getWallCount (group) {
      let count = 0
      for (const item of group) {
        if (this.walls.indexOf(item) >= 0) {
          count++
        }
      }
      return count
    }
  },
  mounted () {
    this.initWalls()
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
  list-style: none;
  width: 520px;
  margin: 100px auto;
  li {
    float: left;
    margin: 0 3px;
    height: 48px;
    .hex {
      overflow: hidden;
      display: block;
      width: 50px;
      height: 58px;
      transform: rotate(-60deg) skewY(30deg);
      cursor: default;
      .hexIn {
        background-color: #ccffff;
        display: block;
        width: 50px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        transform: skewY(-30deg) rotate(60deg);
      }
      .wall {
        background: #666699;
        cursor: none;
      }
      .target {
        background: #ffcc00;
        cursor: none;
      }
    }
    &:nth-child(17n + 10) {
      margin-left: 30px;
    }
  }
}
</style>

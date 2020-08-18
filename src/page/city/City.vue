<template>
  <div class="box">
    <header-city :head-title="cityname"></header-city>
    <!-- 搜索框 -->
    <div class="input-item">
      <div class="input-box">
        <input
          type="search"
          placeholder="输入学校、商务楼、地址"
          class="input-style"
          v-model="inputValue"
          @focus="showSearch"
        />
        <el-button type="primary" size="mini" @click="searchPlace">提交</el-button>
      </div>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-show="$store.state.searchResultStatus">
      <ul>
        <li @click="searchPlace(item.name,item.geohash)" v-for="(item,i) in searchresult" :key="i">
          <div>{{item.name}}</div>
          <div>{{item.address}}</div>
        </li>
      </ul>
    </div>

    <!-- 搜索历史 -->
    <div class="history">
      <div class="history-title">
        <span>搜索历史</span>
        <span @click="clearAll">清除所有</span>
      </div>

      <div @click="searchPlace(item.name,item.geohash)" class="content" v-for="(item,i) in historyList" :key="i">{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/common/Header";
import { getCityName, getSearchCity } from "../../service/getData";

export default {
  data() {
    return {
      // 当前城市id
      cityId: 0,
      // 当前城市名
      cityname: "",
      // 搜索地址
      inputValue: "",
      //   搜索地址结果
      searchresult: [],
      // 控制文本框改变，不用添加到历史记录
      flag: false,
      // 历史记录列表
      historyList: [],
    };
  },
  components: {
    "header-city": Header,
  },
  watch: {
    //   根据输入的值，同步请求数据
    inputValue(val) {
      //   if(val.trim() === '') return
      clearTimeout(timer);
      let timer = setTimeout(() => {
        this.flag = true;
        this.searchPlace(this.inputValue);
      }, 300);
    },
  },
  created() {
    this.changeHeader();
  },
  mounted() {
    this.cityId = this.$route.params.cityId;
    // 获得城市名
    getCityName(this.cityId).then((res) => {
      this.cityname = res.data.name;
    });
  },
  methods: {
    //   获取历史数据
    changeHeader() {
      this.$store.commit("changeHeader", "city");
      // 获取历史数据
      var h = window.sessionStorage.getItem("historyData");
      var ary = h === null ? [] : JSON.parse(h);
      this.historyList = ary;
    },
    // 获得搜索城市
    searchPlace(name,geohash) {
        this.searchResult = []
        this.inputValue = name
        console.log(this.cityname);
        console.log(this.cityId);
      getSearchCity(this.cityId, this.inputValue).then((res) => {
          if(res.data.length === 0) {
              return this.$message.error('搜索的地址不存在')
          }
        console.log(res.data);
        this.searchresult = res.data;
      });

      this.$store.commit("changeStatus", true);
    //   阻断搜索框变化，带来的影响
      if (this.flag) {
        this.flag = false;
        return;
      }
      //   设置历史记录
      if (this.inputValue.trim().length === 0) {
        return this.$message.error("输入搜索内容为空！");
      }

      window.sessionStorage.setItem("inputValue", this.inputValue);
      var history = window.sessionStorage.getItem("historyData");
      var arr = history === null ? [] : JSON.parse(history);
      // 判断历史记录中是否有该值
      let obj = {}
      let result = arr.some(item =>{
         return item.name === name
      })
      if (!result) {
        if (arr.length <= 10) {
            obj.name = name
            obj.geohash = geohash
          arr.unshift(obj);
        } else {
          arr.splice(9, 1);
          obj.name = name
            obj.geohash = geohash
          arr.unshift(obj);
        }
      }
      window.sessionStorage.setItem("historyData", JSON.stringify(arr));
      this.changeHeader()
      this.$router.push({path:'/msite', query:{geohash}})
    },
    // 显示搜索结果
    showSearch(el) {
      // 获得搜索结果
      // this.searchPlace()
      var searchResult = document.querySelector(".search-result");
      window.onclick = (e) => {
        if (!searchResult.contains(e.target) && !el.target.contains(e.target)) {
          this.$store.commit("changeStatus", false);
          window.onclick = null;
        }
      };
    },
    // 清除所有
    clearAll() {
      this.historyList.splice(0)
      window.sessionStorage.setItem('historyData',
      JSON.stringify(this.historyList))
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

.box {
  width: 100%;
}

.input-item {
  position: relative;
  height: 4rem;
  top: 2rem;
  background-color: #fff;
  margin: 0.25rem 0;
  border-top: 2px solid #e4e4e4;
  border-bottom: 2px solid #e4e4e4;

  .input-box {
    width: 85%;
    @include titleCenter;
    margin-top: 0.35rem;

    .el-button {
      margin-top: 0.5rem;
      width: 100%;
    }
  }

  .input-style {
    width: 100%;
    padding: 0.25rem 0.5rem;
    border: 1px solid $bc;
    outline: none;
  }
}

.search-result {
  margin-top: 2.5rem;
  border-top: 2px solid $bc;
  border-bottom: 2px solid $bc;
  background-color: #fff;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul li {
    @include itemli;

    div:nth-child(1) {
      line-height: 1.5rem;
    }

    div:nth-child(2) {
      font-size: 0.45rem;
      opacity: 0.6;
    }
  }
}

.history {
  border-top: 2px solid $bc;
  border-bottom: 2px solid $bc;
  background-color: #fff;
  margin-top: 2rem;

  .history-title {
    width: 100%;
    border-bottom: 1px solid $bc;

    span:nth-child(1) {
      font-size: 0.7rem;
      opacity: 0.6;
      font-weight: 400;
      padding: 0 0.5rem;
    }

    span:nth-child(2) {
      font-size: 0.5rem;

      opacity: 0.7;
    }
  }

  .content {
    @include itemli;
  }
}
</style>
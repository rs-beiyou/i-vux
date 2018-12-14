<template>
  <div class="cars-page">
    <div class="cars-search">
      <Input size="large" search enter-button placeholder="请输入关键词，如：奥迪" />
    </div>
    <div class="cars-filter">
      <RadioList v-model="brand" :list="brandList" label="品牌"></RadioList>
      <Divider class="cars-divider"/>
      <RadioList v-model="series" :list="seriesList" label="车系"></RadioList>
      <Divider class="cars-divider"/>
      <RadioList v-model="price" :list="priceList" label="价格"></RadioList>
      <Divider class="cars-divider"/>
      <label class="radio-label">更多</label>
      <Dropdown class="drop-group" placement="bottom-start">
        <div class="drop-check">车型<Icon type="ios-arrow-down"></Icon></div>
        <div class="drop-check-content" slot="list">
          <CheckboxGroup v-model="model">
            <Checkbox large label="1">
              <span>微型车</span>
            </Checkbox>
            <Checkbox large label="2">
              <span>小型车</span>
            </Checkbox>
            <Checkbox large label="3">
              <span>中型车</span>
            </Checkbox>
            <Checkbox large label="4">
              <span>豪华车</span>
            </Checkbox>
          </CheckboxGroup>
          <div class="drop-btn">
            <Button type="primary" size="small">确定</Button>
          </div>
        </div>
      </Dropdown>
      <Dropdown class="drop-group">
        <div class="drop-check">车龄<Icon type="ios-arrow-down"></Icon></div>
        <div class="drop-check-content" slot="list">
          <CheckboxGroup v-model="model">
            <Checkbox large label="1">
              <span>1年以内</span>
            </Checkbox>
            <Checkbox large label="2">
              <span>3年以内</span>
            </Checkbox>
            <Checkbox large label="3">
              <span>5年以内</span>
            </Checkbox>
            <Checkbox large label="4">
              <span>5年以上</span>
            </Checkbox>
          </CheckboxGroup>
          <div class="drop-btn">
            <Button type="primary" size="small">确定</Button>
          </div>
        </div>
      </Dropdown>
    </div>
    <div class="cars-list">
      <Row type="flex" justify="space-between">
        <Col span="5" v-for="item in carList" :key="item.id" @click.native="loadDetail(item)">
          <Card class="car-card" :bordered="false">
            <div class="car-img">
              <img src="../../assets/benjamin.jpg" alt="">
            </div>
            <div class="car-title">{{item.title}}</div>
            <div class="car-desc">{{item.date}} / {{item.mileage}}</div>
          </Card>
        </Col>
      </Row>
      <Page :total="50" show-elevator />
    </div>
  </div>
</template>
<script>
import RadioList from '@/components/RadioList'
import { mapActions } from 'vuex'
export default {
  name: 'cars',
  components: {
    RadioList
  },
  data () {
    return {
      brand: '',
      series: '',
      price: '',
      model: [],
      brandList: [],
      seriesList: [],
      priceList: [],
      carList: []
    }
  },
  created () {
    this.getList()
  },
  mounted () {
    this.getCarList()
  },
  methods: {
    ...mapActions([
      'getBrand',
      'getSeries',
      'getPrice',
      'getCars'
    ]),
    getList () {
      this.getBrand().then(res => {
        this.brandList = res
      })
      this.getSeries().then(res => {
        this.seriesList = res
      })
      this.getPrice().then(res => {
        this.priceList = res
      })
    },
    getCarList () {
      this.getCars({ number: 20 }).then(res => {
        this.carList = res
      })
    },
    loadDetail (item) {
      window.open(`/car/${item.id}`, '_blank')
    }
  }
}
</script>
<style lang="less">
.cars-page{
  flex-direction: column;
  .cars-search{
    width: 100%;
    padding: 20px 300px;
  }
  .cars-filter{
    background-color: #f8f8f8;
    padding: 20px;
    margin-bottom: 30px;
  }
  .cars-divider{
    margin: 10px 0;
  }
}
.drop-group{
  margin-right: 1em;
  &:hover{
    .drop-check{
      color: #fd521d;
    }
  }
}
.drop-check{
  padding: 3px 10px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #dcdee2;
  border-radius: 2px;
  i{
    margin-left: 5px;
  }
}
.drop-check-content{
  max-width: 200px;
  padding: 10px;
  .ivu-checkbox-group-item{
    margin: 3px 10px;
  }
  .drop-btn{
    width: 100%;
    text-align: center;
    padding-top: 10px;
  }
}
.cars-list{
  text-align: center;
  .car-card{
    display: inline-block;
    width: 100%;
    height: 250px;
    overflow: hidden;
    cursor: pointer;
    margin-bottom: 20px;
    text-align: left;
    .ivu-card-body{
      padding: 0;
    }
    .car-img{
      width: 100%;
      height: 100%;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .car-title{
      padding: 3px 5px;
    }
    .car-desc{
      font-size: 12px;
      color: #808695;
      padding: 3px 5px;
    }
    &:hover .car-desc,&:hover .car-title{
      color: #fd521d;
    }
  }
}
</style>

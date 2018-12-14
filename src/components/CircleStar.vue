<template>
  <div class="circle-star">
    <div class="circle-item circle-lg">
      <div class="circle-body">
        <div class="circle-dot dot-yellow"></div>
      </div>
    </div>
    <div class="circle-item circle-md">
      <div class="circle-body">
        <div class="circle-dot dot-blue"></div>
      </div>
    </div>
    <div class="circle-item circle-xs">
      <div class="circle-body">
        <div class="circle-dot dot-green"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  name: 'CircleStar'
}
</script>
<style lang="less">
.circle-star{
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  .circle-item{
    position: absolute;
    display: inline-block;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  .circle-body{
    width: 100%;
    height: 100%;
    animation: login-spin 4s infinite linear;
  }
  .circle-lg{
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    .circle-body{
      animation-delay: .5s;
    }
  }
  .circle-md{
    width: 70%;
    height: 70%;
    border: 1px solid #e8e7e7;
    .circle-body{
      animation-delay: .8s;
    }
  }
  .circle-xs{
    width: 40%;
    height: 40%;
    border: 1px solid #d8d6d6;
    .circle-body{
      animation-delay: 1.1s;
    }
  }
  .circle-dot{
    position: absolute;
    top: 50%;
    left: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    border: 5px solid;
    box-sizing: border-box;
    // opacity: .7;
    background-color: #fff;
  }
  .dot-yellow{
    border-color: #f1d92b;
  }
  .dot-blue{
    border-color: #2d8cf0;
  }
  .dot-green{
    border-color: #19be6b;
  }
}
@keyframes login-spin {
  from { transform: rotate(0deg);}
  50%  { transform: rotate(180deg);}
  to   { transform: rotate(360deg);}
}
</style>

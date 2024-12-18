<template>
  <div class="hello">
    <p>Inited? : {{ inited }}</p>
    <p>granted? : {{ granted }}</p>
    <p>available? : {{ available }}</p>
    <button @click="open()">ACCESS GEO</button>
    <button>GET GEO</button>
    <p>{{ data }}</p>

    <div id="YMapsID" style="width: 450px; height: 350px;"></div>

  </div>
</template>

<script>

export default {

  name: 'HelloWorld',
  data(){
    return {
      inited : false,
      granted: false,
      available : false,
      map : null,
      data : "",
    
    }
  },
  methods : {
    open(){
      this.Telegram.WebApp.MainButton.show();
    }
  },
  mounted(){
    this.inited = this.Telegram.WebApp.LocationManager.isInited;
    this.Telegram.WebApp.LocationManager.init(()=>{
      console.log("inited");
      this.inited = this.Telegram.WebApp.LocationManager.isInited;
      this.granted = this.Telegram.WebApp.LocationManager.isAccessGranted;
      this.available = this.Telegram.WebApp.LocationManager.isLocationAvailable;
      
      if(this.Telegram.WebApp.LocationManager.isLocationAvailable){
        if(!this.Telegram.WebApp.LocationManager.isAccessGranted){
          this.Telegram.WebApp.LocationManager.openSettings();
        }
        else{
          this.Telegram.WebApp.LocationManager.getLocation((data)=>{
            this.data = JSON.stringify(data)
            this.ymaps.ready(()=>{
              let map = new this.ymaps.Map("YMapsID",{
                center : [data.latitude,data.longitude],
                zoom: 15
              })
              map.behaviors.disable('controls');
              var myPlacemark = new this.ymaps.Placemark([data.latitude,data.longitude],{},{
                preset : "islands#redCircleDotIcon"
              });
              map.geoObjects.add(myPlacemark);
              })
          })
        }
        
      }
     
    })

    this.Telegram.WebApp.MainButton.onClick(()=>{
      this.Telegram.WebApp.LocationManager.getLocation((data)=>{
            
            this.data = JSON.stringify(data)
          })
      })
      
    
   

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  button{
    background-color: #3ac3ea;
    color: #000;
    border-radius: 5px;
    border: none;
    padding: 10px;
    font-family: Arial;
  }
  .hello{
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  p{
    color: #fff;
  }
</style>

var eventsMediator = {
    events: {},
    on: function (eventName, callbackfn) {
      this.events[eventName] = this.events[eventName]
        ? this.events[eventName]
        : [];
      this.events[eventName].push(callbackfn);
    },
    emit: function (eventName, data) {
      if (this.events[eventName]) {
        this.events[eventName].forEach(function (callBackfn) {
          callBackfn(data);
        });
      }
    },
  };
  
 
  


var model = {
    currentNews: 0,
    data: [
        {
            countryName: 'France',
            countryImg: './assets/images/Flag_of_France.svg.png',
            api:'https://newsapi.org/v2/top-headlines?country=fr&apiKey=8b3f1237ef704b36aeaabc30551c5aaa'
        },
        {
            countryName: 'Italy',
            countryImg: './assets/images/Flag_of_Italy.svg.png',
            api:'https://newsapi.org/v2/top-headlines?country=it&apiKey=8b3f1237ef704b36aeaabc30551c5aaa'
        },
        {
            countryName: 'Brazil',
            countryImg: './assets/images/download.png',
            api:'https://newsapi.org/v2/top-headlines?country=br&apiKey=8b3f1237ef704b36aeaabc30551c5aaa'
        },
        {
            countryName: 'Egypt',
            countryImg: './assets/images/egypt.png',
            api:'https://newsapi.org/v2/top-headlines?country=eg&apiKey=8b3f1237ef704b36aeaabc30551c5aaa'
        },
        {
            countryName: 'Argentina',
            countryImg: './assets/images/Argentina_Flag.png',
            api:'https://newsapi.org/v2/top-headlines?country=ar&apiKey=8b3f1237ef704b36aeaabc30551c5aaa'
        },

    
    ]
}

var carouselView = {
    render: function () {
        var myData = model.data;
        const template = document.getElementById('template').innerHTML;
        const rendered = Mustache.render(template, {myData});
        eventsMediator.on("changeNews", function (data) {
            model.currentNews = data;
          });
        console.log(rendered);
        $(".owl-carousel").html(rendered) ;
        $(".owl-carousel").owlCarousel({
            navigation: false,
            nav:true,
            loop:true,
            dots: true,
            slideSpeed: 300,   
            paginationSpeed: 400,
            items: 1,
            itemsDesktop: false,
            itemsDesktopSmall: false,
            itemsTablet: false,  
            itemsMobile: false,
            autoHeight:false,   
            });
            
      },

      clickFunction(){
        $('img').on('click',function(e){
            
            $.ajax(
                {
                    url: model.data.find(item => item.countryName == e.target.id).api,
                    success:function(result){
                        
                        eventsMediator.emit("changeNews", result);
                        newsView.render()

                    }
                }
            )
        })
      }
}

var newsView = {
    render: function () {
        var articles = model.currentNews.articles;
        const template = document.getElementById('template-2').innerHTML;
        const rendered = Mustache.render(template, {articles});
        console.log(articles);
        $("#target").html(rendered) ;
           
      },
}

var controller = {
    init:function(){
        carouselView.render();
        carouselView.clickFunction();
        
    }
}

controller.init();
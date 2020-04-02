var pageImageUrl="http://www.88k88.cn:9090/Server-files/Images/pageImage/";
$.fn.regionContainerHTML=function(obj){
    var str="";
    if(obj.sign=="data-v-1"){
        str='<div data-v-1 class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="ncss-row title" target="_blank">'+
            '     <a href="'+obj.infoList[0].info+'" class="ncss-row edit" target="_blank">\n' +
            '       <div class="va-sm-t ncss-col edit edit-label-region '+obj.infoList[1].info+'" data-class="va-sm-t ncss-col edit edit-label-region">\n' +
            '         <h2 class="edit">'+obj.infoList[2].info+'</h2>\n' +
            '       </div>\n' +
            '     </a>\n' +
            '  </div>'+
            '  <div class="region-box">\n' +
            '    <div class="left-box ncss-col">\n' +
            '      <div class="image-card">\n' +
            '        <div class="_12NrIYxy">\n' +
            '          <div class="react-reveal">\n' +
            '            <div class="image-media">\n' +
            '              <a href="'+obj.infoList[3].info+'" class="edit edit-img-region" target="_blank" >\n'+
            '                <img src="'+pageImageUrl+obj.infoList[4].info+'" class="edit">\n';
                        //str+=isHasImg(pageImageUrl+obj.infoList[4].info,"edit");
        str+='              </a>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '        </div>\n' +
            '        <div class="card-overlay-content edit '+obj.infoList[5].info+'" data-class="card-overlay-content edit">\n' +
            '          <a href="'+obj.infoList[6].info+'" class="edit" target="_blank">\n' +
            '            <div class="edit edit-label-region '+obj.infoList[7].info+'" data-class="edit edit-label-region">\n' +
            '              <p class="text edit">'+obj.infoList[8].info+'</p>\n' +
            '              <p class="text edit">'+obj.infoList[9].info+'</p>\n' +
            '            </div>\n' +
            '          </a>\n' +
            '          <a href="'+obj.infoList[10].info+'" class="edit" target="_blank">\n' +
            '            <div class="cta-btn edit-btn-region edit '+obj.infoList[11].info+'" data-class="cta-btn edit-btn-region edit">\n' +
            '              <span class="edit">'+obj.infoList[12].info+'</span>\n' +
            '            </div>\n' +
            '          </a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '    <div class="right-box ncss-col">\n' +
            '      <div class="image-card">\n' +
            '        <div class="_12NrIYxy">\n' +
            '          <div class="react-reveal">\n' +
            '            <div class="image-media">\n' +
            '              <a href="'+obj.infoList[13].info+'" class="edit edit-img-region" target="_blank" >\n' +
            '                <img src="'+pageImageUrl+obj.infoList[14].info+'" class="edit">\n' +
            '              </a>\n' +
            '            </div>\n' +
            '          </div>\n' +
            '        </div>\n' +
            '        <div class="card-overlay-content edit '+obj.infoList[15].info+'" data-class="card-overlay-content edit">\n' +
            '          <a href="'+obj.infoList[16].info+'" class="edit" target="_blank">\n' +
            '            <div class="edit edit-label-region '+obj.infoList[17].info+'" data-class="edit edit-label-region">\n' +
            '              <p class="text edit">'+obj.infoList[18].info+'</p>\n' +
            '              <p class="text edit">'+obj.infoList[19].info+'</p>\n' +
            '            </div>\n' +
            '          </a>\n' +
            '          <a href="'+obj.infoList[20].info+'" class="edit" target="_blank">\n' +
            '            <div class="cta-btn edit-btn-region edit '+obj.infoList[21].info+'" data-class="cta-btn edit-btn-region edit">\n' +
            '              <span class="edit">'+obj.infoList[22].info+'</span>\n' +
            '            </div>\n' +
            '          </a>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-2"){
        str='<div data-v-2 class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="section-box-row">\n' +
            '    <div class="index-center-wrapper">\n' +
            '      <ul class="clearfix">\n' +
            '        <li class="goods">\n' +
            '          <div class="goods-box">\n' +
            '            <a href="'+obj.infoList[0].info+'" class="box-img edit edit-img-region" target="_blank">\n' +
            '              <img class="goods-set-img goods-img edit" src="'+pageImageUrl+obj.infoList[1].info+'">\n' +
            '              <span class="box-info box-ad-info edit edit-label-region '+obj.infoList[2].info+'" data-class="box-info box-ad-info edit edit-label-region">\n' +
            '                <span class="goods-name edit">'+obj.infoList[3].info+'</span>\n' +
            '                <span class="goods-desc edit">'+obj.infoList[4].info+'</span>\n' +
            '                <span class="goods-price edit">'+obj.infoList[5].info+'</span>\n' +
            '              </span>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '        </li>\n' +
            '        <li>\n' +
            '          <div class="goods-box">\n' +
            '            <a href="'+obj.infoList[6].info+'" class="box-img edit edit-img-region" target="_blank">\n' +
            '                <img class="goods-img edit" src="'+pageImageUrl+obj.infoList[7].info+'">\n' +
            '                <span class="box-info edit edit-label-region '+obj.infoList[8].info+'" data-class="box-info edit edit-label-region">\n' +
            '                  <span class="goods-name edit">'+obj.infoList[9].info+'</span>\n' +
            '                  <span class="goods-desc edit">'+obj.infoList[10].info+'</span>\n' +
            '                  <span class="goods-price edit">'+obj.infoList[11].info+'</span>\n' +
            '                </span>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '        </li>\n' +
            '        <li>\n' +
            '          <div class="goods-box">\n' +
            '            <a href="'+obj.infoList[12].info+'" class="box-img edit edit-img-region" target="_blank">\n' +
            '                <img class="goods-img edit" src="'+pageImageUrl+obj.infoList[13].info+'">\n' +
            '                <span class="box-info edit edit-label-region '+obj.infoList[14].info+'" data-class="box-info edit edit-label-region">\n' +
            '                  <span class="goods-name edit">'+obj.infoList[15].info+'</span>\n' +
            '                  <span class="goods-desc edit">'+obj.infoList[16].info+'</span>\n' +
            '                  <span class="goods-price edit">'+obj.infoList[17].info+'</span>\n' +
            '                </span>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '        </li>\n' +
            '        <li>\n' +
            '          <div class="goods-box">\n' +
            '            <a href="'+obj.infoList[18].info+'" class="box-img edit edit-img-region" target="_blank">\n' +
            '                <img class="goods-img edit" src="'+pageImageUrl+obj.infoList[19].info+'">\n' +
            '                <span class="box-info edit edit-label-region '+obj.infoList[20].info+'" data-class="box-info edit edit-label-region">\n' +
            '                  <span class="goods-name edit">'+obj.infoList[21].info+'</span>\n' +
            '                  <span class="goods-desc edit">'+obj.infoList[22].info+'</span>\n' +
            '                  <span class="goods-price edit">'+obj.infoList[23].info+'</span>\n' +
            '                </span>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '        </li>\n' +
            '      </ul>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-3"){
        str='<div data-v-3 data-sign="data-v-3" class="region-container" data-prid='+obj.prId+'>\n' +
            '    <div class="article article-kv-image">\n' +
            '        <a href="'+obj.infoList[0].info+'" target="_blank" class="edit edit-img-region" style="min-height: 350px;display: flex;">\n' +
            '            <img src='+pageImageUrl+obj.infoList[1].info+'  class="edit">\n' +
            '        </a>\n' +
            '        <div class="item-info edit '+obj.infoList[2].info+'" data-class="item-info edit">\n' +
            '            <a href="'+obj.infoList[3].info+'" class="edit"  target="_blank">\n' +
            '            	<div class="edit edit-label-region '+obj.infoList[4].info+'" data-class="edit edit-label-region">'+
                    '           <h5 class="edit">'+obj.infoList[5].info+'</h5>\n' +
                '               <p class="edit">'+obj.infoList[6].info+'</p>\n' +
                '               <p class="edit">'+obj.infoList[7].info+'</p>\n' +
            '            	</div>'+
            '            </a>\n' +
            '            <a class="edit" href="'+obj.infoList[8].info+'" target="_blank">\n' +
                            '<div class="btn-have-opacity edit-btn-region edit '+obj.infoList[9].info+'" data-class="btn-have-opacity edit-btn-region edit">'+
                '                <span class="edit">'+obj.infoList[10].info+'</span>\n' +
                '                <span class="icon-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>\n' +
                            '</div>'+
            '            </a>\n' +
            '            <a class="edit" href="'+obj.infoList[11].info+'" target="_blank">\n' +
                            '<div class="btn-have-opacity edit-btn-region edit '+obj.infoList[12].info+'" data-class="btn-have-opacity edit-btn-region edit">'+
                '                <span class="edit">'+obj.infoList[13].info+'</span>\n' +
                '                <span class="icon-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>\n' +
                            '</div>'+
            '            </a>\n' +
            '        </div>\n' +
            '    </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-4"){
        str='<div data-v-4 data-sign="data-v-4" class="region-container"  data-prid='+obj.prId+'>\n' +
            '  <a href="'+obj.infoList[0].info+'" target="_blank" class="edit clp-feature-hero edit-img-region">\n' +
            '    <img class="edit" src="'+pageImageUrl+obj.infoList[1].info+'"/>\n' +
            '  </a>\n' +
            '  <div class="max-wrap">\n' +
                '  <div class="indexImg">\n' +
                '    <a href="'+obj.infoList[2].info+'" target="_blank" class="edit edit-img-region"> \n' +
                '      <img class="edit" src="'+pageImageUrl+obj.infoList[3].info+'">\n' +
                '    </a>\n' +
                '  </div>\n' +
                '  <div class="content">\n' +
                '    <a href="'+obj.infoList[4].info+'" target="_blank" class="edit title">\n' +
                '      <div class="edit edit-label-region '+obj.infoList[5].info+'" data-class="edit edit-label-region">\n' +
                '        <span class="edit">'+obj.infoList[6].info+'</span>\n' +
                '      </div>\n' +
                '    </a>\n' +
                '    <a href="'+obj.infoList[7].info+'" target="_blank" class="edit featureHero-minTit">\n' +
                '      <div class="edit edit-label-region text '+obj.infoList[8].info+'" data-class="text edit edit-label-region">\n' +
                '        <span class="edit">'+obj.infoList[9].info+'</span>\n' +
                '      </div>\n' +
                '    </a>\n' +
                '    <div class="featureHero-button">\n' +
                '      <div class="edit '+obj.infoList[10].info+'" data-class="edit">\n' +
                '        <a href="'+obj.infoList[11].info+'" class="edit" target="_blank">\n' +
                '          <div class="clp-btn edit edit-btn-region '+obj.infoList[12].info+'" data-class="clp-btn edit edit-btn-region">\n' +
                '            <span class="edit">'+obj.infoList[13].info+'</span>\n' +
                '          </div>\n' +
                '        </a>\n' +
                '      </div>\n' +
                '      <div class="edit '+obj.infoList[14].info+'" data-class="edit">\n' +
                '        <a href="'+obj.infoList[15].info+'" class="edit" target="_blank">\n' +
                '          <div class="clp-btn edit edit-btn-region '+obj.infoList[16].info+'" data-class="clp-btn edit edit-btn-region">\n' +
                '            <span class="edit">'+obj.infoList[17].info+'</span>\n' +
                '          </div>\n' +
                '        </a>\n' +
                '      </div>\n' +
                '    </div>\n' +
                '  </div>\n' +
                '  <div class="video-bitmap">\n' +
                '    <a href="'+obj.infoList[18].info+'" class="edit edit-img-region" target="_blank">\n' +
                '      <img class="edit" src="'+pageImageUrl+obj.infoList[19].info+'">\n' +
                '    </a>\n' +
                '  </div>\n' +
            '  </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-5"){
        str='<div data-v-5 class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="product-list max-wrap">\n' +
            '    <a href="'+obj.infoList[0].info+'" class="edit " target="_blank">\n' +
            '      <div class="edit edit-label-region '+obj.infoList[1].info+'" data-class="edit edit-label-region ">\n' +
            '        <h3 class="edit">'+obj.infoList[2].info+'</h3>\n' +
            '      </div>\n' +
            '    </a>\n' +
            '    <div class="product-list-container">\n' +
            '      <div class="swiper-container"> \n' +
            '        <div class="swiper-wrapper">\n' +
            '          <div class="swiper-slide edit '+obj.infoList[3].info+'" data-class="swiper-slide edit">\n' +
            '            <a href="'+obj.infoList[4].info+'" class="edit edit-img-region" target="_blank">\n' +
            '              <img src="'+pageImageUrl+obj.infoList[5].info+'" class="edit">\n' +
            '              <div class="btn edit edit-btn-region '+obj.infoList[6].info+'" data-class="btn edit edit-btn-region">\n' +
            '                <div class="edit">'+obj.infoList[7].info+'</div>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '            <div class="line"></div>\n' +
            '            <a class="edit" href="'+obj.infoList[8].info+'" target="_blank">\n' +
            '              <div class="title edit edit-label-region '+obj.infoList[9].info+'" data-class="title edit edit-label-region">\n' +
            '                <p class="edit">'+obj.infoList[10].info+'</p>\n' +
            '                <p class="edit ">'+obj.infoList[11].info+'</p>\n' +
            '              </div>\n' +
            '              <div class="currentPrice edit edit-label-region '+obj.infoList[12].info+'" data-class="currentPrice edit edit-label-region">\n' +
            '                <span class="edit">'+obj.infoList[13].info+'</span>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '          <div class="swiper-slide edit '+obj.infoList[14].info+'" data-class="swiper-slide edit">\n' +
            '            <a href="'+obj.infoList[15].info+'" class="edit edit-img-region" target="_blank">\n' +
            '              <img src="'+pageImageUrl+obj.infoList[16].info+'" class="edit">\n' +
            '              <div class="btn edit edit-btn-region '+obj.infoList[17].info+'" data-class="btn edit edit-btn-region">\n' +
            '                <div class="edit">'+obj.infoList[18].info+'</div>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '            <div class="line"></div>\n' +
            '            <a class="edit" href="'+obj.infoList[19].info+'" target="_blank">\n' +
            '              <div class="title edit edit-label-region '+obj.infoList[20].info+'" data-class="title edit edit-label-region">\n' +
            '                <p class="edit">'+obj.infoList[21].info+'</p>\n' +
            '                <p class="edit ">'+obj.infoList[22].info+'</p>\n' +
            '              </div>\n' +
            '              <div class="currentPrice edit edit-label-region '+obj.infoList[23].info+'" data-class="currentPrice edit edit-label-region">\n' +
            '                <span class="edit">'+obj.infoList[24].info+'</span>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '          <div class="swiper-slide edit '+obj.infoList[25].info+'" data-class="swiper-slide edit">\n' +
            '            <a href="'+obj.infoList[26].info+'" class="edit edit-img-region" target="_blank">\n' +
            '              <img src="'+pageImageUrl+obj.infoList[27].info+'" class="edit">\n' +
            '              <div class="btn edit edit-btn-region '+obj.infoList[28].info+'" data-class="btn edit edit-btn-region">\n' +
            '                <div class="edit">'+obj.infoList[29].info+'</div>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '            <div class="line"></div>\n' +
            '            <a class="edit" href="'+obj.infoList[30].info+'" target="_blank">\n' +
            '              <div class="title edit edit-label-region '+obj.infoList[31].info+'" data-class="title edit edit-label-region">\n' +
            '                <p class="edit">'+obj.infoList[32].info+'</p>\n' +
            '                <p class="edit ">'+obj.infoList[33].info+'</p>\n' +
            '              </div>\n' +
            '              <div class="currentPrice edit edit-label-region '+obj.infoList[34].info+'" data-class="currentPrice edit edit-label-region">\n' +
            '                <span class="edit">'+obj.infoList[35].info+'</span>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '          <div class="swiper-slide edit '+obj.infoList[36].info+'" data-class="swiper-slide edit">\n' +
            '            <a href="'+obj.infoList[37].info+'" class="edit edit-img-region" target="_blank">\n' +
            '              <img src="'+pageImageUrl+obj.infoList[38].info+'" class="edit">\n' +
            '              <div class="btn edit edit-btn-region '+obj.infoList[39].info+'" data-class="btn edit edit-btn-region">\n' +
            '                <div class="edit">'+obj.infoList[40].info+'</div>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '            <div class="line"></div>\n' +
            '            <a class="edit" href="'+obj.infoList[41].info+'" target="_blank">\n' +
            '              <div class="title edit edit-label-region '+obj.infoList[42].info+'" data-class="title edit edit-label-region">\n' +
            '                <p class="edit">'+obj.infoList[43].info+'</p>\n' +
            '                <p class="edit ">'+obj.infoList[44].info+'</p>\n' +
            '              </div>\n' +
            '              <div class="currentPrice edit edit-label-region '+obj.infoList[45].info+'" data-class="currentPrice edit edit-label-region">\n' +
            '                <span class="edit">'+obj.infoList[46].info+'</span>\n' +
            '              </div>\n' +
            '            </a>\n' +
            '          </div>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-6"){
        str='<div data-v-6 data-sign="data-v-6" class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="article article-banner">\n' +
            '    <div class="sub-banner">\n' +
            '      <div class="banner-iterm">\n' +
            '        <div class="item-wrapper" >\n' +
            '          <a href="'+obj.infoList[0].info+'" target="_blank" class="edit edit-img-region">\n' +
            '            <img src="'+pageImageUrl+obj.infoList[1].info+'" class="edit">\n' +
            '          </a>\n' +
            '          <div class="item-info edit '+obj.infoList[2].info+'" data-class="item-info edit" >\n' +
            '            <a href="'+obj.infoList[3].info+'" class="edit" target="_blank">\n' +
                        '    <div class="edit-label-region edit '+obj.infoList[4].info+'" data-class="edit edit-label-region">\n' +
                        '      <h5 class="edit">'+obj.infoList[5].info+'</h5>\n' +
                        '      <p class="edit">'+obj.infoList[6].info+'</p>\n' +
                        '      <p class="edit">'+obj.infoList[7].info+'</p>\n' +
                        '    </div>'+
            '            </a>\n' +
                        '<a href="'+obj.infoList[8].info+'" class="edit" target="_blank">\n' +
                    '      <div class="btn-have-opacity edit-btn-region edit '+obj.infoList[9].info+'" data-class="edit btn-have-opacity edit-btn-region">\n' +
                    '        <span class="edit">'+obj.infoList[10].info+'</span>\n' +
                    '        <span class="icon-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>\n' +
                    '      </div>\n' +
                    '    </a>'+
            '          </div>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '      <div class="banner-iterm">\n' +
            '        <div class="item-wrapper" >\n' +
            '          <a href="'+obj.infoList[11].info+'" target="_blank" class="edit edit-img-region">\n' +
            '            <img src="'+pageImageUrl+obj.infoList[12].info+'" class="edit">\n' +
            '          </a>\n' +
            '          <div class="item-info edit '+obj.infoList[13].info+'" data-class="item-info edit" >\n' +
            '            <a href="'+obj.infoList[14].info+'" class="edit" target="_blank">\n' +
                        '    <div class="edit-label-region edit '+obj.infoList[15].info+'" data-class="edit edit-label-region">\n' +
                        '      <h5 class="edit">'+obj.infoList[16].info+'</h5>\n' +
                        '      <p class="edit">'+obj.infoList[17].info+'</p>\n' +
                        '      <p class="edit">'+obj.infoList[18].info+'</p>\n' +
                        '    </div>'+
            '            </a>\n' +
                        '<a href="'+obj.infoList[19].info+'" class="edit" target="_blank">\n' +
                    '      <div class="btn-have-opacity edit-btn-region edit '+obj.infoList[20].info+'" data-class="edit btn-have-opacity edit-btn-region">\n' +
                    '        <span class="edit">'+obj.infoList[21].info+'</span>\n' +
                    '        <span class="icon-arrow"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></span>\n' +
                    '      </div>\n' +
                    '    </a>'+
            '          </div>\n' +
            '        </div>\n' +
            '      </div>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-7"){
        str='<div data-v-7 class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="title">'+
            '  	  <a href="'+obj.infoList[0].info+'" class="edit" target="_blank">\n' +
            '       <div class="section-title edit edit-label-region '+obj.infoList[1].info+'" data-class="section-title edit edit-label-region">\n' +
            '         <h3 class="edit">'+obj.infoList[2].info+'</h3>\n' +
            '       </div>\n' +
            '     </a>\n' +
            '  </div>'+
            '  <div class="section-box-adv">\n' +
            '    <a href="'+obj.infoList[3].info+'" class="box-adv-ad edit edit-img-region" target="_blank">\n' +
            '      <img src="'+pageImageUrl+obj.infoList[4].info+'" class="edit">\n' +
            '    </a>\n' +
            '  </div>\n' +
            '</div>';
    }
    else if(obj.sign=="data-v-8"){
        str='<div data-v-8 class="region-container" data-prid='+obj.prId+'>\n' +
            '  <div class="flexslider">\n' +
            '    <ul class="slides">\n' +
            '      <li>\n' +
            '        <a class="img edit edit-img-region" href="'+obj.infoList[0].info+'" target="_blank">\n' +
            '          <img class="edit" src="'+pageImageUrl+obj.infoList[1].info+'"/>\n' +
            '        </a>\n' +
            '      </li>\n' +
            '      <li>\n' +
            '        <a class="img edit edit-img-region" href="'+obj.infoList[2].info+'" target="_blank">\n' +
            '          <img class="edit" src="'+pageImageUrl+obj.infoList[3].info+'"  alt="" />\n' +
            '        </a>\n' +
            '      </li>\n' +
            '      <li>\n' +
            '        <a class="img edit edit-img-region" href="'+obj.infoList[4].info+'" target="_blank">\n' +
            '          <img class="edit" src="'+pageImageUrl+obj.infoList[5].info+'"  alt="" />\n' +
            '        </a>\n' +
            '      </li>\n' +
            '      <li>\n' +
            '        <a class="img edit edit-img-region" href="'+obj.infoList[6].info+'" target="_blank">\n' +
            '          <img class="edit" src="'+pageImageUrl+obj.infoList[7].info+'"  alt="" />\n' +
            '        </a>\n' +
            '      </li>\n' +
            '    </ul>\n' +
            '  </div>\n' +
            '</div>';
    }
    $(this).append(str);
}

function isHasImg(){
    //var $img;
    // $("<img/>").attr("src",url).load(function() {
    //     if( this.width > 0 || this.height > 0){
    //         $(this).attr("src",className);
    //         $img=$(this);
    //         alert($(this).attr("class"));
    //     }else{
    //         $img=$(this);
    //     }
    // })
    //var $this="<img/>";
    var img = event.srcElement;
    img.src = "http://www.88k88.cn:9090/Server-files/Images/pageImage/634AC74BAF894DAC92.png";
    // img.onload = function(){
    //     if( img.width > 0 || img.height > 0){
    //         $this="<img src="+url+" class="+className+"/>";
    //     }
    // } 
    img.onerror = null;
    

}
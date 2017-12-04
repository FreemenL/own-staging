import Config from 'libs/const';
import ajax from 'libs/ajax';

const MixinStore={
    ajaxPost:ajax.post,
    ajaxGet:ajax.get,
    //获取微信签名
    getWxSign(callback) {
        var params = {
            'url':location.href.split('#')[0]
        };
        var requestUrl='ticket/sign';
        this.ajaxPost(requestUrl,params,function(data) {
            callback && callback(data);
        });
    },
    //获取地理位置
    getLocation(lng, lat) {
        var params = {
            lng : lng,
            lat : lat
        };
        var requestUrl='cominterface/get_location';
        var _this = this;
        this.ajaxPost(requestUrl,params,function(data) {
            _this.trigger(data, 'getLocation');
        });
    },
    /**
     * 微信登录
     */
    wxLogin(callback) {
        if(window.sessionStorage.getItem('userInfo')){
            var data=JSON.parse(window.sessionStorage.getItem('userInfo'));
            callback && callback(data);
        }else{
            var begin=window.location.hash.indexOf('?');
            var length=window.location.hash.length;
            var str=window.location.hash.substring(begin,length);
            var url=str.substr(1);
            url= url.split('&');
            var code;
            for(var i=0;i<url.length;i++){
                  var arr=url[i].split('=');
                  if(arr[0]=='code'){
                      code=arr[1];
                  }
            }

            var params = {
                'code':code
            };
            var _this = this;
            this.ajaxPost('user/testLogin',params,function(data) {
                window.sessionStorage.setItem('userInfo',JSON.stringify(data));
                callback && callback(data);
            });
        }
    },
    getMobilizationInfo(callback) {
        var _this = this;
        this.ajaxGet('spread/getMyMobilizationInfo', function(data) {
            callback && callback(data);
        });
    }
}

export default MixinStore;

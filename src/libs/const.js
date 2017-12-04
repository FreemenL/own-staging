let type=window.location.host.indexOf("www.52mlsz.com")>=0?0:1;

const Config={
    api:type!==0?'http://test.52mlsz.com/mlsztest/api/':'http://www.52mlsz.com/wx/api/',
    appid:type!==0?'wxbdeb4ad23f222b7e':'wxab4752ad23e27146',
	domains:type!==0?'http://test.52mlsz.com/':'http://www.52mlsz.com/',
	jumpUrl:type!==0?'http://test.52mlsz.com/mlsztest/Wx/Jump':'http://www.52mlsz.com/weixin/home/jump'
}

export default Config;
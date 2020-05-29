import Local from './local';
let host = '';
// host = 'http://vanlang.mpoint.vn'
// host = 'http://103.45.238.60:1337'
let request = {};
request.post = async (url, data) => {
    url = `${host}${url}`
    let option = {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${Local.get('token') || 'customer'}`,
            'Accept-Language': 'vi'
        }
    };
    console.log('POST', url, option);
    let res = await fetch(url, option);
    let rs = await res.json();
    console.log('RESPOND', rs);
    return rs;
}
export default request;
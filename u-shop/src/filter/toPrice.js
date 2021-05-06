//封装一个转化小数点的过滤器
//n就是你要过滤的内容
//m就是你要传入的参数
export default (n,m)=>{
    //必须通过return 导出结果
    //n 必须是数值
    if(m){
        return n.toFixed(m)
    }else{
        return n.toFixed(2)
    }
    
}
(() => {
    for (var i = 0; i < 10; i++) {
        setInterval(() => {
            var data = {a: 10, b: 20};
            console.log('第'+i+'条数据：'+data)
        },1000)
    }
})()
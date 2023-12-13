function Grid(cols, rows){
    let arr = new Array(cols)
    for(var i = 0; i < arr.length; i++){
        arr[i] = new Array(rows)

    }
    return arr
}
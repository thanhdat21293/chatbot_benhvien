let arr = [3,5,7,9];
let n = 3;

let arr_len = arr.length
let total = 0
for(let i = 0; i <= arr_len - 3; i++) {
    for(let j = i+1; j <= arr_len - 1; j++) {
        for(let k = j+1; k <= arr_len - 1; k++) {
            if(i != j && i != k && j != k){
                if(arr[i] + arr[j] > arr[k])
                    total++
            }
        }
    }
}
console.log(total)
function main() {
    let console2OArr = arr => console.log(arr.map(i => i.map(j => j.map(k => k.toFixed(2).toLocaleString()).join(' ')).join(' \t\t ')).join('\n\n')
        + "\n\n________________________________________________________\n\n");

    var testArr = [0, 0.3, 0.6, 1, 0.6, 0.3, 0];

    //xyz x指向正南，y指向天空，z指向正西，左手坐标系
    let dayAlphaPrecision = 9;//180;
    let dayAlpha = [...new Array(dayAlphaPrecision)].map((n, idx) => {
        // new Array 的 undefined 转为 index
        return idx
    }).map((i, idx, ar) => {
        //正比例 转为 金字塔（max/2-abs(i-max)）,再除以塔尖max 得到占比
        return idx / (ar.length - 1) * 2; // (dayAlphaPrecision / 2 - Math.abs(i - dayAlphaPrecision / 2))  // / (dayAlphaPrecision / 2)
    })
        .map(i => {
            let I = i * Math.PI / 2;
            return [0, Math.sin(I), Math.cos(I)];
        });
    // 按直射日计算，180度每个时刻的垂直角度。精度共180位，输出 0 到 1 到 0 
    // console.log(dayAlpha);



    let nA = 23 * 2;
    let monthPrecision = 6;
    let monthMaxAlpha = [...new Array(monthPrecision)].map((n, idx, ar) => {
        // new Array 的 undefined 转为 index
        return idx / (ar.length - 1);
    }).map((i, idx, ar) => {
        var I = Math.sin(i * Math.PI);
        let result = dayAlpha;
        result = result.map((j, jdx, ar2) => {
            return [Math.sin((nA / 90) * I),
            j[1] * Math.cos((nA / 90) * I),
            j[2] * Math.cos((nA / 90) * I)];
        })
        return result;
    });//
    // 按月份计算太阳倾斜率，以北回归线23度粗略计算，正午时角度减少率。精度共12位，输出 0 到 (23*2)/90  到 0
    console.log('monthMaxAlpha\n');
    console2OArr(monthMaxAlpha);


    //sn 面向正南为1， 面向正北为-1；
    //ew 面向正东为1，面向正西为-1；
    function rota(sn, ew) {
        return function (arr) {
            sn = sn / 2 * Math.PI;
            ew = ew / 2 * Math.PI;
            let roew = ([a, b, c]) => [a, b * Math.cos(ew), c * Math.cos(ew)];
            let rosn = ([a, b, c]) => [a * Math.cos(sn), b * Math.cos(sn), c];

            var result = arr.map((i, idx, ar) => {
                i = i.map(j => {
                    return roew(rosn(j));
                });
                return i;
            });
            return result;
        };
    }

    let n23 = rota(23 / 90, 0);
    let n23sample = n23(monthMaxAlpha);
    console.log('n23sample\n')
    console2OArr(n23sample);

    let w23 = rota(0, -23 / 90);
    let w23sample = w23(monthMaxAlpha);
    console.log('w23sample\n')
    console2OArr(w23sample);




    return;

    // let s90 = nsrota(23 / 90);
    // console.log(testArr.join('\t\t\t'));
    // console.log(s90(testArr).join('\t\t\t'));

    //degToEast 面板朝向正东为 1 ，朝向正西为 -1
    // idx为序数，ar.length为总数，序数/总数为进度
    // 朝向正东时，为正向cos；朝向正西时，为-cos，向上时不影响原数值；
    function ewrota(degToEast) {
        return function (arr) {
            var result = arr.map((i, idx, ar) => {
                t = (idx) / ar.length;
                let I = i * (1 - (degToEast - (Math.cos(t * Math.PI) * degToEast)));
                I = I <= 0 ? 0 : I;
                return I;
            })
            return result;
        }
    }



    function sum(arr) {
        //console.log(arr);
        if (arr instanceof Array && arr[0] instanceof Array) {
            return sum(arr.map(i => sum(i)));
        } else {
            // console.log(arr);
            return eval(arr.join("+"));
        }
    }
    // test = [[1, 2], [3, 4]];
    // var tresult = sum(test);
    // console.log('tresult', '\n\n', tresult);


    // var n23 = nsrota(15 / 90);
    // var s10 = ewrota((10) / 90);
    // var test1 = n23(testArr);
    // var test2 = s10(testArr);
    // console.log(test1.join(','), '\n', test2.join(','));


    function sumArr(arr) {
        return function () {
            let args = [...arguments];
            let resultArr;
            args.map(arg => {
                resultArr = arr.map(
                    a => {
                        return arg(a);
                    }
                )
            });
            return sum(resultArr);
        }
    }
    // console.log(monthLightAlpha);

    var s23 = nsrota(45 / 90);

    var e10 = ewrota(10 / 90);


    var verticalYearSum = sum(monthLightAlpha);

    var s10Arr = monthLightAlpha.map(arr => s23(arr));

    console.log("\n\ns10Arr \n" + s10Arr.map(i => i.map(j => j.toFixed(2)).join('\t\t')).join('\n'));

    var s15YearSum = sum(s10Arr);
    console.log(' s15: ' + s15YearSum);
    console.log('verticalYearSum' + verticalYearSum);
}

main();
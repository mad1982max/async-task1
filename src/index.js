const rand = ((min, max) => Math.floor(Math.random() * (max - min + 1) + min));

class A {
    constructor() {
        this._a = undefined;
        this._b = undefined;
        this._c = undefined;
    }
    _setA() {
        return new Promise(resolve => {
            const delay1 = rand(50, 130);
            setTimeout(() => {
                this._a = rand(10, 10000);
                console.log(`_a is set & get delay1 = ${delay1}`);
                resolve(delay1);
            }, delay1 );
        });
    }
    _setB() {
        return new Promise(resolve => {
            const delay2 = rand(30, 220);
            setTimeout(() => {
                this._b = Math.floor(Date.now()/3);
                console.log(`_b is set & get delay2 = ${delay2}`);
                resolve(delay2);
            }, delay2 );
        })
    }
    _setC(val) {
        return new Promise(resolve => {
            const delay3 = rand(10, 300);
            setTimeout(() => {
                this._c = val * 10;
                console.log(`_c is set & get delay3 = ${delay3}`);
                resolve(delay3);
            }, delay3 );
        })
    }

    process() {
        let resDelay1, resDelay2, resDelay3;
        return Promise
            .all([this._setA(), this._setB()])
            .then(([delay1, delay2]) => {
                const averageDelay = (delay1 + delay2)/2;
                resDelay1 = delay1;
                resDelay2 = delay2;
                return this._setC(averageDelay);
            })
            .then(promise3 => {
                resDelay3 = promise3;
            })
            .then(() => (resDelay1 + resDelay2 + resDelay3)/3 );

        }
    show() {
        const message = `_a= ${this._a}//_b= ${this._b}//_c= ${this._c}`;
        console.log(message);
    }
}

let instA = new A();
const intervalTimer = setInterval(() => instA.show(), 500);

function start() {
    let counter = 0;
    repeat();
    function repeat() {
        instA.process().then(result => {
            counter ++;
            console.log(`COUNTER - ${counter}`);
            console.log(`resulting delay`, result);
            if (result < 100) {
                console.log('STOP result < 100');
                clearInterval(intervalTimer);
            } else {
                if (counter < 10000) {
                    repeat();
                } else {
                    console.log('STOP count > 10000');
                    clearInterval(intervalTimer);
                }
            }
        });
    }
}

start();


//OLD VARIANT
// (function getAvDelay() {
//     let recursionCount = 0;
//     const rand = ((min, max) => Math.floor(Math.random() * (max - min + 1) + min));
//
//     class A {
//         constructor() {
//             this._a = undefined;
//             this._b = undefined;
//             this._c = undefined;
//         }
//         _setA() {
//             return new Promise(resolve => {
//                 const delay1 = rand(50, 130);
//                 setTimeout(() => {
//                     this._a = rand(10, 10000);
//                     console.log(`_a is set & get delay1 = ${delay1}`);
//                     resolve(delay1);
//                 }, delay1 );
//             });
//         }
//         _setB() {
//             return new Promise(resolve => {
//                 const delay2 = rand(30, 220);
//                 setTimeout(() => {
//                     this._b = Math.floor(Date.now()/3);
//                     console.log(`_b is set & get delay2 = ${delay2}`);
//                     resolve(delay2);
//                 }, delay2 );
//             })
//         }
//         _setC(val) {
//             return new Promise(resolve => {
//                 const delay3 = rand(10, 300);
//                 setTimeout(() => {
//                     this._c = val * 10;
//                     console.log(`_c is set & get delay3 = ${delay3}`);
//                     resolve(delay3);
//                 }, delay3 );
//             })
//         }
//         async process() {
//             const delay1 = this._setA();
//             const delay2 = this._setB();
//             const averageDelay = (await delay1 + await delay2)/2;
//             const delay3 = this._setC(averageDelay);
//             return (await delay1 + await delay2 + await delay3)/3;
//         }
//         show() {
//             const message = `_a= ${this._a}//_b= ${this._b}//_c= ${this._c}`;
//             console.log(message);
//         }
//     }
//
//     let instA = new A();
//     const intervalTimer = setInterval(() => instA.show(), 500);
//
//     startProcess();
//
//     function startProcess() {
//         console.log('recursionCount = ', recursionCount);
//         console.log('Process start');
//
//         instA.process().then(result => {
//             console.log('resulting delay', result.toFixed(2));
//             if (result > 100) {
//                 recursionCount++;
//                 recurcionStart();
//             } else {
//                 clearInterval(intervalTimer);
//                 console.log('STOP THE PROGRAM');
//             }
//         });
//     }
//
//     function recurcionStart() {
//         if(recursionCount < 10000) {
//             startProcess();
//         } else {
//             clearInterval(intervalTimer);
//             console.log('ALERT!');
//             console.log('recursionCount has reached the edge')
//         }
//     }
// })();









































    // startProcess();
    //
    // function startProcess() {
    //     console.log('recursionCount = ', recursionCount);
    //     console.log('Process start');
    //
    //     instA.process().then(result => {
    //         console.log('resulting delay', result.toFixed(2));
    //         if (result > 100) {
    //             recursionCount++;
    //             recurcionStart();
    //         } else {
    //             clearInterval(intervalTimer);
    //             console.log('STOP THE PROGRAM');
    //         }
    //     });
    // }
    //
    // function recurcionStart() {
    //     if(recursionCount < 10000) {
    //         startProcess();
    //     } else {
    //         clearInterval(intervalTimer);
    //         console.log('ALERT!');
    //         console.log('recursionCount has reached the edge')
    //     }
    // }



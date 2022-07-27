


// document.addEventListener('DOMContentLoaded', () => {

//     // const canvas = document.querySelector('canvas')
//     const canvas = document.getElementById('timer-fighter');
//     const c = canvas.getContext('2d')

//     // new Sprite(canvas);

//     //setting canvas on weidth and height to 1024/576
//     canvas.width = 1024
//     canvas.height = 576


//     decreaseTimer()


//     //creating a constant loop where we request the window to have a animation 
//     //by taking in the argument of itself
//     //updates the canvas with a fillrect after each loop and setting it to black 
//     //update draws and moves the object
    

//     window.addEventListener('keydown', (event) => {
//         switch (event.key) {
//             case 'd':
//                 keys.d.pressed = true
//                 player.lastKey = 'd'
//                 break
//             case 'a':
//                 keys.a.pressed = true
//                 player.lastKey = 'a'
//                 break
//             case 'w':
//                 player.velocity.y = -25
//                 break
//             case ',':
//                 player.attack()
//                 break




//             case 'ArrowRight':
//                 keys.ArrowRight.pressed = true
//                 enemy.lastKey = 'ArrowRight'
//                 break
//             case 'ArrowLeft':
//                 keys.ArrowLeft.pressed = true
//                 enemy.lastKey = 'ArrowLeft'
//                 break
//             case 'ArrowUp':
//                 enemy.velocity.y = -25
//                 break
//             case 'ArrowDown':
//                 enemy.attack()
//                 break
//         }
//         // console.log(event.key)
//     })

//     window.addEventListener('keyup', (event) => {
//         switch (event.key) {
//             case 'd':
//                 keys.d.pressed = false
//                 break
//             case 'a':
//                 keys.a.pressed = false
//                 break
//             case 'w':
//                 keys.w.pressed = false
//                 break
//         }

//         //enemys
//         switch (event.key) {
//             case 'ArrowRight':
//                 keys.ArrowRight.pressed = false
//                 break
//             case 'ArrowLeft':
//                 keys.ArrowLeft.pressed = false
//                 break
//             case 'ArrowUp':
//                 keys.ArrowUp.pressed = false
//                 break
//         }
//         //    console.log(event.key)
//     })


// })

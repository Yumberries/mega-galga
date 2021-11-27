namespace SpriteKind {
    export const Gas = SpriteKind.create()
    export const Health = SpriteKind.create()
    export const Mega_Health = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Mega_Health, function (sprite, otherSprite) {
    otherSprite.destroy(effects.smiles, 2000)
    info.setLife(3)
    statusbar2.value = 100
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Darts = [assets.image`Dart1`, assets.image`Dart2`, img`
        . f . 
        f c f 
        c a c 
        a . a 
        `]
    projectile = sprites.createProjectileFromSprite(Darts._pickRandom(), mySprite, 0, -50)
    projectile.startEffect(effects.fire, 3000)
    projectile.setKind(SpriteKind.Projectile)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Health, function (sprite, otherSprite) {
    otherSprite.destroy()
    sprite.startEffect(effects.hearts, 5000)
    info.changeLifeBy(1)
    statusbar2.value += 33.3333333333
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Gas, function (sprite, otherSprite) {
    otherSprite.destroy()
    statusbar.value = 100
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    game.over(false)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 10) {
        mySprite.sayText("+5 Level-Up Bonus!", 2000, false)
        info.changeScoreBy(5)
        EnemySpeed += 20
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    statusbar2.value += -33.3333333333
    scene.cameraShake(4, 500)
})
let Heart: Sprite = null
let Super_Heart: Sprite = null
let MyEnemy: Sprite = null
let MyFuel: Sprite = null
let projectile: Sprite = null
let Darts: Image[] = []
let statusbar2: StatusBarSprite = null
let statusbar: StatusBarSprite = null
let mySprite: Sprite = null
scene.setBackgroundImage(assets.image`Galaxy`)
scroller.scrollBackgroundWithSpeed(0, 30)
mySprite = sprites.create(assets.image`UFO`, SpriteKind.Player)
controller.moveSprite(mySprite)
mySprite.setStayInScreen(true)
statusbar = statusbars.create(20, 4, StatusBarKind.Energy)
statusbar.attachToSprite(mySprite, -18, 0)
let EnemySpeed = 50
statusbar2 = statusbars.create(20, 4, StatusBarKind.Health)
statusbar2.attachToSprite(mySprite, -22, 0)
statusbar2.max = 100
game.onUpdateInterval(5000, function () {
    MyFuel = sprites.createProjectileFromSide(assets.image`Fuel`, 0, 50)
    MyFuel.x = randint(5, 155)
    MyFuel.setKind(SpriteKind.Gas)
})
game.onUpdateInterval(2500, function () {
    MyEnemy = sprites.createProjectileFromSide(assets.image`Spider`, 0, 50)
    MyEnemy.x = randint(7, 153)
    MyEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    MyEnemy,
    assets.animation`Flying Spider`,
    100,
    true
    )
})
game.onUpdateInterval(2000, function () {
    MyEnemy = sprites.createProjectileFromSide(img`
        . . . . . . 4 . . . . . . . 
        . . . 4 . 5 5 4 5 . 4 . . . 
        . . . . 4 . 4 4 . 4 . . . . 
        . . . . . 4 5 5 4 . . . . . 
        9 . . . . a a a a . . . . d 
        9 a f . f f f f f f . f 6 9 
        9 a f f f 1 1 1 1 f f f 6 9 
        . 9 f f f 1 1 1 1 f f f 9 . 
        . 9 a f f 1 1 1 1 f f 6 9 . 
        . . 9 f f 1 1 1 1 f f 9 . . 
        . . 9 a f 1 1 1 1 f 6 9 . . 
        . . . 9 a 1 1 1 1 6 9 . . . 
        . . . 1 1 1 1 1 1 1 1 . . . 
        . . . . 1 1 c c 1 1 . . . . 
        . . . . 1 a c c 6 1 . . . . 
        . . . . 1 1 a 6 1 1 . . . . 
        . . . . 9 1 1 1 1 9 . . . . 
        . . . . . 9 1 1 9 . . . . . 
        . . . . . . 9 9 . . . . . . 
        `, 0, EnemySpeed)
    MyEnemy.x = randint(7, 153)
    MyEnemy.setKind(SpriteKind.Enemy)
    animation.runImageAnimation(
    MyEnemy,
    assets.animation`Flying Rocket`,
    100,
    true
    )
})
game.onUpdateInterval(2000, function () {
    if (info.life() == 3) {
        statusbar.value = 100
        mySprite.setImage(assets.image`UFO`)
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 1 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 1 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 9 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 9 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 9 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 7 4 4 9 9 9 9 9 9 9 9 9 4 4 7 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 2 e 4 4 4 7 4 4 4 4 4 4 4 7 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 1 1 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 9 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 1 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 1 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
    } else if (info.life() == 2) {
        statusbar.value = 66.6666666667
        mySprite.setImage(img`
            . . . . . . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 . . . . . 1 9 9 . . . . . . 
            . . . . . 9 9 9 . . 9 1 1 1 9 9 . . . . . 
            . . . . . 9 9 9 . 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 2 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `)
        animation.runImageAnimation(
        mySprite,
        assets.animation`Flying UFO`,
        200,
        true
        )
    } else if (info.life() == 1) {
        statusbar.value = 33.3333333334
        mySprite.setImage(img`
            . . . . . . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 . . . . . 1 . . . . . . . . 
            . . . . . 9 9 9 . . 9 1 1 . . . . . . . . 
            . . . . . 9 9 9 . 9 9 9 9 . . 9 . . . . . 
            . . . . . 9 8 9 9 . . . 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 . . . 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 . 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 2 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            3 . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `)
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 . . . . . 1 . . . . . . . . 
            . . . . . 9 9 9 . . 9 1 1 . . . . . . . . 
            . . . . . 9 9 9 . 9 9 9 9 . . 9 . . . . . 
            . . . . . 9 8 9 9 . . . 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 . . . 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 . 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 2 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 . . . . . 1 . . . . . . . . 
            . . . . . 9 9 9 . . 9 9 1 . . . . . . . . 
            . . . . . 9 9 9 . 9 9 9 9 . . 9 . . . . . 
            . . . . . 9 8 9 9 . . . 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 9 . . . 9 9 9 9 4 4 4 . . 
            e 4 4 7 4 4 9 9 9 9 9 . 9 9 9 4 4 7 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 2 e 4 4 4 7 4 4 4 4 4 4 4 7 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 1 1 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 . . . . . 1 . . . . . . . . 
            . . . . . 9 9 9 . . 9 1 9 . . . . . . . . 
            . . . . . 9 9 9 . 9 9 9 9 . . 9 . . . . . 
            . . . . . 9 9 9 9 . . . 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 . . . 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 . 9 9 9 4 4 5 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 1 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 1 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
        mySprite.startEffect(effects.fire, 2000)
    } else if (info.life() == 4) {
        statusbar.value = 100
        mySprite.setImage(assets.image`UFO`)
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 1 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 1 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 9 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 9 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 9 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 7 4 4 9 9 9 9 9 9 9 9 9 4 4 7 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 2 e 4 4 4 7 4 4 4 4 4 4 4 7 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 1 1 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 9 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 1 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 1 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
    } else if (info.life() == 5) {
        statusbar.value = 100
        mySprite.setImage(assets.image`UFO`)
        animation.runImageAnimation(
        mySprite,
        [img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 e 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e 1 
            . 2 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 1 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 9 1 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 9 9 . . . . . 
            . . . . . 9 8 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 9 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 7 4 4 9 9 9 9 9 9 9 9 9 4 4 7 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 2 e 4 4 4 7 4 4 4 4 4 4 4 7 4 4 4 e 2 . 
            . 5 2 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 1 1 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `,img`
            . . . . . . . 9 9 9 9 9 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 9 1 1 9 9 . . . . . . 
            . . . . . 9 9 9 9 9 9 1 9 1 9 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 1 1 9 . . . . . 
            . . . . . 9 9 9 9 9 9 9 9 9 1 9 . . . . . 
            . . 4 4 4 9 9 8 8 9 9 9 9 9 9 9 4 4 4 . . 
            e 4 4 5 4 4 9 9 9 9 9 9 9 9 9 4 4 5 4 4 . 
            2 e 4 4 4 4 4 4 4 9 9 9 4 4 4 4 4 4 4 e . 
            . 1 e 4 4 4 5 4 4 4 4 4 4 4 5 4 4 4 e 2 . 
            . 5 1 2 e 4 4 4 4 4 4 4 4 4 4 4 e 2 2 5 . 
            . . . 5 2 2 2 2 2 2 2 2 2 2 2 2 2 5 . . . 
            . . . . . . . . . . . . . . . . . . . . . 
            `],
        200,
        true
        )
    }
})
game.onUpdateInterval(60000, function () {
    Super_Heart = sprites.createProjectileFromSide(assets.image`Heart`, 0, 50)
    Super_Heart.setKind(SpriteKind.Mega_Health)
    Super_Heart.x = randint(5, 155)
})
game.onUpdateInterval(300, function () {
    statusbar.value += -1
})
game.onUpdateInterval(10000, function () {
    Heart = sprites.createProjectileFromSide(img`
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        .......22...22......
        ......2322.2222.....
        ......232222222.....
        ......222222222.....
        .......22222b2......
        ........222b2.......
        .........222........
        ..........2.........
        ....................
        ....................
        ....................
        ....................
        ....................
        ....................
        `, 0, 50)
    Heart.setKind(SpriteKind.Health)
    Heart.x = randint(5, 155)
})

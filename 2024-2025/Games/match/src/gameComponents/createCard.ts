import GamePlay from "../scenes/GamePlay";

export default class createCard 
{
  

    constructor (scene:Phaser.Scene, x:number, y:number, frontTexture:string, cardName:string)
    {
       

        let isFlipping = false;
    const rotation = { y: 0 };

    const backTexture = "card-back";

    const card = scene.add.plane(x, y, backTexture)
        .setName(cardName)
        .setInteractive();

    // start with the card face down
    //@ts-ignore
    card.modelRotationY = 180;

    const flipCard = (callbackComplete:any) => {
        if (isFlipping) {
            return;
        }
        scene.add.tween({
            targets: [rotation],
            y: (rotation.y === 180) ? 0 : 180,
            ease: Phaser.Math.Easing.Expo.Out,
            duration: 500,
            onStart: () => {
                isFlipping = true;
                scene.sound.play("card-flip");
                scene.tweens.chain({
                    targets: card,
                    ease: Phaser.Math.Easing.Expo.InOut,
                    tweens: [
                        {
                            duration: 200,
                            scale: 1.1,
                        },
                        {
                            duration: 300,
                            scale: 1
                        },
                    ]
                })
            },
            onUpdate: () => {
                
                //@ts-ignore
                card.rotateY = 180 + rotation.y;
                //@ts-ignore
                const cardRotation = Math.floor(card.rotateY) % 360;
                if ((cardRotation >= 0 && cardRotation <= 90) || (cardRotation >= 270 && cardRotation <= 359)) {
                    card.setTexture(frontTexture);
                }
                else {
                    card.setTexture(backTexture);
                }
            },
            onComplete: () => {
                isFlipping = false;
                if (callbackComplete) {
                    callbackComplete();
                }
            }
        });
    }

    const destroy = () => {
        scene.add.tween({
            targets: [card],
            y: card.y - 1000,
            easing: Phaser.Math.Easing.Elastic.In,
            duration: 500,
            onComplete: () => {
                card.destroy();
            }
        })
    }

    return {
        gameObject: card,
        flip: flipCard,
        destroy,
        cardName
    }
    }

    
   
}
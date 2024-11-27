
export default class Intro extends Phaser.Scene {

  private _text1: Phaser.GameObjects.Text;

  constructor() {

    super({ key: "Intro" });

  }


  create() {


    this._text1 = this.add.text(512, 100, "click here to go to game play").setTint(0x000000).setOrigin(.5).setInteractive().on("pointerdown", () => {

      this.scene.stop("Intro");
      this.scene.start("GamePlay", { level: 10 });




    }, this)

  }




  update(time: number, delta: number): void {



  }


}

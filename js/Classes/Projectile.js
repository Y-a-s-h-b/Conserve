class Projectile extends Sprite{
    constructor({position = {x: 0 , y: 0},enemy}){
        super({position, imageSrc: 'img/proj.png'})
        this.velocity = {
            x: 0,
            y: 0
        }
        this.enemy = enemy
        this.radius = 10
    }

    update(){
        this.draw()
        const angle = Math.atan2(
            this.enemy.centre.y - this.position.y, 
            this.enemy.centre.x - this.position.x
            )
        const speed = 5
        this.velocity.x = Math.cos(angle) * speed
        this.velocity.y = Math.sin(angle) * speed
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}
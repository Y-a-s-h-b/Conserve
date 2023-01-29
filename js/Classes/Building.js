class Building{
    constructor({position = {x:0, y:0}}){
       this.position = position
       this.width = 64*2
       this.height = 64
       this.centre = { 
        x : this.position.x + this.width/2,
        y : this.position.y + this.height/2
       }
       this.projectiles = []
       this.radius = 250
       this.target
       this.frames = 0
    }
    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y, this.width, 64)
        c.beginPath()
        c.arc(this.centre.x,this.centre.y,this.radius,0,Math.PI*2)
        c.fillStyle = 'rgba(0,0,255,0.2)'
        c.fill()
    }
    update(){
        this.draw()
        this.frames++
        if(this.frames % 100 === 0 && this.target){
            this.projectiles.push(
                new Projectile({
                    position: {
                        x: this.centre.x,
                        y: this.centre.y
                    },
                    enemy: this.target
                })
            )
        }
    }
}
class Enemy{
    constructor({ position = {x:0, y:0}}){
  
        this.position = position
        this.width = 100
        this.height = 50
        this.waypointIndex = 0;
        this.radius = 50
        this.health = 100
        this.centre = {
            x: this.position.x + this.width/2,
            y: this.position.y + this.height/2
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.image = new Image()
        this.image.src ='img/Enemy2.png'
    }
    draw() {
        c.drawImage(this.image,this.position.x,this.position.y)
        
        //health
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y-35, this.width,10)

        c.fillStyle = 'green'
        c.fillRect(this.position.x, this.position.y-35, this.width*this.health/100,10)
        
    }
    update(){
        this.draw()
        const waypoint = waypoints[this.waypointIndex]
        const yDistance = waypoint.y - this.centre.y
        const xDistance = waypoint.x - this.centre.x 
        const angle = Math.atan2(yDistance,xDistance)
        const speed = 1
        this.velocity.x = Math.cos(angle) * speed
        this.velocity.y = Math.sin(angle) * speed
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y 
        this.centre = {
            x: this.position.x + this.width / 2,
            y: this.position.y + this.height / 2
        }
        if(
         Math.abs(Math.round(this.centre.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
         Math.abs(Math.round(this.centre.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) && 
         this.waypointIndex < waypoints.length - 1)
        {
            this.waypointIndex++
        }
        
    }
}
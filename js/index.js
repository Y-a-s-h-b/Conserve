const canvas = document.querySelector('canvas') //Selecting canvas
const c = canvas.getContext('2d') //Creating a variable c to use canvas commands
canvas.width = 1280
canvas.height = 768

c.fillStyle = 'white'
c.fillRect(0,0, canvas.width,canvas.height)

const placementTilesData2D = []
for(let i = 0; i<placementTilesData.length; i+=20){
    placementTilesData2D.push(placementTilesData.slice(i,i+20))
}
const placementTiles = []
placementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 389){
            //adding building placement tile here
            placementTiles.push(
                new PlacementTile({
                    position: {
                        x: x*64,
                        y: y*64
                    }
            })  )
        }
    })
})
const image = new Image()

image.onload = () => {
    animate()
}
image.src = 'img/Map.png'

const enemies = []
function spawnEnemies(spawnCount){
    for(let i = 1; i < spawnCount+1; i++){
        const xOffset = i * 150
        enemies.push(
            new Enemy({
            position: { x: waypoints[0].x - xOffset, y: waypoints[0].y}
        }))
    }
}

const buildings = []
let activeTile = undefined
let enemyCount = 3
let hearts = 10
let sun = 100
spawnEnemies(enemyCount)

function animate(){
    const animationID = requestAnimationFrame(animate)

    c.drawImage(image,0,0)

    for(let i = enemies.length-1; i >= 0; i--){
        const enemy = enemies[i]
        enemy.update()
        if(enemy.position.x > canvas.width){
            hearts -= 1
            enemies.splice(i,1)
            document.querySelector('#hearts').innerHTML = hearts
            if(hearts === 0){
                cancelAnimationFrame(animationID)
                document.querySelector('#gameOver').style.display ='flex'
                
            }
        }
    }
     // Tracking total enemies
     if(enemies.length === 0){
        enemyCount += 2
        spawnEnemies(enemyCount)
    }

    enemies.forEach(enemy => {
        enemy.update()
    })

    placementTiles.forEach(tile => {
        tile.update(mouse)
    })
    buildings.forEach((building) =>{
        building.update()
        building.target = null;
        const validEnemies = enemies.filter((enemy) =>{
            const xDiff = enemy.centre.x - building.centre.x
            const yDiff = enemy.centre.y - building.centre.y
            const distance = Math.hypot(xDiff,yDiff)
            return distance < enemy.radius + building.radius
        })
        building.target = validEnemies[0]
        for(let i = building.projectiles.length-1; i >= 0; i--){
            const projectile = building.projectiles[i]
            projectile.update()
            const xDiff = projectile.enemy.centre.x - projectile.position.x
            const yDiff = projectile.enemy.centre.y - projectile.position.y
            const distance = Math.hypot(xDiff,yDiff)

            //Enemy is hit by projectile
            if(distance < projectile.enemy.radius + projectile.radius){
                //Enemy Health and Removal
                projectile.enemy.health -= 20
                if(projectile.enemy.health <= 0){
                    const enemyIndex = enemies.findIndex((enemy) => {
                        return projectile.enemy === enemy
                    })
                    if(enemyIndex > -1){
                        enemies.splice(enemyIndex,1)
                        sun += 25
                        document.querySelector('#sun').innerHTML = sun
                    }
                }
                building.projectiles.splice(i, 1)
            }
        }
    })
    
}
const mouse = {
    x: undefined,
    y: undefined
}

canvas.addEventListener('click',(event) =>{
    if(activeTile && !activeTile.isOccupied && sun - 50 >= 0){
        sun -= 50
        document.querySelector('#sun').innerHTML = sun
        buildings.push(
            new Building({
                position:{
                    x: activeTile.position.x,
                    y: activeTile.position.y
            }
        }))
        activeTile.isOccupied = true
    }
})

window.addEventListener('mousemove',(event) =>{
    mouse.x = event.clientX
    mouse.y = event.clientY

    activeTile = null
    for(let i = 0;i < placementTiles.length; i++){
        const tile = placementTiles[i]
        if( mouse.x > tile.position.x && 
            mouse.x < tile.position.x + tile.size &&
            mouse.y > tile.position.y && 
            mouse.y < tile.position.y + tile.size)
        {
            activeTile = tile
            break

        }
    }

})




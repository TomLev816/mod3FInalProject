Character.destroy_all
Level.destroy_all
Monster.destroy_all
Item.destroy_all

puts "Creating Character"
Character.create(name: "Bobo", health: 100, sprite_img: "../mod3FInalProject/backend/assets/images/sheet_hero_walk.png")
puts "Created Character"
puts "Creating Levels"
Level.create(name: "Mod 1", character_id: Character.all.first.id, background: "../mod3FInalProject/backend/assets/images/Flatiron_map.png")
Level.create(name: "Mod 2", character_id: Character.all.first.id, background: "../mod3FInalProject/backend/assets/images/Flatiron_map.png")
Level.create(name: "Mod 3", character_id: Character.all.first.id, background: "../mod3FInalProject/backend/assets/images/Flatiron_map.png")
puts "Created Levels"
puts "Creating Monsters"
Monster.create(name: "Monster 1", level_id: Level.all.first.id, health: 50, sprite_img: "../mod3FInalProject/backend/assets/images/wizard_idle.png", attack_img: "../assets/images/wizard_attack.png", death_img: "../assets/images/explosion-4.png")
Monster.create(name: "Monster 2", level_id: Level.all[1].id, health: 75, sprite_img: "../mod3FInalProject/backend/assets/images/ghost-idle.png", attack_img: "../assets/images/ghost-shriek.png", death_img: "../assets/images/explosion-4.png")
Monster.create(name: "Monster 3", level_id: Level.all[2].id, health: 100, sprite_img: "../mod3FInalProject/backend/assets/images/demon-idle.png", attack_img: "../assets/images/demon-idle.png", death_img: "../assets/images/explosion-4.png")
puts "Created Monsters"
puts "Creating Items"
Item.create(name: "Coffee", ability: "Energize! Plus 10 Health", level_id: Level.all.first.id, sprite_img: "../mod3FInalProject/backend/assets/images/coffee.png")
Item.create(name: "Coffee", ability: "Energize! Plus 10 Health", level_id: Level.all[1].id, sprite_img: "../mod3FInalProject/backend/assets/images/coffee.png")
Item.create(name: "Coffee", ability: "Energize! Plus 10 Health", level_id: Level.all[2].id, sprite_img: "../mod3FInalProject/backend/assets/images/coffee.png")
Item.create(name: "Beer", ability: "Cheer up! Plus 5 Health", level_id: Level.all.first.id, sprite_img: "../mod3FInalProject/backend/assets/images/beer.png")
Item.create(name: "Beer", ability: "Cheer up! Plus 5 Health", level_id: Level.all[1].id, sprite_img: "../mod3FInalProject/backend/assets/images/beer.png")
Item.create(name: "Beer", ability: "Cheer up! Plus 5 Health", level_id: Level.all[2].id, sprite_img: "../mod3FInalProject/backend/assets/images/beer.png")
Item.create(name: "Candy", ability: "Sugar Rush! Plus 10 Speed", level_id: Level.all.first.id, sprite_img: "../mod3FInalProject/backend/assets/images/candy.png")
Item.create(name: "Candy", ability: "Sugar Rush! Plus 10 Speed", level_id: Level.all[1].id, sprite_img: "../mod3FInalProject/backend/assets/images/candy.png")
Item.create(name: "Candy", ability: "Sugar Rush! Plus 10 Speed", level_id: Level.all[2].id, sprite_img: "../mod3FInalProject/backend/assets/images/candy.png")
Item.create(name: "Walks", ability: "You took a walk and got a great idea! Use the idea as a weapon against the monster.", level_id: Level.all.first.id, sprite_img: "../mod3FInalProject/backend/assets/images/sprout.png")
Item.create(name: "Walks", ability: "You took a walk and got a great idea! Use the idea as a weapon against the monster.", level_id: Level.all[1].id, sprite_img: "../mod3FInalProject/backend/assets/images/sprout.png")
Item.create(name: "Walks", ability: "You took a walk and got a great idea! Use the idea as a weapon against the monster.", level_id: Level.all[2].id, sprite_img: "../mod3FInalProject/backend/assets/images/sprout.png")
Item.create(name: "Sleep", ability: "You took a nap! Plus 10 Health", level_id: Level.all.first.id, sprite_img: "../mod3FInalProject/backend/assets/images/start.png")
Item.create(name: "Sleep", ability: "You took a nap! Plus 10 Health", level_id: Level.all[1].id, sprite_img: "../mod3FInalProject/backend/assets/images/start.png")
Item.create(name: "Sleep", ability: "You took a nap! Plus 10 Health", level_id: Level.all[2].id, sprite_img: "../mod3FInalProject/backend/assets/images/start.png")
puts "Created Items"

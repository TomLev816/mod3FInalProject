class AddDeathSpriteToMonsters < ActiveRecord::Migration[5.2]
  def change
    add_column :monsters, :death_img, :string
  end
end

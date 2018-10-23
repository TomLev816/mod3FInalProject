class AddSpriteToMonsters < ActiveRecord::Migration[5.2]
  def change
    add_column :monsters, :sprite_img, :string
  end
end

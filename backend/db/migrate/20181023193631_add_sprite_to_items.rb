class AddSpriteToItems < ActiveRecord::Migration[5.2]
  def change
    add_column :items, :sprite_img, :string
  end
end

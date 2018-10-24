class AddAttackSpriteToMonsters < ActiveRecord::Migration[5.2]
  def change
    add_column :monsters, :attack_img, :string
  end
end

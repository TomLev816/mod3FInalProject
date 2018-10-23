class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :sprite_img
      t.integer :health

      t.timestamps
    end
  end
end

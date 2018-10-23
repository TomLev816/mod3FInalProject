class CreateItems < ActiveRecord::Migration[5.2]
  def change
    create_table :items do |t|
      t.string :name
      t.string :ability
      t.integer :level_id

      t.timestamps
    end
  end
end

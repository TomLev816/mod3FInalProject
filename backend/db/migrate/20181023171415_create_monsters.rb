class CreateMonsters < ActiveRecord::Migration[5.2]
  def change
    create_table :monsters do |t|
      t.string :name
      t.integer :health
      t.integer :level_id

      t.timestamps
    end
  end
end

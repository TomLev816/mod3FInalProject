class AddBackgroundToLevels < ActiveRecord::Migration[5.2]
  def change
    add_column :levels, :background, :string
  end
end

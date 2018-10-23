class Character < ApplicationRecord
  has_many :levels
  has_many :items, through: :levels
  has_many :monsters, through: :levels
end

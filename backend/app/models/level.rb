class Level < ApplicationRecord
  belongs_to :character
  has_many :monsters
  has_many :items
end

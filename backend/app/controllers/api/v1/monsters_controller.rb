class Api::V1::MonstersController < ApplicationController
  def index
    @monsters = Monster.all
    render(json:@monsters, status: :ok)
  end

  def show
    find_monster
    render(json: @monster, status: :ok)

  end

  # def new
  #
  # end

  def create
    @monster = Monster.create(monster_params)
    render(json: @monster, status: :created)
  end

  # def edit
  #
  # end

  def update
    find_monster
    render(json: @monster, status: :accepted)
  end

  def destroy

  end

  private

  def find_monster
    @monster = Monster.find_by(id: params[:id])
  end

  def monster_params
    params.require(:monster).permit(:name, :health, :level_id)
  end
end
